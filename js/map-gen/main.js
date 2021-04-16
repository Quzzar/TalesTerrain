import HeightMap from '../height-map.js';
import River from '../river.js';
import Settings from '../settings.js';
import SpireHandler from '../talespire/spire-handler.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r127/three.module.js';

export default {
  drawCanvas: () => { drawCanvas(); },
  colorMap: () => { colorMap(); },
  updateBiomesList: () => { updateBiomesList(); },
};

window.onload = () => {

  // Regenerate Map Button
  $('#regenerate-map-btn').on("click", function(){
    //$('#loading-spinner-container').removeClass('is-hidden');
    //$('#canvas-container').addClass('is-hidden');
    $('#canvas-legend').addClass('is-hidden');

    $('#map3dCanvas').addClass('is-hidden');
    setTimeout(() => {
      settings.render();
    },0);
  });

  // Height Map Upload
  const fileInput = document.querySelector('#input-upload-map');
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {

      let file = fileInput.files[0];
      let fileReader = new FileReader();

      // Closure to capture the file information.
      fileReader.onload = (function(capturedFile) {
        return function(e) {
          processHeightMap(capturedFile.name, e.target.result);
        };
      })(file);

      fileReader.readAsDataURL(file);
    }
  }
  // Height Map Remove
  $('#remove-height-map-btn').on("click", function(){
    $('#height-map-name').addClass('is-hidden');
    $('#height-map-name').text('');
    $('#input-upload-map').val('');
    heightMap.isCustom = false;
    heightMap.customInfo.fileName = '';
    $('#remove-height-map-btn').addClass('is-hidden');
    $('#upload-height-map-btn').removeClass('is-hidden');
    $('#regenerate-map-btn').trigger('click');
  });


  // Settings Panel (open/close)
  $('#settings-panel-top-bar').on("click", function(){
    if($('#settings-panel-contents').hasClass('is-hidden')){
      // Is Closed
      $('#settings-panel-chevron').removeClass('fa-chevron-down');
      $('#settings-panel-chevron').addClass('fa-chevron-up');
      $('#settings-panel-contents').removeClass('is-hidden');
    } else {
      // Is Open
      $('#settings-panel-chevron').removeClass('fa-chevron-up');
      $('#settings-panel-chevron').addClass('fa-chevron-down');
      $('#settings-panel-contents').addClass('is-hidden');
    }
  });
  $('.settings-panel-sub-section').each(function(){
    const subPanel = $(this);
    subPanel.find('.settings-panel-sub-bar').on("click", function(){
      if(subPanel.find('.settings-panel-sub-contents').hasClass('is-hidden')){
        // Is Closed
        subPanel.find('.settings-panel-sub-chevron').removeClass('fa-chevron-down');
        subPanel.find('.settings-panel-sub-chevron').addClass('fa-chevron-up');
        subPanel.find('.settings-panel-sub-contents').removeClass('is-hidden');
      } else {
        // Is Open
        subPanel.find('.settings-panel-sub-chevron').removeClass('fa-chevron-up');
        subPanel.find('.settings-panel-sub-chevron').addClass('fa-chevron-down');
        subPanel.find('.settings-panel-sub-contents').addClass('is-hidden');
      }
    });
  });

  // Biome Remapping
  for(let biome of getBiomeList()){
    let biomeName = capitalizeWords(biome);
    let isChecked = !settings.biomeMapping[biome].remap;
    $('#setting-biome-remap-container').append(`
      <div class="setting-biome-remap is-flex">
        <label class="checkbox pb-2 is-unselectable">
          <input type="checkbox" checked="${isChecked}">
          <span class="is-bold">${biomeName}</span>
        </label>
        <div class="biome-remap-section pl-1 is-hidden">
          <span class="is-size-8">replaced w/</span>
          <div class="select is-very-small">
            <select class="select-biome-remap" data-current-biome="${biome}">
            </select>
          </div>
        </div>
      </div>
    `);
  }

  // Update Biomes
  updateBiomesList();

  // Handle Settings
  Settings.initSettings(settings);

  // Handle TaleSpire processing
  SpireHandler.init(settings);

  // Generate map
  setTimeout(() => {
    settings.render();
  },0);
}

