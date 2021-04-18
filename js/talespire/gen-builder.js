
import Asset from './asset.js';


export default {
  BuildMap: BuildMap,
}


let guidMap = new Map();
guidMap.set('grass', '01c3a210-94fb-449f-8c47-993eda3e7126');
guidMap.set('dirt', '0582fb0c-9fd0-4355-9bf8-821027ecc74d');
guidMap.set('tilled_dirt', 'd52cfe32-67b6-4717-a2cf-e59a44822f17');
guidMap.set('sand', '4bfbdf17-8c93-48b2-adf8-f2ab39135e0b');
guidMap.set('cave', 'b83392b1-8833-43c9-a97f-2ac3df659e66');
guidMap.set('dungeon', 'bdd9483a-3d7c-4f06-bfdd-145765045c0d');
guidMap.set('swamp', '126e3c30-8188-4bd0-9288-493ea00679c3');
guidMap.set('swamp_puddle', 'cc35e061-a0ff-49be-a512-abcf0148aec2');
guidMap.set('swamp_puddles', '4b6a7bf2-d68d-420f-b4f5-5d548a6c98d8');
guidMap.set('snow', '4b31606e-f19b-4923-8aea-306826b7e13b');
guidMap.set('desert_dry', 'f4fbf14e-df4d-4442-9dc6-c230e83ca495');
guidMap.set('desert_1', '35a4af95-4afc-45a8-a657-a5601f4ad879');
guidMap.set('desert_2', '9536a8fb-ab44-4b73-a430-6d17fd6316d4');
guidMap.set('jungle_1', '2a50b735-3621-4880-9e88-11a6fff656c2');
guidMap.set('jungle_2', '231d8abb-9fa5-4e49-92e1-bd38f0bcf9b5');
guidMap.set('jungle_3', '5463a50a-4b72-48f4-af5e-ebe46b60e260');
guidMap.set('grass_sparse', '3911d10d-142b-4f33-9fea-5d3a10c53781');
//guidMap.set('desert', '');

guidMap.set('tree_palm_1', '14ecdcf5-c847-466c-bc6a-027872c9b3ef');
guidMap.set('tree_palm_2', 'dd2fd4a6-cc11-4cb4-ba25-7e19fd11ba91');
guidMap.set('tree_dead_old', '2d116c8f-471c-4144-bd98-20a969281128');
guidMap.set('tree_dead_1', '12f8679e-6100-4da2-a3bd-a3fcc925ab30');
guidMap.set('tree_dead_2', '2aeacfa9-b84d-418f-86c7-cdb85e2f4c13');
guidMap.set('tree_dead_3', 'ed9bc853-bed5-443c-b45f-a7133d55011a');
guidMap.set('tree_forest', 'd5b7910a-ae06-4ad3-91f6-cbbd8782bbea');

guidMap.set('plant_philodendron_single', '46ad1cbe-0854-4a36-a238-adad7b408ceb');
guidMap.set('plant_philodendron_multiple', '8fcd4b46-c6f3-4d50-b950-ef4557ffe7b4');
guidMap.set('plant_fern_1', '6b9e66b5-2b8c-4ccf-a4e0-53acb0d8a273');
guidMap.set('plant_fern_2', 'e7ad17da-7bd9-47d1-be33-46b0c1bc637f');
/*guidMap.set('plant_fern_1', '');
guidMap.set('plant_fern_1', '');
guidMap.set('plant_fern_1', '');
guidMap.set('plant_fern_1', '');*/


