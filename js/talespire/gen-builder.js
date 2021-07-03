
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
guidMap.set('stone', '074f33e5-bf55-47cc-802a-11542f510e5e');
guidMap.set('dungeon', 'bdd9483a-3d7c-4f06-bfdd-145765045c0d');
guidMap.set('swamp', '126e3c30-8188-4bd0-9288-493ea00679c3');
guidMap.set('swamp_puddle', 'cc35e061-a0ff-49be-a512-abcf0148aec2');
guidMap.set('swamp_puddles', '4b6a7bf2-d68d-420f-b4f5-5d548a6c98d8');
guidMap.set('snow', '4b31606e-f19b-4923-8aea-306826b7e13b');
guidMap.set('desert_dry', 'f4fbf14e-df4d-4442-9dc6-c230e83ca495');
guidMap.set('desert_1', '4bfbdf17-8c93-48b2-adf8-f2ab39135e0b');
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
guidMap.set('tree_swamp_base_1', 'bde3cd3b-d65e-4870-b382-668c422e2783');
guidMap.set('tree_swamp_base_2', 'bb56c594-f8aa-4fa5-8a0b-f059a5a45ae1');
guidMap.set('tree_swamp_mid_1', 'f44a71f5-1b38-434a-96c8-88be958e1794');
guidMap.set('tree_swamp_mid_2', '074506d6-c867-4475-b102-3fc33269f0b9');
guidMap.set('tree_swamp_mid_3', '53e9c209-fa50-408a-8fa3-0c9bb9db0bb7');
guidMap.set('tree_swamp_mid_4', 'f08fbb11-2707-4be0-bc79-fc9e0de0a61c');
guidMap.set('tree_swamp_top_1', 'efa2e065-77ef-4a1c-b43b-f43f1b9eaf66');
guidMap.set('tree_pine_middle_1', 'bb8472c0-6690-4879-9afc-147ee7741b43');
guidMap.set('tree_pine_middle_2', '11d81942-7c92-437a-841b-a6760d5e907e');
guidMap.set('tree_pine_middle_3', '14cf49de-999e-41cb-a617-7b0b9c10b1a4');
guidMap.set('tree_pine_middle_4', 'ee63836f-b03a-428b-8fb9-9848595124a4');
guidMap.set('tree_pine_middle_5', '4b4ffc04-4534-4924-84d4-9f3b9e438d81');
guidMap.set('tree_pine_stump', 'e5a66bdc-37cc-4317-b4c6-a1b88c3392e9');
guidMap.set('tree_pine_top', '3f883945-6d03-4a4b-a1bb-511213c3b9da');
guidMap.set('tree_pine_top_snow', '2d376ad1-ceb0-4014-b46f-20805d0dcf78');
guidMap.set('tree_dead', 'ecac8c32-c044-4e97-8d8f-157a83968956');
guidMap.set('tree_dead_2', 'afc09e2f-3673-4f91-b8b1-5b9df1537da6');
guidMap.set('tree_dead_3', '431d6291-4b36-4c52-89da-db337a0c6073');
guidMap.set('tree_dead_maple', '96cf5f92-9d99-47f1-a0e2-dc1da1c9be4a');
guidMap.set('tree_dead_snow', '24f43e36-e8a4-4ea9-80b3-be32045eb75c');
guidMap.set('tree_mushroom_base_1', '6a365371-2719-4c46-8179-26bbfad9f185');
guidMap.set('tree_mushroom_base_2', '6ca1dec4-c997-4e59-9e97-3e9f68fa599c');
guidMap.set('tree_mushroom_mid_1', '01dcdd32-35fe-4264-8c83-c827c84395c5');
guidMap.set('tree_mushroom_mid_2', '628d670a-e6e2-4644-9b80-cf7ead664e10');
guidMap.set('tree_mushroom_mid_3', '04ae06ee-8edd-43fe-8578-e57cfbfe5d7d');
guidMap.set('tree_mushroom_mid_4', '32005ae8-70cc-4716-9ece-a856efab3949');
guidMap.set('tree_mushroom_top_1', '7965bdf8-c83c-47a8-a737-b76db6d8f4f0');
guidMap.set('tree_mushroom_top_2', '569c048d-b8b6-4d05-9bc6-fb1f9a905df2');
guidMap.set('tree_mushroom_top_3', 'd37d2f53-2a58-4ff6-a5c4-44eae18c9984');
guidMap.set('tree_mushroom_top_4', '32b49a2c-0d28-4bf6-82cc-f7133f0ff07e');
guidMap.set('log_moss', '3ef32c7a-ddab-41c1-aac4-4b59abad193e');
guidMap.set('tree_jungle_base_1', '6a7b1080-8aa4-4725-a2c7-8c3612f14d81');
guidMap.set('tree_jungle_mid_1', 'f73916c8-23b7-4bc7-bd19-869bc701de01');
guidMap.set('tree_jungle_top_1', 'c0a9dd10-96b7-46fe-8ff3-9d46184f106f');
guidMap.set('tree_jungle_top_2', '143c029c-34d6-4821-a5d3-76437114b7e0');
guidMap.set('tree_jungle_top_3', 'e2ed469f-6bce-4da0-823a-76dc049d8cbf');


