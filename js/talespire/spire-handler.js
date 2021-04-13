
import Main from '../map-gen/main.js';
import Asset from './asset.js';

export default {

  init: (settings) => {

    // Complete Button
    $('#complete-map-btn').on("click", function(){
      $('#complete-modal').addClass('is-active');
    });

    // Modal Buttons
    $('#complete-modal-background, #complete-modal-close-btn').on("click", function(){
      $('#complete-modal').removeClass('is-active');
    });

  }

}