function BuildMap(mapData, settings, fillGround, mapToTileHeightMod, startX, startY, chunkSize) {

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
  let getTileData = (x, y) => {
    return mapData[x*settings.unitSize][y*settings.unitSize];
  }

  const tileHeight = TalespireSlabs.GetAsset(guidMap.get('dirt'))['height'];

  const oceanHeight = convertToTileHeight(settings.oceanHeight);
  const mountainHeight = convertToTileHeight(settings.mountainHeight);

  let output = {};
  let extraData = {};
  for(const [name, guid] of guidMap.entries()){ output[guid] = []; }

  for(let x = startX; x < startX+chunkSize; x++){
    for(let y = startY; y < startY+chunkSize; y++){
      let tileData = mapData[x*settings.unitSize][y*settings.unitSize];
      tileData.assetData = {};
      let height = convertToTileHeight(tileData.height);
      
      let minI = 0, maxI = height;
      if(!fillGround){
        
        let westHeight = height;
        try {westHeight = convertToTileHeight(getTileData(x-1, y).height); } catch (err) {}
        let eastHeight = height;
        try {eastHeight = convertToTileHeight(getTileData(x+1, y).height); } catch (err) {}
        let northHeight = height;
        try {northHeight = convertToTileHeight(getTileData(x, y-1).height); } catch (err) {}
        let southHeight = height;
        try {southHeight = convertToTileHeight(getTileData(x, y+1).height); } catch (err) {}

        let minHeight = Math.min(westHeight, eastHeight, northHeight, southHeight);
        minI = minHeight;

      }

      // Set Ground Tiles
      for (let i = minI; i <= maxI; i++) {

        if(height > oceanHeight) {

          if(i == height){
            let tileGuid = getBiomeGroundTile(tileData, settings, true);
            addTile(output[tileGuid], x, y, i * tileHeight);
            tileData.assetData.tileGuid = tileGuid;
          } else {
            let tileGuid = getBiomeGroundTile(tileData, settings, false);
            addTile(output[tileGuid], x, y, i * tileHeight);
            tileData.assetData.tileGuid = tileGuid;
          }
        } else {
          addTile(output[guidMap.get('sand')], x, y, i * tileHeight);
          tileData.assetData.tileGuid = guidMap.get('sand');
        }

      }

      // Set pillar to fix TaleSpire lowering terrain
      if(!fillGround){
        if(x == startX && y == startY) {
          for (let i = 0; i < minI; i++) {
            addTile(output[guidMap.get('dirt')], x, y, i * tileHeight);
          }
        }
      }


      // Set Surface Assets
      const useBiomes = $('#modalSetting-useBiomes').prop('checked');
      if(useBiomes) {

        let biome = getBiomeFromTileData(tileData, settings);
        // tree_palm
        if(biome == 'SAVANNA'){

        }

        // Palm Tree
        if(height >= oceanHeight && tileData.assetData.tileGuid == guidMap.get('sand') && randChance(15)){
          if(randChance(50)) {
            addTile(output[guidMap.get('tree_palm_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          } else {
            addTile(output[guidMap.get('tree_palm_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }

          if(randChance(30)){
            addTile(output[guidMap.get('plant_philodendron_multiple')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if(randChance(30)){
            addTile(output[guidMap.get('plant_philodendron_multiple')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if(randChance(30)){
            addTile(output[guidMap.get('plant_philodendron_single')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
        }

        // Forest Tree
        if(tileData.assetData.tileGuid == guidMap.get('grass') && randChance(15)){
          addTile(output[guidMap.get('tree_forest')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);

          if(randChance(30)){
            addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if(randChance(30)){
            addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
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


function getBiomeGroundTile(tileData, settings, isSurface){

  const useBiomes = $('#modalSetting-useBiomes').prop('checked');

  if(useBiomes) {

    let biome = getBiomeFromTileData(tileData, settings);
    if (biome == 'CRAG'){
      if(isSurface){
        return guidMap.get('cave');
      } else {
        return guidMap.get('cave');
      }
    } else if (biome == 'SWAMP'){
      if(isSurface){
        return guidMap.get('swamp_puddles');
      } else {
        return guidMap.get('swamp');
      }
    } else if (biome == 'RAINFOREST'){
      if(isSurface){
        return guidMap.get('jungle_1');
      } else {
        return guidMap.get('tilled_dirt');
      }
    } else if (biome == 'TUNDRA'){
      if(isSurface){
        return guidMap.get('snow');
      } else {
        return guidMap.get('cave');
      }
    } else {
      if(isSurface){
        return guidMap.get('grass');
      } else {
        return guidMap.get('dirt');
      }
    }

  } else {
    if(isSurface){
      return guidMap.get('grass');
    } else {
      return guidMap.get('dirt');
    }
  }

}