guidMap.set('plant_philodendron_single', '46ad1cbe-0854-4a36-a238-adad7b408ceb');
guidMap.set('plant_philodendron_multiple', '8fcd4b46-c6f3-4d50-b950-ef4557ffe7b4');
guidMap.set('plant_fern_1', '6b9e66b5-2b8c-4ccf-a4e0-53acb0d8a273');
guidMap.set('plant_fern_2', 'e7ad17da-7bd9-47d1-be33-46b0c1bc637f');
guidMap.set('plant_cactus_single_1', '6d5f9341-398c-4ae4-847b-2a59f88bcb4e');
guidMap.set('plant_cactus_multiple', 'd1376c81-4b7e-4fe8-b4a1-20b3379caed0');
guidMap.set('plant_cactus_single_2', 'd2bb65f1-2aab-46a1-b37c-def32a0ee116');
guidMap.set('plant_cactus_standing_1', '58c490aa-ccd3-4008-87f3-13935b8a4f1c');
guidMap.set('plant_cactus_standing_2', 'a40f8e11-9143-45b6-b81d-2d78b81b917d');
guidMap.set('plant_lily_flower', '2fa04957-41fa-480b-9099-8939dd25956d');
guidMap.set('plant_lily_pad_1', '277edf44-e481-45a6-8a67-f91579e22778');
guidMap.set('plant_lily_pad_2', '90e6eb4a-36ce-47db-b9dc-8ad6d69b12af');
guidMap.set('plant_lily_pad_3', '9a38a18c-44fd-4dcf-9957-c30e234d8845');
guidMap.set('plant_reed_1', '63650e1d-6b11-4807-afd1-17aaf3330a68');
guidMap.set('plant_reed_2', 'a2d4ea14-e21c-43d2-a884-0037f6ac4c25');
guidMap.set('plant_reed_horsetail_1', '3dae85f6-7870-4751-8e14-9a07e15cdb4b');
guidMap.set('plant_reed_horsetail_2', 'ee883ad9-758f-488e-8c4e-f300abd86e8c');
guidMap.set('plant_reed_horsetail_3', 'e77fa8de-d9c1-49ec-8d16-23fc7be82959');
guidMap.set('plant_reed_horsetail_4', 'f162d284-f144-4c62-8346-050ba33e4161');
guidMap.set('plant_reed_horsetail_5', '8411ea5f-577c-4bfa-86eb-e598f2fa50ed');
guidMap.set('plant_jungle_1', '4de18886-e851-41db-a907-42bef532f1f5');
guidMap.set('plant_jungle_2', '9634779e-6d8f-4101-b552-af178d551b5f');
guidMap.set('plant_pitcher_batch', '6c2a5846-5e94-4053-90a4-6273e3c4490e');
guidMap.set('plant_pitcher', '40d23a3b-aad4-4725-ab94-4e71c37b2a32');
guidMap.set('plant_flower_plumeria', 'c04bb850-c0fb-4621-9980-53cb3935f72f');
guidMap.set('plant_mushroom_patch', '532caecc-08e9-49fb-8984-2d6929f46cc3');
// guidMap.set('', );

