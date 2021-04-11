
// Round to nearest pixel
function round(n) {
    if (n-(parseInt(n, 10)) >= 0.5){
        return parseInt(n, 10) + 1;
    }else{
        return parseInt(n, 10);
    }
}

// smooth function
function smooth(data, size, amt) {

    /* Rows, left to right */
    for (var x = 1; x < size; x++){
        for (var z = 0; z < size; z++){
            data[x][z] = data[x - 1][z] * (1 - amt) + data[x][z] * amt;
        }
    }

    /* Rows, right to left*/
    for (x = size - 2; x < -1; x--){
        for (z = 0; z < size; z++){
            data[x][z] = data[x + 1][z] * (1 - amt) + data[x][z] * amt;
        }
    }

    /* Columns, bottom to top */
    for (x = 0; x < size; x++){
        for (z = 1; z < size; z++){
            data[x][z] = data[x][z - 1] * (1 - amt) + data[x][z] * amt;
        }
    }

    /* Columns, top to bottom */
    for (x = 0; x < size; x++){
        for (z = size; z < -1; z--){
            data[x][z] = data[x][z + 1] * (1 - amt) + data[x][z] * amt;
        }
    }

    return data;
}


// Fade color
function fade(startColor, endColor, steps, step){
  var scale = step / steps,
      r = startColor.r + scale * (endColor.r - startColor.r),
      b = startColor.b + scale * (endColor.b - startColor.b),
      g = startColor.g + scale * (endColor.g - startColor.g);

  return {
      r: r,
      g: g,
      b: b
  }
};

function setColor(imgData, colorFill, x, y, unitSize, canvasId){
  var canvas = document.getElementById(canvasId);

  for (var w = 0; w <= unitSize; w++) {
    for (var h = 0; h <= unitSize; h++) {
      var pData = ( ~~(x + w) + ( ~~(y + h) * canvas.width)) * 4;

      imgData[pData] = colorFill.r;
      imgData[pData + 1] = colorFill.g;
      imgData[pData + 2] = colorFill.b;
      imgData[pData + 3] = 255;
    }
  }

}


function generateNearbyOcean(mapData, settings){
  let size = settings.mapDimension;
  let amt = settings.oceanMoistureSpread;

  for(let x = 0; x < size; x+=settings.unitSize){
    for(let y = 0; y < size; y+=settings.unitSize){
      mapData[x][y].nearOcean = (settings.oceanHeight >= mapData[x][y].height) ? 1.0 : 0.0;
    }
  }

  /* Rows, left to right */
  for (var x = settings.unitSize; x < size; x+=settings.unitSize){
    for (var z = 0; z < size; z+=settings.unitSize){
      mapData[x][z].nearOcean = mapData[x - settings.unitSize][z].nearOcean * (1 - amt) + mapData[x][z].nearOcean * amt;
    }
  }

  /* Rows, right to left*/
  for (x = size - 2*settings.unitSize; x < -1*settings.unitSize; x-=settings.unitSize){
      for (z = 0; z < size; z+=settings.unitSize){
        mapData[x][z].nearOcean = mapData[x + settings.unitSize][z].nearOcean * (1 - amt) + mapData[x][z].nearOcean * amt;
      }
  }

  /* Columns, bottom to top */
  for (x = 0; x < size; x+=settings.unitSize){
      for (z = settings.unitSize; z < size; z+=settings.unitSize){
        mapData[x][z].nearOcean = mapData[x][z - settings.unitSize].nearOcean * (1 - amt) + mapData[x][z].nearOcean * amt;
      }
  }

  /* Columns, top to bottom */
  for (x = 0; x < size; x+=settings.unitSize){
      for (z = size; z < -1*settings.unitSize; z-=settings.unitSize){
        mapData[x][z].nearOcean = mapData[x][z + settings.unitSize].nearOcean * (1 - amt) + mapData[x][z].nearOcean * amt;
      }
  }

}


function generateNearbyMountain(mapData, settings){
  let size = settings.mapDimension;
  let amt = settings.mountainMoistureSpread;

  for(let x = 0; x < size; x+=settings.unitSize){
    for(let y = 0; y < size; y+=settings.unitSize){
      mapData[x][y].nearMountain = (settings.mountainHeight <= mapData[x][y].height) ? 1.0 : 0.0;
    }
  }

  /* Rows, left to right */
  for (var x = settings.unitSize; x < size; x+=settings.unitSize){
    for (var z = 0; z < size; z+=settings.unitSize){
      mapData[x][z].nearMountain = mapData[x - settings.unitSize][z].nearMountain * (1 - amt) + mapData[x][z].nearMountain * amt;
    }
  }

  /* Rows, right to left*/
  for (x = size - 2*settings.unitSize; x < -1*settings.unitSize; x-=settings.unitSize){
      for (z = 0; z < size; z+=settings.unitSize){
        mapData[x][z].nearMountain = mapData[x + settings.unitSize][z].nearMountain * (1 - amt) + mapData[x][z].nearMountain * amt;
      }
  }

  /* Columns, bottom to top */
  for (x = 0; x < size; x+=settings.unitSize){
      for (z = settings.unitSize; z < size; z+=settings.unitSize){
        mapData[x][z].nearMountain = mapData[x][z - settings.unitSize].nearMountain * (1 - amt) + mapData[x][z].nearMountain * amt;
      }
  }

  /* Columns, top to bottom */
  for (x = 0; x < size; x+=settings.unitSize){
      for (z = size; z < -1*settings.unitSize; z-=settings.unitSize){
        mapData[x][z].nearMountain = mapData[x][z + settings.unitSize].nearMountain * (1 - amt) + mapData[x][z].nearMountain * amt;
      }
  }

}

