
import Main from './map-gen/main.js';

export default {

  initSettings: (settings) => {

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
      Main.drawCanvas();
    });
  
    // Map Type //
    $('#setting-mapType').val(settings.mapType);
    $('#setting-mapType').on('change',() => {
      settings.mapType = parseInt($('#setting-mapType').val());
      Main.colorMap();
      Main.drawCanvas();
    });
  
    // Moisture Global //
    const init_moistureGlobal = settings.moistureGlobal;
    $('#setting-moistureGlobal').val(settings.moistureGlobal-init_moistureGlobal);
    $('#settingOutput-moistureGlobal').text(signNum(settings.moistureGlobal-init_moistureGlobal));
    $('#setting-moistureGlobal').on('input',() => {
      let val = parseFloat($('#setting-moistureGlobal').val());
      $('#settingOutput-moistureGlobal').text(signNum(val));
      settings.moistureGlobal = val+init_moistureGlobal;
    });
  
    // Temperature Global //
    const init_temperatureGlobal = settings.temperatureGlobal;
    $('#setting-temperatureGlobal').val(settings.temperatureGlobal-init_temperatureGlobal);
    $('#settingOutput-temperatureGlobal').text(signNum(settings.temperatureGlobal-init_temperatureGlobal));
    $('#setting-temperatureGlobal').on('input',() => {
      let val = parseFloat($('#setting-temperatureGlobal').val());
      $('#settingOutput-temperatureGlobal').text(signNum(val));
      settings.temperatureGlobal = val+init_temperatureGlobal;
    });

    // Roughness //
    $('#setting-roughness').val(settings.roughness);
    $('#settingOutput-roughness').text(settings.roughness);
    $('#setting-roughness').on('input',() => {
      let val = parseFloat($('#setting-roughness').val());
      $('#settingOutput-roughness').text(val);
      settings.roughness = val;
    });

    // Smoothness //
    $('#setting-smoothness').val(settings.smoothness);
    $('#settingOutput-smoothness').text(settings.smoothness);
    $('#setting-smoothness').on('input',() => {
      let val = parseFloat($('#setting-smoothness').val());
      $('#settingOutput-smoothness').text(val);
      settings.smoothness = val;
    });

    // Smooth Iterations //
    $('#setting-smoothIterations').val(settings.smoothIterations);
    $('#settingOutput-smoothIterations').text(settings.smoothIterations);
    $('#setting-smoothIterations').on('input',() => {
      let val = parseInt($('#setting-smoothIterations').val());
      $('#settingOutput-smoothIterations').text(val);
      settings.smoothIterations = val;
    });
  
  }

};