let settings = {
    mapDimension : 128,
    unitSize : 1,
    mapType : 3,
    displayType : 'SHADOWS', // STANDARD, SHADOWS, 3D

    roughness : 5,
    smoothness : 0.4,
    smoothIterations : 1,

    riverStartChance : 0.005,
    riverStartHeight : 0.85,

    oceanHeight: 0.3,
    oceanMoistureModifier: 0.2,
    oceanMoistureSpread: 0.98,

    windsDirection: 'WEST-TO-EAST', // WEST-TO-EAST, EAST-TO-WEST, NORTH-TO-SOUTH, SOUTH-TO-NORTH, NONE
    mountainHeight: 0.8,
    mountainSpread: 0.95,
    mountainAffectOnMoisture: -0.4,
    moistureNearMountainMin: 0.002, // Difference in neighbor mountain height, used to determine if nearby a mountain
    moistureNearMountainMax: 0.019,
    mountainMoistureSpread: 0.93,

    moistureGlobal: 0.4,
    temperatureGlobal: 0.0,

    sunX : -100,
    sunY : -100,
    sunZ : 4,
    render : function(){
      terrainGeneration();
    },
    biomeMapping: {
      CRAG: { remap: false, mapTo: 'DESERT' },
      DESERT: { remap: false, mapTo: 'CRAG' },
      FOREST: { remap: false, mapTo: 'CRAG' },
      MOUNTAIN: { remap: false, mapTo: 'CRAG' },
      PLAINS: { remap: false, mapTo: 'CRAG' },
      RAINFOREST: { remap: false, mapTo: 'CRAG' },
      SAVANNA: { remap: false, mapTo: 'CRAG' },
      SEASONAL_FOREST: { remap: false, mapTo: 'CRAG' },
      SHRUBLAND: { remap: false, mapTo: 'CRAG' },
      SWAMP: { remap: false, mapTo: 'CRAG' },
      TAIGA: { remap: false, mapTo: 'CRAG' },
      TUNDRA: { remap: false, mapTo: 'CRAG' },
    },
};

let startTime;
let endTime;

let mapCanvas = document.getElementById("mapCanvas");
let shadowCanvas = document.getElementById("shadowCanvas");
//let map3dCanvas = document.getElementById("map3dCanvas");

let mapCtx = mapCanvas.getContext("2d");
let shadowCtx = shadowCanvas.getContext("2d");
//let map3dCtx = map3dCanvas.getContext('webgl') || map3dCanvas.getContext('experimental-webgl');

let mapData;
let heightMap = {
  isCustom: false,
  customInfo: {
    fileName: '',
  },
  data: null,
};

function terrainGeneration(){
  "use strict";

  //setLoadPercentage(10, 'Generating heightmap...');
  startTime = new Date().getTime();

  if(!heightMap.isCustom){
    heightMap.data = new HeightMap(settings.mapDimension, settings.unitSize, settings.roughness).heightMapData;
  } else {
    settings.mapDimension = heightMap.data.length-1;
    $('#setting-mapDimension').val(Math.log2(settings.mapDimension));
    $('#settingOutput-mapDimension').text(settings.mapDimension);

    settings.unitSize = 1;
    $('#setting-unitSize').val(Math.log2(settings.unitSize));
    $('#settingOutput-unitSize').text(settings.unitSize);
  }

  endTime = new Date().getTime();
  console.log(`Creating heightmap took: ${endTime-startTime}`);

  mapCanvas.width = mapCanvas.height = settings.mapDimension;
  shadowCanvas.width = shadowCanvas.height = settings.mapDimension;

  //setLoadPercentage(15, 'Smoothing terrain...');
  startTime = new Date().getTime();

  // Smooth terrain
  for(let i = 0; i < settings.smoothIterations; i++){
    heightMap.data = smooth(heightMap.data, settings.mapDimension, settings.smoothness);
  }

  endTime = new Date().getTime();
  console.log(`Smoothing map took: ${endTime-startTime}`);

  //setLoadPercentage(20, 'Populating data map...');

  startTime = new Date().getTime();

  // Fill mapData with nothing
  mapData = Array(settings.mapDimension + 1).fill({}).map(el => new Array(settings.mapDimension + 1).fill({}).map(el => {}));
  for(let x = 0; x < settings.mapDimension; x += settings.unitSize){
    for(let y = 0; y < settings.mapDimension; y += settings.unitSize){

      // Set mapData
      mapData[x][y] = {};
      mapData[x][y].height = heightMap.data[x][y];

    }
  }

  endTime = new Date().getTime();
  console.log(`Init mapData took: ${endTime-startTime}`);

  //setLoadPercentage(30, 'Creating oceans...');

  startTime = new Date().getTime();

  generateNearbyOcean(mapData, settings);

  endTime = new Date().getTime();
  console.log(`Nearby Ocean took: ${endTime-startTime}`);

  //setLoadPercentage(35, 'Creating mountains...');

  startTime = new Date().getTime();

  generateNearbyMountain(mapData, settings);

  endTime = new Date().getTime();
  console.log(`Nearby Mountain took: ${endTime-startTime}`);

  //setLoadPercentage(40, 'Calculating climates...');

  startTime = new Date().getTime();

  generateMountainMoisture(mapData, settings);

  endTime = new Date().getTime();
  console.log(`Mountain Moisture took: ${endTime-startTime}`);

  //setLoadPercentage(45, 'Mapping temperature...');

  startTime = new Date().getTime();

  temperatureMap();

  endTime = new Date().getTime();
  console.log(`Temperature Map took: ${endTime-startTime}`);

  //setLoadPercentage(50, 'Mapping moisture...');

  startTime = new Date().getTime();

  moistureMap();

  endTime = new Date().getTime();
  console.log(`Moisture Map took: ${endTime-startTime}`);

  //setLoadPercentage(70, 'Coloring map...');
  startTime = new Date().getTime();

  colorMap();

  endTime = new Date().getTime();
  console.log(`Coloring map took: ${endTime-startTime}`);

  //setLoadPercentage(90, 'Drawing map...');
  startTime = new Date().getTime();

  drawCanvas();

  endTime = new Date().getTime();
  console.log(`Drawing map took: ${endTime-startTime}`);

  //setLoadPercentage(100, 'Finalizing...');

  // Reveal canvas and legend / hide spinner
  $('#loading-spinner-container').addClass('is-hidden');
  $('#canvas-container').removeClass('is-hidden');
  $('#canvas-legend').removeClass('is-hidden');
  setTimeout(() => {
    window.scrollTo(0,0);
  },0);

  // Build Btn
  SpireHandler.buildBtn(mapData, settings);

}