guidMap.set('ocean_barnacles_1', 'f6e51d9f-ae54-48ba-b128-60a01ddb3fad');
guidMap.set('ocean_barnacles_2', 'a799ee0a-a40b-42e9-92ee-b7a5301a57d2');
guidMap.set('ocean_shell_blue', '152ef8ef-5575-43e8-b1e6-fc02943c41d9');
guidMap.set('ocean_shell_set', '39c41cb8-bf5a-4b7b-8268-09de48bcef92');
guidMap.set('ocean_shell_clam', 'ecb4cd7d-f59f-4763-b930-64922a77ad82');
guidMap.set('ocean_starfish', '5bb65bb9-a8c0-41da-8ca4-dcbd2292127e');

guidMap.set('rock_boulder_large', '451e9727-bc73-462c-8c46-512687e6e170');
guidMap.set('rock_boulder_large_snow', '7c29ce52-5f82-4889-9579-3d6bd6c280a5');
guidMap.set('rock_small', '923bc5e3-a845-403f-93dd-035dbd276279');
guidMap.set('rock_cliff_snowy_type', 'a6e6fe14-4f68-4a2b-8425-e3d85d044418');
guidMap.set('rock_cliff', 'a79a9a45-3bf2-4775-98c8-559ca5211532');
guidMap.set('rock_cliff_snow', 'af71f233-e462-4ba2-99ed-99dada3c7032');
guidMap.set('rock_cliff_desert_1', 'f2a57416-c1ea-47af-9ce2-a6161a23365d');
guidMap.set('rock_cliff_desert_2', 'adf63b33-bf80-4176-8d6d-07dcee579684');
guidMap.set('rock_cliff_desert_3', 'f4e9d129-c175-4efb-9462-662793171443');
guidMap.set('rock_cliff_desert_4', 'cdfc2068-f4e6-42a0-9672-cd99ff162509');
guidMap.set('rock_cliff_desert_pile', '31a706bc-f39a-427b-b66d-80f7d52e80e2');

