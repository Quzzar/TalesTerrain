
function initSettings(settings) {

  // Ocean Height //
  $('#setting-oceanHeight').val(settings.oceanHeight);
  $('#settingOutput-oceanHeight').text(settings.oceanHeight);
  $('#setting-oceanHeight').on('input',() => {
    let val = parseFloat($('#setting-oceanHeight').val());
    $('#settingOutput-oceanHeight').text(val);
    settings.oceanHeight = val;
  });

  // Mountain Height //
  $('#setting-mountainHeight').val(settings.mountainHeight);
  $('#settingOutput-mountainHeight').text(settings.mountainHeight);
  $('#setting-mountainHeight').on('input',() => {
    let val = parseFloat($('#setting-mountainHeight').val());
    $('#settingOutput-mountainHeight').text(val);
    settings.mountainHeight = val;
  });

  // Unit Size //
  $('#setting-unitSize').val(Math.log2(settings.unitSize));
  $('#settingOutput-unitSize').text(settings.unitSize);
  $('#setting-unitSize').on('input',() => {
    let val = parseInt($('#setting-unitSize').val());
    val = Math.pow(2, val);
    $('#settingOutput-unitSize').text(val);
    settings.unitSize = val;
  });

  // Map Size //
  $('#setting-mapDimension').val(Math.log2(settings.mapDimension));
  $('#settingOutput-mapDimension').text(settings.mapDimension);
  $('#setting-mapDimension').on('input',() => {
    let val = parseInt($('#setting-mapDimension').val());
    val = Math.pow(2, val);
    $('#settingOutput-mapDimension').text(val);
    settings.mapDimension = val;
  });

  // Wind Direction //
  $('#setting-windsDirection').val(settings.windsDirection);
  $('#setting-windsDirection').on('change',() => {
    settings.windsDirection = $('#setting-windsDirection').val();
  });

  // Display Type //
  $('#setting-displayType').val(settings.displayType);
  $('#setting-displayType').on('change',() => {
    settings.displayType = $('#setting-displayType').val();
  });

}
