import HeightMap from '../height-map.js';
import River from '../river.js';

window.onload = terrainGeneration;

let mapCanvas = document.getElementById('canvas');
let imgSave = document.getElementById('imgSave');
let settings = {
    roughness : 5,
    mapDimension : 512,
    unitSize : 1,
    mapType : 3,
    smoothness : 0.6,
    smoothIterations : 1,
    genShadows : true,
    riverStartChance : 0.01,
    riverStartHeight : 0.85,
    oceanHeight: 0.3,
    oceanSearchLength: 20, // 25
    sunX : -100,
    sunY : -100,
    sunZ : 4,
    render : function(){
        terrainGeneration();
    }
};

let mapData;
let heightMapData;

function terrainGeneration(){
  "use strict";
  // Set these variables to adjust how the map is generated
  var mapDimension,
      unitSize = 0,
      roughness = 0,
      genShadows = 0,
      sunX = settings.sunX,
      sunY = settings.sunY,
      sunZ = settings.sunZ,
      mapType = 0,
      mapCanvas = document.getElementById('canvas'),
      mapCtx = mapCanvas.getContext("2d");

  // init
  roughness = parseInt(settings.roughness, 10);
  mapDimension = parseInt(settings.mapDimension, 10);
  unitSize = parseInt(settings.unitSize, 10);
  mapType = parseInt(settings.mapType, 10);

  genShadows = settings.genShadows;

  if (genShadows) {
      sunX = parseInt(settings.sunX, 10);
      sunY = parseInt(settings.sunY, 10);
      sunZ = parseInt(settings.sunZ, 10);
  }

  mapCanvas.width = mapDimension;
  mapCanvas.height = mapDimension;
  heightMapData = new HeightMap(mapDimension, unitSize, roughness).heightMapData;

  // Smooth terrain
  for(var i = 0; i < settings.smoothIterations; i++){
    heightMapData = smooth(heightMapData, mapDimension, settings.smoothness);
  }

  // Fill mapData with nothing
  mapData = Array(mapDimension + 1).fill({}).map(el => new Array(mapDimension + 1).fill({}).map(el => {}));

  // Draw everything after the terrain vals are generated
  drawMap(unitSize, mapDimension, "canvas", mapType);

  if(genShadows){
    drawShadowMap(mapCtx, unitSize, mapDimension, sunX, sunY, sunZ);
  }
}



// Draw the map
function drawMap(unitSize, mapDimension, canvasId, mapType){
  var canvas = document.getElementById(canvasId),
  ctx = canvas.getContext("2d"),
  x = 0,
  y = 0,
  r = 0, g = 0, b = 0, gamma = 500,
  colorFill = 0,
  img = ctx.createImageData(canvas.height, canvas.width),
  imgData = img.data;


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

  
  let rivers = [];

  // Set color based off height.
  for(x = 0; x <= mapDimension - 1; x += unitSize){
    for(y = 0; y <= mapDimension - 1; y += unitSize){
        colorFill = {r : 0, g : 0, b : 0};
        var height = heightMapData[x][y];


        // Potential river start
        if(height >= settings.riverStartHeight){
          let chanceOfRiver = settings.riverStartChance; 
          if(chanceOfRiver > Math.random()){
            rivers.push({x, y});
          }
        }

        // Set mapData
        mapData[x][y] = {};
        mapData[x][y].height = height;

        // Calc Temperature - https://www.desmos.com/calculator/76cf4cbimj
        let heightBeyondOcean = height - settings.oceanHeight;
        if(0 > heightBeyondOcean) { heightBeyondOcean = 0; }
        mapData[x][y].temperature = 1.0-(Math.pow(0.01, -1*heightBeyondOcean+1-settings.oceanHeight))
                    +Math.pow(heightBeyondOcean, 0.2)-0.65;

        // Calc Moisture // TODO - Include change moisture by winds and side of mountain // Include river moisture?
        let nearbyOceanWeight = nearbyOcean(heightMapData, {x, y}, settings);
        mapData[x][y].moisture = nearbyOceanWeight;








        //colorFill.g += mapData[x][y].moisture*80;
        //colorFill.r += mapData[x][y].temperature*5;





        switch(mapType){
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
              let biome = getBiome(mapData, {x, y});
              colorFill = getBiomeColor(biome);
              if (height >= 0 && height <= settings.oceanHeight) {
                colorFill = fade(waterStart, waterEnd, 30, parseInt(height * 100, 10));
              }
              break;
          case 5:
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





        setColor(imgData, colorFill, x, y, unitSize, canvasId);

        
    }
  }

  console.log(mapData);

  // Rivers
  console.log('Rivers Generated: '+rivers.length);
  for(let riverPoint of rivers){
    //setColor(imgData, { r: 33, g: 80, b: 162 }, riverPoint.x, riverPoint.y, unitSize, canvasId);
    let river = new River(heightMapData, unitSize, riverPoint);
    river.setColor(imgData, { r: 33, g: 80, b: 122 }, unitSize, canvasId);
  }


  ctx.putImageData(img, 0, 0);

  // Add to an image so its easier to save
  var strDataURI = mapCanvas.toDataURL();
  imgSave.src = strDataURI;

}


//Create Shadowmap
function drawShadowMap(mapCtx, unitSize, mapDimension, sunPosX, sunPosY, sunHeight){
  var shadowCanvas = document.createElement("canvas"),
    sCtx = shadowCanvas.getContext("2d"),
    x = 0, y = 0,
    idx,
    colorFill = {r : 0, g : 0, b : 0, a : 0},
    sunX, sunY, sunZ,
    pX, pY, pZ,
    mag, dX, dY, dZ;

  shadowCanvas.width = shadowCanvas.height = mapDimension;

  var img = sCtx.createImageData(shadowCanvas.width, shadowCanvas.height),
    imgData = img.data;

  // Suns position
  sunX = sunPosX;
  sunY = sunPosY;
  sunZ = sunHeight;

  for(x = 0; x < mapDimension; x += unitSize){
    for(y = 0; y < mapDimension; y += unitSize){
        dX = sunX - x;
        dY = sunY - y;
        dZ = sunZ - heightMapData[x][y];

        mag = Math.sqrt(dX * dX + dY * dY + dZ * dZ);

        dX = (dX / mag);
        dY = (dY / mag);
        dZ = (dZ / mag);

        pX = x;
        pY = y;
        pZ = heightMapData[x][y];

        while(pX > 0 && pX < mapDimension && pY > 0 && pY < mapDimension && pZ < sunZ){

            if((heightMapData[~~(pX)][~~(pY)]) > pZ){
                colorFill = {r : 0, g : 0, b : 0, a : 200};

                for (var w = 0; w < unitSize; w++) {
                    for (var h = 0; h < unitSize; h++) {
                        var pData = (~~ (x + w) + (~~ (y + h) * canvas.width)) * 4;

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


  sCtx.putImageData(img, 0, 0);
  mapCtx.drawImage(shadowCanvas, 0, 0);
  var strDataURI = mapCanvas.toDataURL();
  imgSave.src = strDataURI;
}