
import Main from '../map-gen/main.js';
import GenBuilder from './gen-builder.js';

export default {

  init: (settings) => {

    // Complete Button
    $('#complete-map-btn').on("click", function(){
      $('#test-output').text('');
      $('#complete-modal').addClass('is-active');
    });

    // Modal Buttons
    $('#complete-modal-background, #complete-modal-close-btn').on("click", function(){
      $('#complete-modal').removeClass('is-active');
    });

  },
  buildBtn: (mapData, settings) => {

    $('#complete-modal-convert-btn').off();
    $('#complete-modal-convert-btn').on("click", function(){
      //let assets = TalespireSlabs.GetAllAssets();
      //let grassAsset = TalespireSlabs.GetAsset(nguid)

      let slab = [];

      var floorData = GenBuilder.BuildMap(mapData, settings);
      let extraData = floorData[1];
      var floors = floorData[0];
      floors.forEach(function (floor) {
        slab.push(floor);
      });

      let custom_results = TalespireSlabs.CreateSlab(slab);
      //console.log(custom_results);
      $('#test-output').text(custom_results);

    });

  }

}