function temperatureMap() {

  for(let x = 0; x < settings.mapDimension; x += settings.unitSize){
    for(let y = 0; y < settings.mapDimension; y += settings.unitSize){
      var height = heightMap.data[x][y];

      // Calc Temperature - https://www.desmos.com/calculator/qjyw7kyvth
      let heightBeyondOcean = height - settings.oceanHeight;
      if(0 > heightBeyondOcean) { heightBeyondOcean = 0; }
      mapData[x][y].temperature = settings.temperatureGlobal + (-3.5*Math.pow(heightBeyondOcean, 2)+1.86*heightBeyondOcean+0.6);
      //+ (1.0-(Math.pow(0.01, -1*heightBeyondOcean+1-settings.oceanHeight))+Math.pow(heightBeyondOcean, 0.2)-0.65);
    }
  }

}

function moistureMap() {

    for(let x = 0; x < settings.mapDimension; x += settings.unitSize){
      for(let y = 0; y < settings.mapDimension; y += settings.unitSize){

        // Calc Moisture // TODO - Include river moisture?

        mapData[x][y].moisture = settings.moistureGlobal + (mapData[x][y].nearOcean*settings.oceanMoistureModifier + mapData[x][y].mountainMoisture);
      }
    }

}

function generateRivers(){

  let rivers = [];

  for(let x = 0; x < settings.mapDimension; x += settings.unitSize){
    for(let y = 0; y < settings.mapDimension; y += settings.unitSize){
      let height = heightMap.data[x][y];

      // Potential river start
      if(height >= settings.riverStartHeight){
        let chanceOfRiver = settings.riverStartChance; 
        if(chanceOfRiver > Math.random()){
          rivers.push({x, y});
        }
      }

    }
  }

  // OLD-Needs UPDATING
  console.log('Rivers Generated: '+rivers.length);
  for(let riverPoint of rivers){
    let river = new River(heightMap.data, unitSize, riverPoint);
    river.setColor(imgData, { r: 33, g: 80, b: 122 }, unitSize, canvasId);
  }

}




