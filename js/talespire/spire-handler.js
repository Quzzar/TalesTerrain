
import Main from '../map-gen/main.js';
import GenBuilder from './gen-builder.js';

const MAX_SIZE_BYTES = 30000;

export default {

  init: (settings) => {

    // Complete Button
    $('#complete-map-btn').on("click", function(){
      //$('#complete-modal-text-output').html('');
      $('#complete-modal').addClass('is-active');
    });

    // Complete Modal Buttons
    $('#complete-modal-background, #complete-modal-close-btn').on("click", function(){
      $('#complete-modal').removeClass('is-active');
    });

    // Map to Tile Height //
    $('#modalSetting-mapToTileHeight').on('input',() => {
      let val = $('#modalSetting-mapToTileHeight').val();
      $('#modalSettingOutput-mapToTileHeight').text(val);
    });


    // Output Modal Buttons
    $('#output-modal-background, #output-modal-close-btn').on("click", function(){
      $('#output-modal').removeClass('is-active');
    });

  },
  buildSlabParts: buildSlabParts,
  buildBtn: buildBtn,

}


function buildSlabParts(numSplits, mapData, settings) {

  const fillGround = $('#modalSetting-fillGround').prop('checked');
  const mapToTileHeightMod = parseInt($('#modalSetting-mapToTileHeight').val());

  let encodedTextArray = [];
  let mapChunkSize = (settings.mapDimension/settings.unitSize)/numSplits;

  console.log(`Split Count: ${numSplits} - Chunk Size: ${mapChunkSize}`);

  for(let s_x = 0; s_x < numSplits; s_x++){
    for(let s_y = 0; s_y < numSplits; s_y++){

      let slabData = GenBuilder.BuildMap(mapData, settings, fillGround, mapToTileHeightMod,
                    s_x*mapChunkSize, s_y*mapChunkSize, mapChunkSize);
      //let extraData = slabData[1];

      let encodedText;
      try {
        encodedText = TalespireSlabs.CreateSlab(slabData[0]);
      } catch (err) {
        return null;
      }

      let sizeInBytes = new Blob([encodedText]).size;
      if(sizeInBytes <= MAX_SIZE_BYTES) {
        console.log(`Okay size: ${sizeInBytes} bytes`);
        encodedTextArray.push(encodedText);
      } else {
        console.log(`Too large! ${sizeInBytes} bytes`);
        return null;
      }

    }
  }
  if(encodedTextArray.length == 0) { encodedTextArray = null; }
  return encodedTextArray;

}


function buildBtn(mapData, settings) {

  $('#complete-modal-convert-btn').off();
  $('#complete-modal-convert-btn').on("click", function(){
    //let assets = TalespireSlabs.GetAllAssets();
    //let grassAsset = TalespireSlabs.GetAsset(nguid);

    let encodedTextArray;
    for(let i = 0; i < 6; i++){

      let numSplits = Math.pow(2, i);
      encodedTextArray = buildSlabParts(numSplits, mapData, settings);
      if(encodedTextArray != null){
        break;
      } else {
        console.log('Gave error / was too large, trying again but smaller...')
      }

    }

    if(encodedTextArray == null){
      console.error('Failed to build and convert to slab!');
    } else {
      $('#output-modal-text-output').html('');
      console.log(`Complete! ${encodedTextArray.length} slabs created.`);

      for(let i = 0; i < encodedTextArray.length; i++){
        let encodedText = encodedTextArray[i];

        $('#output-modal-text-output').append(`
          <div class="py-1 px-3">
            <button id="output-modal-copy-text-${i}" class="button is-success is-outlined">
              <span>#${i+1} - Copy</span>
              <span class="icon"><i class="fas fa-copy"></i></span>
            </button>
            <textarea id="output-modal-text-output-${i}" class="textarea is-sr-only">${encodedText}</textarea>
          </div>
        `);

        $('#output-modal-copy-text-'+i).on("click", function(){
          document.getElementById('output-modal-text-output-'+i).select();
          document.execCommand('copy');
          bulmaToast.toast({
            message: `#${i+1} Copied to Clipboard`,
            type: 'is-success',
            duration: 1000,
          })
        });

      }

      $('#output-modal-image').attr('src', mapCanvas.toDataURL());

      
      $('#output-modal').addClass('is-active');

    }

  });

}