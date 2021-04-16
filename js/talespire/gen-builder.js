
import Asset from './asset.js';


export default {

  BuildMap: (mapData, settings, fillGround, mapToTileHeightMod, startX, startY, chunkSize) => {

    const grass_guid = '01c3a210-94fb-449f-8c47-993eda3e7126';
    const dirt_guid = 'd52cfe32-67b6-4717-a2cf-e59a44822f17';
    const sand_guid = '4bfbdf17-8c93-48b2-adf8-f2ab39135e0b';

    let addTile = (dataArray, x, y, height) => {
      dataArray.push({
        'rotation': Math.floor(Math.random() * 3) * 4,
        'bounds': {
          'center': {'x': y*2, 'y': height*2, 'z': x*2},
          'extents': {'x': 1, 'y': 1, 'z': 1}
        }
      });
    }
    let convertToTileHeight = (mapHeight) => {
      return Math.floor(mapHeight*mapToTileHeightMod)+1;
    }

    const tileHeight = TalespireSlabs.GetAsset(dirt_guid)['height'];

    const oceanHeight = convertToTileHeight(settings.oceanHeight);
    const mountainHeight = convertToTileHeight(settings.mountainHeight);

    let output = {};
    let extraData = {};
    output[dirt_guid] = [];
    output[grass_guid] = [];
    output[sand_guid] = [];

    for(let x = startX; x < startX+chunkSize; x++){
      for(let y = startY; y < startY+chunkSize; y++){
        let tileData = mapData[x*settings.unitSize][y*settings.unitSize];
        let height = convertToTileHeight(tileData.height);
        
        let minI = 0, maxI = height;
        if(!fillGround){ minI = height-1; maxI = height; }

        for (let i = minI; i <= maxI; i++) {

          if(height > oceanHeight) {
            if(i == height){
              addTile(output[grass_guid], x, y, i * tileHeight);
            } else {
              addTile(output[dirt_guid], x, y, i * tileHeight);
            }
          } else {
            addTile(output[sand_guid], x, y, i * tileHeight);
          }

        }

      }
    }

    let response = [];
    Object.entries(output).forEach(function(outputItem) {
       response.push({'nguid': outputItem[0], 'assets': outputItem[1]});
    });
    return [response, extraData];
  }

}