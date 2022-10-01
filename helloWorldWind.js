// Create a WorldWindow for the canvas.
var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

// Add a placemark
// var placemarkLayer = new WorldWind.RenderableLayer();
// wwd.addLayer(placemarkLayer);

// var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

// placemarkAttributes.imageOffset = new WorldWind.Offset(
//     WorldWind.OFFSET_FRACTION, 0.3,
//     WorldWind.OFFSET_FRACTION, 0.0);

// placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
//     WorldWind.OFFSET_FRACTION, 0.5,
//     WorldWind.OFFSET_FRACTION, 1.0);

// placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

// var position = new WorldWind.Position(65.0, -106.0, 100.0);
// var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

// placemark.label = "Placemark\n" +
//     "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
//     "Lon " + placemark.position.longitude.toPrecision(5).toString();
// placemark.alwaysOnTop = true;

// placemarkLayer.addRenderable(placemark);
var placemarkLayer = new WorldWind.RenderableLayer();
wwd.addLayer(placemarkLayer);

var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.5,
    WorldWind.OFFSET_FRACTION, 1.0);
placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

// async function getData(){
//     let url = 'http://api.open-notify.org/iss-now.json'
//     let data = await fetch(url)
//     let issData = await data.json()
//     console.log(issData)
//     // collodaLoader(issData.iss_position.latitude,issData.iss_position.longitude)


//     var position = new WorldWind.Position(issData.iss_position.latitude,issData.iss_position.longitude, 100.0);
//     var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

//     placemark.label = "Placemark\n" +
//         "Lat " + issData.iss_position.latitude + "\n" +
//         "Lon " + issData.iss_position.longitude;
//     placemark.alwaysOnTop = true;

//     placemarkLayer.addRenderable(placemark);

//     removeRenderedObj()
    
    
// }


// setInterval(() => {
//     getData()
// }, 500);

// Add a COLLADA model
// var modelLayer = new WorldWind.RenderableLayer();
// wwd.addLayer(modelLayer);

// var position = new WorldWind.Position(10.0, -125.0, 800000.0);
// var config = {dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'};

// var colladaLoader = new WorldWind.ColladaLoader(position, config);
// colladaLoader.load("duck.dae", function (colladaModel) {
//     colladaModel.scale = 9000;
//     modelLayer.addRenderable(colladaModel);
// });
const modelLayer = new WorldWind.RenderableLayer();
wwd.addLayer(modelLayer);
const config = {dirPath: './assets/' + 'capsule.dae'};
console.log(config)


function collodaLoader(latitude,longitude){
    const colladaLoader = new WorldWind.ColladaLoader(new WorldWind.Position(latitude, longitude, 8000.0), config);
    colladaLoader.load("", function (colladaModel) {
        colladaModel.scale = 50000;
        modelLayer.addRenderable(colladaModel);
    });
}

// getting the latitude and the longitude dashboard element
let latitudeShow  = document.getElementById('latitudeShow')
let longitudeShow  = document.getElementById('longitudeShow')
let speedShow  = document.getElementById('speedShow')



async function getData(){
    let url = 'http://api.open-notify.org/iss-now.json'
    let data = await fetch(url)
    let issData = await data.json()
    console.log(issData)
    // collodaLoader(issData.iss_position.latitude,issData.iss_position.longitude)
    latitudeShow.innerHTML=issData.iss_position.latitude
    longitudeShow.innerHTML=issData.iss_position.longitude

}



// Add WMS imagery
var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
var layerName = "MOD_LSTD_CLIM_M";

var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
    var wmsLayerCapabilities = wms.getNamedLayer(layerName);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
};

var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " +
        text +
    " exception: " + exception);
};

// $.get(serviceAddress).done(createLayer).fail(logError);
