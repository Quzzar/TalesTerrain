
function initSettings(settings) {

  $('#setting-oceanHeight').val(settings.oceanHeight);
  $('#settingOutput-oceanHeight').text(settings.oceanHeight);
  $('#setting-oceanHeight').on('input',() => {
    let val = parseFloat($('#setting-oceanHeight').val());
    $('#settingOutput-oceanHeight').text(val);
    settings.oceanHeight = val;
  });

  $('#setting-mountainHeight').val(settings.mountainHeight);
  $('#settingOutput-mountainHeight').text(settings.mountainHeight);
  $('#setting-mountainHeight').on('input',() => {
    let val = parseFloat($('#setting-mountainHeight').val());
    $('#settingOutput-mountainHeight').text(val);
    settings.mountainHeight = val;
  });

  $('#setting-unitSize').val(settings.unitSize);
  $('#settingOutput-unitSize').text(settings.unitSize);
  $('#setting-unitSize').on('input',() => {
    let val = parseInt($('#setting-unitSize').val());
    $('#settingOutput-unitSize').text(val);
    settings.unitSize = val;
  });


  /*
  const x = document.getElementById('input');
  const y = document.getElementById('output');

  const a = 100;
  const b = Math.pow(a, 1/a);

  function updateOutput(event) {
    y.innerText = Math.floor(a * Math.pow(b, x.value));
  }
  updateOutput();
  input.addEventListener('mousemove', updateOutput);
  */

}
