
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

// Nearby ocean metric (0.0-1.0). Samples in square around point.
function nearbyOcean(heightMapData, point, settings){
  let unitSize = settings.unitSize;

  let searchPoints = [
    // Side Points
    {x:point.x-settings.oceanSearchLength*unitSize,y:point.y},
    {x:point.x+settings.oceanSearchLength*unitSize,y:point.y},
    {x:point.x,y:point.y-settings.oceanSearchLength*unitSize},
    {x:point.x,y:point.y+settings.oceanSearchLength*unitSize},

    // Corner Points
    {x:point.x-settings.oceanSearchLength*unitSize,y:point.y-settings.oceanSearchLength*unitSize},
    {x:point.x+settings.oceanSearchLength*unitSize,y:point.y-settings.oceanSearchLength*unitSize},
    {x:point.x+settings.oceanSearchLength*unitSize,y:point.y+settings.oceanSearchLength*unitSize},
    {x:point.x-settings.oceanSearchLength*unitSize,y:point.y+settings.oceanSearchLength*unitSize},

    // Long Side Points
    {x:point.x-settings.oceanSearchLength*2*unitSize,y:point.y},
    {x:point.x+settings.oceanSearchLength*2*unitSize,y:point.y},
    {x:point.x,y:point.y-settings.oceanSearchLength*2*unitSize},
    {x:point.x,y:point.y+settings.oceanSearchLength*2*unitSize},
  ];

  let totalWeight = 0;
  for(let point of searchPoints){
    let weight;
    try{
      weight = (settings.oceanHeight > heightMapData[point.x][point.y]) ? 1.0/searchPoints.length : 0.0;
    } catch(err){
      weight = 0.5/searchPoints.length;
    }
    totalWeight += weight;
  }

  return totalWeight;
}

// Determines biomes
function getBiome(mapData, point){

  const data = mapData[point.x][point.y];
  const moisture = data.moisture;
  const temperature = data.temperature;

  if(moisture >= 0.00 && moisture <= 0.25 && temperature <= 1.00 && temperature > 0.70){
    return 'DESERT';
  }

  if(moisture > 0.25 && moisture <= 0.50 && temperature <= 1.00 && temperature > 0.75){
    return 'SAVANNA';
  }

  if(moisture >= 0.00 && moisture <= 0.25 && temperature <= 0.70 && temperature > 0.25){
    return 'PLAINS';
  }

  if(moisture > 0.25 && moisture <= 0.50 && temperature <= 0.75 && temperature > 0.50){
    return 'SHRUBLAND';
  }

  if(moisture > 0.50 && moisture <= 0.75 && temperature <= 1.00 && temperature > 0.75){
    return 'SEASONAL-FOREST';
  }

  if(moisture > 0.75 && moisture <= 1.00 && temperature <= 1.00 && temperature > 0.75){
    return 'RAIN-FOREST';
  }

  if(moisture > 0.50 && moisture <= 0.75 && temperature <= 0.75 && temperature > 0.50){
    return 'FOREST';
  }

  if(moisture > 0.75 && moisture <= 0.85 && temperature <= 0.75 && temperature > 0.50){
    return 'SWAMP';
  }

  if(moisture > 0.25 && moisture <= 0.75 && temperature <= 0.50 && temperature > 0.25){
    return 'TAIGA';
  }

  if(moisture >= 0.00 && moisture <= 0.50 && temperature <= 0.25 && temperature >= 0.00){
    return 'TUNDRA';
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
    colorFill = {r:79, g:102, b:72};
  } else if (biome == 'SEASONAL-FOREST') {
    colorFill = {r:144, g:165, b:36};
  } else if (biome == 'RAIN-FOREST') {
    colorFill = {r:31, g:119, b:7};
  } else if (biome == 'FOREST') {
    colorFill = {r:65, g:109, b:53};
  } else if (biome == 'SWAMP') {
    colorFill = {r:14, g:51, b:4};
  } else if (biome == 'TAIGA') {
    colorFill = {r:44, g:71, b:46};
  } else if (biome == 'TUNDRA') {
    colorFill = {r:195, g:196, b:194};
  } else {
    colorFill = {r:0, g:0, b:0};
  }
  return colorFill;
}

function getBiomeList(){
  return ['DESERT','SAVANNA','PLAINS','SHRUBLAND','SEASONAL-FOREST','RAIN-FOREST','FOREST','SWAMP','TAIGA','TUNDRA'];
}