function colorMap(){

  var x = 0,
      y = 0,
      r = 0, g = 0, b = 0, gamma = 500,
      colorFill = 0;

  // colormap colors
  var waterStart={r:10,g:20,b:40},
      waterEnd={r:39,g:50,b:63},
      grassStart={r:22,g:38,b:3},
      grassEnd={r:67,g:100,b:18},
      mtnEnd={r:60,g:56,b:31},
      mtnStart={r:67,g:80,b:18},
      rocamtStart={r:90,g:90,b:90},
      rocamtEnd={r:130,g:130,b:130},
      snowStart={r:255,g:255,b:255},
      snowEnd={r:200,g:200,b:200};


  for(x = 0; x < settings.mapDimension; x += settings.unitSize){
    for(y = 0; y < settings.mapDimension; y += settings.unitSize){
      let height = heightMap.data[x][y];
      colorFill = {r : 0, g : 0, b : 0};

      switch(settings.mapType){
        case 1: // Color map
          if (height >= 0 && height <= settings.oceanHeight) {
            colorFill = fade(waterStart, waterEnd, 30, parseInt(height * 100, 10));
          } else if (height > 0.3 && height <= 0.7) {
            colorFill = fade(grassStart, grassEnd, 45, parseInt(height * 100, 10) - 30);
          } else if (height > 0.7 && height <= 0.95) {
            colorFill = fade(mtnStart, mtnEnd, 15, parseInt(height * 100, 10) - 70);
          } else if (height > 0.95 && height <= 1) {
            colorFill = fade(rocamtStart, rocamtEnd, 5, parseInt(height * 100, 10) - 95);
          }
          break;
        case 2: // Standard
          var standardShade = Math.floor(height * 250);
          colorFill = {r : standardShade, g : standardShade, b : standardShade};
          break;
        case 3: // Biome
          let biome = getBiome(mapData, {x, y}, settings);
          colorFill = getBiomeColor(biome);
          if (height >= 0 && height <= settings.oceanHeight) {
            colorFill = fade(waterStart, waterEnd, 30, parseInt(height * 100, 10));
          }
          break;
        case 4: // Near Ocean
          let nearOcean = mapData[x][y].nearOcean;
          var shade = Math.floor(nearOcean * 250);
          colorFill = {r : shade, g : shade, b : shade};
          break;
        case 5: // Near Mountain
          let nearMountain = mapData[x][y].nearMountain;
          var shade = Math.floor(nearMountain * 250);
          colorFill = {r : shade, g : shade, b : shade};
          break;
        case 6: // Mountain Moisture
          let mountainMoisture = mapData[x][y].mountainMoisture+0.5;
          var shade = Math.floor(mountainMoisture * 250);
          colorFill = {r : shade, g : shade, b : shade};
          break;
        case 7: // Near Mountain + Mountain Moisture
          let comb = (mapData[x][y].nearMountain+mapData[x][y].mountainMoisture+0.5)/2;
          var shade = Math.floor(comb * 250);
          colorFill = {r : shade, g : shade, b : shade};
          break;
        case 10:
          // Section of code modified from http://www.hyper-metrix.com/processing-js/docs/index.php?page=Plasma%20Fractals
          if (height < 0.5) {
            r = height * gamma;
          } else {
            r = (1.0 - height) * gamma;
          }

          if (height >= 0.3 && height < 0.8) {
            g = (height - 0.3) * gamma;
          } else if (height < 0.3) {
            g = (0.3 - height) * gamma;
          } else {
            g = (1.3 - height) * gamma;
          }

          if (height >= 0.5) {
            b = (height - 0.5) * gamma;
          } else {
            b = (0.5 - height) * gamma;
          }
          colorFill = { r :  ~~r, g : ~~g, b : ~~b};
          break;
        default:
          break;
      }

      mapData[x][y].colorFill = colorFill;

    }
  }

}