function generateMountainMoisture(mapData, settings) {

  let populateMountainMoisture = function(s_x, s_y, moistureVal) {
    for(let x = 0; x < settings.mapDimension; x+=settings.unitSize){
      for(let y = 0; y < settings.mapDimension; y+=settings.unitSize){
        if(mapData[x][y].mountainMoisture == null){
          mapData[x][y].mountainMoisture = 0;
        }
        try {
          let sidePointData = mapData[x+s_x*settings.unitSize][y+s_y*settings.unitSize];
          if(sidePointData.nearMountain > mapData[x][y].nearMountain){
            let mountDiff = sidePointData.nearMountain - mapData[x][y].nearMountain;
            if(mountDiff > settings.moistureNearMountainMin && mountDiff < settings.moistureNearMountainMax) {
              mapData[x][y].mountainMoisture += moistureVal;
            } else {
              //console.log(mountDiff);
            }
          }
        } catch (err) {}
      }
    }
  }

  if(settings.windsDirection == 'WEST-TO-EAST'){
    populateMountainMoisture(-1, 0, settings.mountainAffectOnMoisture); // WEST wet
    populateMountainMoisture(1, 0, -1*settings.mountainAffectOnMoisture); // EAST dry
  } else if(settings.windsDirection == 'EAST-TO-WEST'){
    populateMountainMoisture(-1, 0, -1*settings.mountainAffectOnMoisture); // WEST dry
    populateMountainMoisture(1, 0, settings.mountainAffectOnMoisture); // EAST wet
  } else if(settings.windsDirection == 'NORTH-TO-SOUTH'){
    populateMountainMoisture(0, -1, settings.mountainAffectOnMoisture); // NORTH wet
    populateMountainMoisture(0, 1, -1*settings.mountainAffectOnMoisture); // SOUTH dry
  } else if(settings.windsDirection == 'SOUTH-TO-NORTH'){
    populateMountainMoisture(0, -1, -1*settings.mountainAffectOnMoisture); // NORTH dry
    populateMountainMoisture(0, 1, settings.mountainAffectOnMoisture); // SOUTH wet
  } else {
    for(let x = 0; x < settings.mapDimension; x+=settings.unitSize){
      for(let y = 0; y < settings.mapDimension; y+=settings.unitSize){
        mapData[x][y].mountainMoisture = 0.0;
      }
    }
  }

}


// Determines biomes
function getBiome(mapData, point){

  const MAX_VAL = 100.00;
  const MIN_VAL = -100.00;

  const data = mapData[point.x][point.y];
  const moisture = data.moisture;
  const temperature = data.temperature;
  const nearMountain = data.nearMountain;

  if(moisture > 0.25 && moisture <= 0.75 && temperature <= 0.50 && temperature > 0.25){
    return 'TAIGA';
  }

  if(moisture >= MIN_VAL && moisture <= 0.50 && temperature <= 0.25 && temperature >= MIN_VAL){
    return 'TUNDRA';
  }

  if(moisture >= MIN_VAL && moisture <= 0.25 && temperature <= 0.70 && temperature > 0.25){
    return 'PLAINS';
  }

  /* Temp Biome */
  if(nearMountain > 0.7) {
    return 'MOUNTAIN';
  }

  if(moisture > 0.50 && moisture <= 0.75 && temperature <= MAX_VAL && temperature > 0.75){
    return 'SEASONAL-FOREST';
  }

  if(moisture > 0.75 && moisture <= MAX_VAL && temperature <= MAX_VAL && temperature > 0.75){
    return 'RAINFOREST';
  }

  if(moisture > 0.50 && moisture <= 0.75 && temperature <= 0.75 && temperature > 0.50){
    return 'FOREST';
  }

  if(moisture > 0.75 && moisture <= MAX_VAL && temperature <= 0.75 && temperature > 0.50){
    return 'SWAMP';
  }

  if(moisture > 0.25 && moisture <= 0.50 && temperature <= MAX_VAL && temperature > 0.75){
    return 'SAVANNA';
  }

  if(moisture > 0.25 && moisture <= 0.50 && temperature <= 0.75 && temperature > 0.50){
    return 'SHRUBLAND';
  }

  if(moisture >= MIN_VAL && moisture <= 0.25 && temperature <= MAX_VAL && temperature > 0.70){
    return 'DESERT';
  }

  return 'NONE';

}

function getBiomeColor(biome){
  let colorFill;
  if (biome == 'DESERT') {
    colorFill = {r:188, g:188, b:122};
  } else if (biome == 'SAVANNA') {
    colorFill = {r:165, g:161, b:86};
  } else if (biome == 'PLAINS') {
    colorFill = {r:121, g:145, b:78};
  } else if (biome == 'SHRUBLAND') {
    colorFill = {r:116, g:135, b:82};
  } else if (biome == 'SEASONAL-FOREST') {
    colorFill = {r:144, g:165, b:36};
  } else if (biome == 'RAINFOREST') {
    colorFill = {r:31, g:119, b:7};
  } else if (biome == 'FOREST') {
    colorFill = {r:54, g:86, b:13};
  } else if (biome == 'SWAMP') {
    colorFill = {r:50, g:56, b:12};
  } else if (biome == 'TAIGA') {
    colorFill = {r:44, g:71, b:46};
  } else if (biome == 'TUNDRA') {
    colorFill = {r:195, g:196, b:194};
  } else if (biome == 'MOUNTAIN') {
    colorFill = {r:71, g:51, b:28};
  } else {
    colorFill = {r:221, g:37, b:175};
  }
  return colorFill;
}

function getBiomeList(){
  return ['DESERT','FOREST','MOUNTAIN','PLAINS','RAINFOREST','SAVANNA','SEASONAL-FOREST','SHRUBLAND',
          'SWAMP','TAIGA','TUNDRA'];
}