function BuildMap(mapData, settings, fillGround, mapToTileHeightMod, startX, startY, chunkSize) {

  let addTile = (dataArray, x, y, height, rotate=null) => {
    dataArray.push({
      'rotation': (rotate == null) ? (Math.floor(Math.random() * 3) * 4) : rotate,
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

  const useBiomes = $('#modalSetting-useBiomes').prop('checked');
  const oceanHeight = convertToTileHeight(settings.oceanHeight);
  const mountainHeight = convertToTileHeight(settings.mountainHeight);

  let output = {};
  let extraData = {};
  for(const [name, guid] of guidMap.entries()){ output[guid] = []; }

  let lowestHeight = 999999; let lowestX = null; let lowestY = null; let lowestMinI = null;
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

        let minHeight = Math.min(westHeight, eastHeight, northHeight, southHeight, height);
        minI = minHeight;

      }

      // Find if lowest height so far,
      if(lowestHeight > height) {
        lowestHeight = height;
        lowestX = x;
        lowestY = y;
        lowestMinI = minI;
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
          let oceanTile = 'grass';
          if(useBiomes){ oceanTile = 'sand'; }
          addTile(output[guidMap.get(oceanTile)], x, y, i * tileHeight);
          tileData.assetData.tileGuid = guidMap.get(oceanTile);
        }

      }


      // Set Surface Assets
      if(useBiomes) {

        let biome = getBiomeFromTileData(tileData, settings);
        
        if(biome == 'CRAG'){

          if(height >= oceanHeight){
            if(randChance(10)){
              if(randChance(40)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(40)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(40)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(40)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            }
          }

        }

        if(biome == 'SAVANNA'){

          if(tileData.assetData.tileGuid == guidMap.get('grass') && randChance(35)){

            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(15)){
              addTile(output[guidMap.get('tree_dead')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

          }

        }

        if(biome == 'SWAMP'){

          if((height >= oceanHeight - 3*tileHeight) && randChance(25)){
            addTile(output[guidMap.get(randChoice('plant_lily_flower', 'plant_lily_pad_1', 'plant_lily_pad_2', 'plant_lily_pad_3'))],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if((height >= oceanHeight - 3*tileHeight) && randChance(25)){
            addTile(output[guidMap.get(randChoice('plant_reed_1', 'plant_reed_2'))],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if((height >= oceanHeight) && randChance(5)){
            addTile(output[guidMap.get('plant_mushroom_patch')],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if((height >= oceanHeight - 3*tileHeight) && randChance(20)){
            addTile(output[guidMap.get(randChoice('plant_reed_horsetail_1', 'plant_reed_horsetail_2', 'plant_reed_horsetail_3',
                    'plant_reed_horsetail_4', 'plant_reed_horsetail_5'))], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if((height >= oceanHeight - 3*tileHeight) && randChance(5)){
            addTile(output[guidMap.get(randChoice('tree_swamp_base_1', 'tree_swamp_base_2'))], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          /*
          if(height >= oceanHeight && randChance(15)){
            const rotate = Math.floor(Math.random() * 3) * 4;
            const base_tileHeight = 2;
            const mid_tileHeight = 1;

            let x_rel = randRange(x,x+0.5); let y_rel = randRange(y,y+0.5);
            addTile(output[guidMap.get(randChoice('tree_swamp_base_1', 'tree_swamp_base_2'))], x_rel, y_rel, (height+1)*tileHeight, rotate);
            addTile(output[guidMap.get(randChoice('tree_swamp_mid_1', 'tree_swamp_mid_2', 'tree_swamp_mid_3', 'tree_swamp_mid_4'))],
                    x_rel, y_rel, (height+1)*tileHeight+base_tileHeight, rotate);
            addTile(output[guidMap.get('tree_swamp_top_1')], x_rel, y_rel, (height+1)*tileHeight+base_tileHeight+mid_tileHeight, rotate);
          }*/

        }

        if(biome == 'DESERT'){

          if(height >= oceanHeight && randChance(10)){
            addTile(output[guidMap.get(randChoice('plant_cactus_standing_1', 'plant_cactus_standing_2', 'plant_cactus_multiple'))],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if(height >= oceanHeight && randChance(3)){
            for (let i = 0; i < 3; i++) {
              if (randChance(35)){
                addTile(output[guidMap.get(randChoice('plant_cactus_single_1', 'plant_cactus_single_2', 'plant_cactus_multiple'))],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            }
          }
          if(height >= oceanHeight && randChance(0.1)){
            addTile(output[guidMap.get(randChoice('rock_cliff_desert_3', 'rock_cliff_desert_4'))],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
          if(randChance(1)){
            addTile(output[guidMap.get('rock_cliff_desert_pile')],
                    randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }

        }

        if(biome == 'RAINFOREST'){

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

          if(tileData.assetData.tileGuid != guidMap.get('sand')){

            if(randChance(50)){
              addTile(output[guidMap.get('plant_jungle_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(50)){
              addTile(output[guidMap.get('plant_jungle_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(25)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(25)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(5)){
              addTile(output[guidMap.get('plant_pitcher')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(15)){
              addTile(output[guidMap.get('plant_flower_plumeria')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(5)){
              addTile(output[guidMap.get('plant_mushroom_patch')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

            if(randChance(40)){

              const base_tileHeight = 1;
              const mid_tileHeight = 0.5;

              let x_rel = randRange(x,x+0.5); let y_rel = randRange(y,y+0.5);

              addTile(output[guidMap.get('tree_jungle_base_1')], x_rel, y_rel, (height+1)*tileHeight);
              let rel_height = 0;
              for (let i = 0; i < Math.round(Math.random()*3); i++) {
                addTile(output[guidMap.get('tree_jungle_mid_1')], x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);
                rel_height += mid_tileHeight;
              }
              addTile(output[guidMap.get(randChoice('tree_jungle_top_1', 'tree_jungle_top_2', 'tree_jungle_top_3'))],
                      x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);

            } else if(randChance(30)) {

              let x_rel = randRange(x,x+0.5); let y_rel = randRange(y,y+0.5);

              addTile(output[guidMap.get(randChoice('tree_jungle_top_1', 'tree_jungle_top_2', 'tree_jungle_top_3'))],
                      x_rel, y_rel, (height+1)*tileHeight);

            }

          }

        }

        if(biome == 'FOREST'){

          // Forest Tree
          if(tileData.assetData.tileGuid == guidMap.get('grass')){

            if(randChance(50)){
              addTile(output[guidMap.get('tree_forest')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);

              if(randChance(30)){
                addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(30)){
                addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            }

            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

            if(randChance(5)){
              addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
  
            if(randChance(5)){
              addTile(output[guidMap.get('log_moss')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            
          }

        }

        if(biome == 'SEASONAL_FOREST'){

          if(tileData.assetData.tileGuid == guidMap.get('grass')){

            if(randChance(30)){
              addTile(output[guidMap.get('tree_forest')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
  
              if(randChance(40)){
                addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(40)){
                addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            } else if(randChance(30)){
              addTile(output[guidMap.get('tree_dead_maple')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
  
              if(randChance(30)){
                addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(30)){
                addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(40)){
                addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            }
  
            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(30)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

          }

        }

        if(biome == 'PLAINS'){

          if(tileData.assetData.tileGuid == guidMap.get('grass') && randChance(40)){

            if(randChance(40)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(40)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(40)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(1)){
              addTile(output[guidMap.get('log_moss')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

          }

        }

        if(biome == 'SHRUBLAND'){

          if(tileData.assetData.tileGuid == guidMap.get('grass') && randChance(35)){

            if(randChance(60)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(60)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(60)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

          }

        }

        if(biome == 'TAIGA'){

          if(tileData.assetData.tileGuid != guidMap.get('sand')){

            if(randChance(25)){
              addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(25)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(25)){
              addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(3)){
              addTile(output[guidMap.get('rock_boulder_large_snow')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

            if(randChance(5)){
              if(randChance(30)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(30)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(30)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(10)){
                addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            }

            if(randChance(15)){

              const base_tileHeight = 0.5;
              const mid_tileHeight = 0.5;

              let x_rel = randRange(x,x+0.5); let y_rel = randRange(y,y+0.5);

              addTile(output[guidMap.get('tree_pine_stump')], x_rel, y_rel, (height+1)*tileHeight);
              let rel_height = 0;
              for (let i = 0; i < Math.ceil(Math.random()*5); i++) {
                if(tileData.assetData.tileGuid == guidMap.get('snow')){
                  addTile(output[guidMap.get('tree_pine_top_snow')], x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);
                } else {
                  addTile(output[guidMap.get('tree_pine_top')], x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);
                }
                rel_height += mid_tileHeight;
              }

            } else if(randChance(10)){

              const base_tileHeight = 0.5;
              const mid_tileHeight = 0.5;

              let x_rel = randRange(x,x+0.5); let y_rel = randRange(y,y+0.5);

              addTile(output[guidMap.get('tree_pine_stump')], x_rel, y_rel, (height+1)*tileHeight);
              let rel_height = 0;
              for (let i = 0; i < Math.round(Math.random()*5); i++) {
                addTile(output[guidMap.get(randChoice('tree_pine_middle_1', 'tree_pine_middle_2', 'tree_pine_middle_3',
                        'tree_pine_middle_4', 'tree_pine_middle_5'))], x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);
                rel_height += mid_tileHeight;
              }
              if(tileData.assetData.tileGuid == guidMap.get('snow')){
                addTile(output[guidMap.get('tree_pine_top_snow')], x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);
              } else {
                addTile(output[guidMap.get('tree_pine_top')], x_rel, y_rel, (height+1)*tileHeight + base_tileHeight+rel_height);
              }

            }

          }

        }

        if(biome == 'TUNDRA'){

          if(tileData.assetData.tileGuid == guidMap.get('snow')){

            if(randChance(3)){
              addTile(output[guidMap.get('tree_dead_snow')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              if(randChance(15)){
                addTile(output[guidMap.get('plant_fern_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(15)){
                addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
              if(randChance(15)){
                addTile(output[guidMap.get('plant_fern_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
              }
            }

            if(randChance(5)){
              addTile(output[guidMap.get('rock_small')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }

          }

        }

        // Any non-sand biome, for beach
        if(biome != 'DESERT' && height >= oceanHeight && tileData.assetData.tileGuid == guidMap.get('sand')){
          if(randChance(10)){
            if(randChance(50)){
              addTile(output[guidMap.get('ocean_barnacles_1')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(50)){
              addTile(output[guidMap.get('ocean_barnacles_2')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(30)){
              addTile(output[guidMap.get('ocean_starfish')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
          }

          if(randChance(20)){
            if(randChance(20)){
              addTile(output[guidMap.get('ocean_shell_blue')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(10)){
              addTile(output[guidMap.get('ocean_shell_set')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
            if(randChance(20)){
              addTile(output[guidMap.get('ocean_shell_clam')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
            }
          }

          if(randChance(10)){
            addTile(output[guidMap.get('ocean_starfish')], randRange(x,x+0.5), randRange(y,y+0.5), (height+1)*tileHeight);
          }
        }

        // Cliffs
        /*
        if(height >= oceanHeight){
          let tileIncline = mapToTileHeightMod*(tileData.incline.value-1.0);
          //console.log(tileIncline);
          if(tileIncline > 8){
            addTile(output[guidMap.get('rock_boulder_large')], randRange(x+0.4,x+0.6), randRange(y+0.4,y+0.6), (height+1)*tileHeight, 1);
            if(tileIncline > 14){
              addTile(output[guidMap.get('rock_boulder_large')], randRange(x+0.4,x+0.6), randRange(y+0.4,y+0.6), (height+3)*tileHeight, 1);
              if(tileIncline > 18){
                addTile(output[guidMap.get('rock_boulder_large')], randRange(x+0.4,x+0.6), randRange(y+0.4,y+0.6), (height+5)*tileHeight, 1);
              }
            }
          }
        }*/


      }

    }
  }

  // Set pillar to fix TaleSpire lowering terrain
  if(!fillGround){
    for (let i = 0; i < lowestMinI; i++) {
      addTile(output[guidMap.get('dirt')], lowestX, lowestY, i * tileHeight);
    }
  }
  addTile(output[guidMap.get('ocean_starfish')], lowestX+0.5, lowestY+0.5, 0); //Fix bug, each slab needs an ocean_starfish

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
        return guidMap.get('stone');
      } else {
        return guidMap.get('stone');
      }
    } else if (biome == 'DESERT'){
      if(isSurface){
        return guidMap.get(randChoice('desert_1','desert_1','desert_1'));
      } else {
        return guidMap.get('desert_1');
      }
    } else if (biome == 'FOREST'){
      if(isSurface){
        return guidMap.get('grass');
      } else {
        return guidMap.get('dirt');
      }
    } else if (biome == 'MOUNTAIN'){
      if(isSurface){
        return guidMap.get('stone');
      } else {
        return guidMap.get('stone');
      }
    } else if (biome == 'PLAINS'){
      if(isSurface){
        return guidMap.get('grass');
      } else {
        return guidMap.get('dirt');
      }
    } else if (biome == 'RAINFOREST'){
      if(isSurface){
        return guidMap.get(randChoice('jungle_1','jungle_2','jungle_3'));
      } else {
        return guidMap.get('tilled_dirt');
      }
    } else if (biome == 'SAVANNA'){
      if(isSurface){
        return guidMap.get('grass');
      } else {
        return guidMap.get('dirt');
      }
    } else if (biome == 'SEASONAL_FOREST'){
      if(isSurface){
        return guidMap.get('grass');
      } else {
        return guidMap.get('dirt');
      }
    } else if (biome == 'SHRUBLAND'){
      if(isSurface){
        return guidMap.get('grass');
      } else {
        return guidMap.get('dirt');
      }
    } else if (biome == 'SWAMP'){
      if(isSurface){
        return guidMap.get(randChoice('swamp_puddles','swamp_puddle','swamp'));
      } else {
        return guidMap.get('swamp');
      }
    } else if (biome == 'TAIGA'){
      if(isSurface){
        return guidMap.get(randChoice('snow','grass'));
      } else {
        return guidMap.get('cave');
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