function drawCanvas(){

  // Define main map draw
  let drawMap = function(){

    let img = mapCtx.createImageData(mapCanvas.height, mapCanvas.width);
    let imgData = img.data;

    // For each unit,
    for(let x = 0; x < settings.mapDimension; x += settings.unitSize){
      for(let y = 0; y < settings.mapDimension; y += settings.unitSize){
        let colorFill = mapData[x][y].colorFill;

        // For each pixel,
        for (var w = 0; w <= settings.unitSize; w++) {
          for (var h = 0; h <= settings.unitSize; h++) {
            var pData = ( ~~(x + w) + ( ~~(y + h) * mapCanvas.width)) * 4;
      
            imgData[pData] = colorFill.r;
            imgData[pData + 1] = colorFill.g;
            imgData[pData + 2] = colorFill.b;
            imgData[pData + 3] = 255;
          }
        }

      }
    }

    mapCtx.putImageData(img, 0, 0);

    // Add to an image so its easier to save
    var strDataURI = mapCanvas.toDataURL();
    $('#imgSave').attr('src', strDataURI);

  }

  // Define shadowmap draw
  let drawShadowMap = function(){
    var
      x = 0, y = 0,
      idx,
      colorFill = {r: 0, g: 0, b: 0, a: 0},
      sunX, sunY, sunZ,
      pX, pY, pZ,
      mag, dX, dY, dZ,
      unitSize = settings.unitSize,
      mapDimension = settings.mapDimension,
      sunPosX = settings.sunX,
      sunPosY = settings.sunY,
      sunHeight = settings.sunZ;

    let img = shadowCtx.createImageData(shadowCanvas.width, shadowCanvas.height);
    let imgData = img.data;

    // Suns position
    sunX = sunPosX;
    sunY = sunPosY;
    sunZ = sunHeight;

    for(x = 0; x < mapDimension; x += unitSize){
      for(y = 0; y < mapDimension; y += unitSize){
          if( settings.oceanHeight > heightMap.data[x][y]) { continue; }

          dX = sunX - x;
          dY = sunY - y;
          dZ = sunZ - heightMap.data[x][y];

          mag = Math.sqrt(dX * dX + dY * dY + dZ * dZ);

          dX = (dX / mag);
          dY = (dY / mag);
          dZ = (dZ / mag);

          pX = x;
          pY = y;
          pZ = heightMap.data[x][y];

          while(pX > 0 && pX < mapDimension && pY > 0 && pY < mapDimension && pZ < sunZ){

              if((heightMap.data[~~(pX)][~~(pY)]) > pZ){
                  colorFill = {r : 0, g : 0, b : 0, a : 200};

                  for (var w = 0; w < unitSize; w++) {
                      for (var h = 0; h < unitSize; h++) {
                          var pData = (~~ (x + w) + (~~ (y + h) * mapCanvas.width)) * 4;

                          imgData[pData] = colorFill.r;
                          imgData[pData + 1] = colorFill.g;
                          imgData[pData + 2] = colorFill.b;
                          imgData[pData + 3] += colorFill.a;
                      }
                  }
                  break;
              }

              pX += (dX * unitSize);
              pY += (dY * unitSize);
              pZ += (dZ * unitSize);
          }
      }
    }


    shadowCtx.putImageData(img, 0, 0);

    mapCtx.drawImage(shadowCanvas, 0, 0);
    var strDataURI = mapCanvas.toDataURL();
    $('#imgSave').attr('src', strDataURI);
  }

  if(settings.displayType == 'STANDARD'){

    drawMap();

  } else if(settings.displayType == 'SHADOWS'){

    drawMap();
    drawShadowMap();

  } /*else if(settings.displayType == '3D'){
    $('#map3dCanvas').removeClass('is-hidden');

    if (!map3dCtx || !(map3dCtx instanceof WebGLRenderingContext) ) {
      alert('Failed to get WebGL context. Try using a different display option or a different browser.');
    }


    let camera, scene, renderer;

    scene = new THREE.Scene();

    //camera = new THREE.PerspectiveCamera( 70, 1, 0.01, 10 );

    camera = new THREE.PerspectiveCamera( 15, 1 );
    camera.position.z = 800;
    camera.position.x = 50;
    camera.position.y = 200;
    camera.lookAt(scene.position);
    //camera.updateMatrix();

    //

    let geometry = new THREE.BufferGeometry();

    let mapPointArray = [];
    for(let x = 0; x < settings.mapDimension/settings.unitSize; x++){
      for(let y = 0; y < settings.mapDimension/settings.unitSize; y++){
        let z = mapData[x*settings.unitSize][y*settings.unitSize].height;

        mapPointArray.push(z*50);
        mapPointArray.push(y);
        mapPointArray.push(x);

      }
    }

    const vertices = new Float32Array(mapPointArray);

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    console.log(geometry);
    geometry.computeTangents();
    geometry.computeVertexNormals();

    console.log(new THREE.CylinderGeometry( 5, 5, 20, 32 ));

    let material = new THREE.MeshDepthMaterial();
    material.side = THREE.DoubleSide;

    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //

    renderer = new THREE.WebGLRenderer( { antialias: false, canvas: map3dCanvas } );
    renderer.setSize(settings.mapDimension, settings.mapDimension);
    renderer.setAnimationLoop( animation );
    
    function animation( time ) {

      mesh.rotation.z = time / 2000;
      mesh.rotation.x = time / 2000;
      //mesh.rotation.y = time / 2000;

      renderer.render( scene, camera );

    }

  }*/

}

