
let g_canvasLoadPercentage = 0;
let g_canvasLoadMessage = '';

function setLoadPercentage(percentage, message){
  g_canvasLoadPercentage = percentage;
  g_canvasLoadMessage = message;
  updateLoadBar();
}

function updateLoadBar(){

  $('#loading-canvas').val(g_canvasLoadPercentage);
  $('#loading-canvas').text(g_canvasLoadPercentage+'%');
  $('#loading-message').text(g_canvasLoadMessage);
  if(isLoaded()){
    $('#loading-canvas-container').addClass('is-hidden');
    //$('#canvas-container').removeClass('is-hidden');
    $('#canvas-legend').removeClass('is-hidden');
  } else {
    $('#loading-canvas-container').removeClass('is-hidden');
    //$('#canvas-container').addClass('is-hidden');
    $('#canvas-legend').addClass('is-hidden');
  }

}

function isLoaded(){
  return g_canvasLoadPercentage >= 100;
}