function processHeightMap(fileName, strDataURI){
  console.log('> Processing Heightmap...');

  $('#height-map-name').removeClass('is-hidden');
  $('#height-map-name').text(fileName);

  heightMap.isCustom = true;
  heightMap.customInfo.fileName = fileName;

  $('#upload-height-map-btn').addClass('is-hidden');
  $('#remove-height-map-btn').removeClass('is-hidden');

  /*
    To get the pixel data of an image you need to:
      - Store the image URI in an image
      - Draw that image onto a canvas context
      - Then read the pixel data from that canvas
  */
  $('#heightmap-upload-image').attr('src', strDataURI);
  setTimeout(() => {// Need to timeout so image can load
    
    let imageSave = document.getElementById('heightmap-upload-image');
    
    // Crop image down to a working dimension
    console.log('> Converting image size...');
    let imageSize = (imageSave.width < imageSave.height) ? imageSave.width : imageSave.height;
    console.log('Was: '+imageSize);
    imageSize = Math.pow(2,Math.floor(Math.log(imageSize)/Math.log(2)));
    console.log('Now: '+imageSize);

    // Update settings to fit the image specs
    settings.mapDimension = imageSize;
    $('#setting-mapDimension').val(Math.log2(settings.mapDimension));
    $('#settingOutput-mapDimension').text(settings.mapDimension);
    let heightMapCanvas = document.getElementById("heightmap-upload-canvas");
    heightMapCanvas.width = heightMapCanvas.height = settings.mapDimension;

    settings.unitSize = 1;
    $('#setting-unitSize').val(Math.log2(settings.unitSize));
    $('#settingOutput-unitSize').text(settings.unitSize);

    // Update canvas context
    console.log('> Updating canvas context...');
    let heightMapCtx = heightMapCanvas.getContext('2d');
    heightMapCtx.drawImage(imageSave, 0, 0);
    let imgData = heightMapCtx.getImageData(0, 0, imageSize, imageSize);
  
    // Build heightMap
    console.log('> Building heightmap...');
    let mapData = Array(settings.mapDimension + 1).fill(0).map(el => new Array(settings.mapDimension + 1).fill(0).map(el => 0));
    for(let x = 0; x < settings.mapDimension; x += settings.unitSize){
      for(let y = 0; y < settings.mapDimension; y += settings.unitSize){

        var pData = (x + (y * heightMapCanvas.width)) * 4;
        let r = imgData.data[pData];
        let g = imgData.data[pData + 1];
        let b = imgData.data[pData + 2];
        let a = imgData.data[pData + 3];

        //console.log(`HERE: ${r} ${g} ${b} ${a}`)
        mapData[x][y] = (0.2126 * r + 0.7152 * g + 0.0722 * b)/100;
        //console.log(mapData[x][y]);

      }
    }
    heightMap.data = mapData;
  
    // Finish,
    console.log('> Heightmap upload complete!');
    $('#regenerate-map-btn').trigger('click');
    $('#heightmap-upload-image').removeClass('is-hidden');
  },10);

}

function updateBiomesList(){

  let enabledBiomesList = [];
  for(let biome of getBiomeList()){
    if(!settings.biomeMapping[biome].remap){
      enabledBiomesList.push(biome);
    }
  }

  // Populate remapping selections
  $('.select-biome-remap').each(function(){
    let currentBiome = $(this).attr('data-current-biome');
    let selectedBiome = $(this).find(':selected').val();
    $(this).html('');
    for(let biome of enabledBiomesList){
      if(biome == currentBiome) { continue; }
      let biomeName = capitalizeWords(biome);
      $(this).append(`<option value="${biome}">${biomeName}</option>`);
    }
    $(this).val(selectedBiome); // Sets to old biome value, take first value instead if missing
    if($(this).find('option[value="'+selectedBiome+'"]').length <= 0){ $(this).prop('selectedIndex', 0); }
    $(this).trigger('change'); // Updates biomeMapping
  });

  // Fill biomes legend
  let columnSize = Math.ceil(enabledBiomesList.length/2);
  $('#legend-column-1').html('');
  $('#legend-column-2').html('');
  for (let i = 0; i < enabledBiomesList.length; i++) {
    let columnID;
    if(i < columnSize){
      columnID = 'legend-column-1';
    } else {
      columnID = 'legend-column-2';
    }
    const biome = enabledBiomesList[i];
    let color = getBiomeColor(biome);
    $('#'+columnID).append(`
      <p class="is-size-7">
        <span style="color: rgb(${color.r},${color.g},${color.b});">
          <i class="fas fa-square"></i>
        </span>
        <span>
          ${capitalizeWords(biome)}
        </span>
      </p>
    `);
  }

}
