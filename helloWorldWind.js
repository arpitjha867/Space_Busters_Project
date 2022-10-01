// Create a WorldWindow for the canvas.
var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));


// Add a COLLADA model

const modelLayer = new WorldWind.RenderableLayer();
wwd.addLayer(modelLayer);
const config = {dirPath: './assets/' + 'capsule.dae'};
console.log(config)


function collodaLoader(latitude,longitude){
    const colladaLoader = new WorldWind.ColladaLoader(new WorldWind.Position(latitude, longitude, 80000.0), config);
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
    // console.log(issData)
    collodaLoader(issData.iss_position.latitude,issData.iss_position.longitude)
    latitudeShow.innerHTML=issData.iss_position.latitude
    longitudeShow.innerHTML=issData.iss_position.longitude

}
setInterval(() => {
    getData()
}, 500);



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


// getting the astronaut data



async function getAstroData(){

    let astonautDataAPI = "http://api.open-notify.org/astros.json"
    let astroData= await fetch(astonautDataAPI)
    let finalData = await astroData.json()
    let astronautFinalData = finalData.people
    let peopleInSpace = document.getElementById('peopleInSpace')
    astronautFinalData.forEach((element)=>{
        peopleInSpace.innerHTML+=`<div class=" text-white "><span class="badge bg-secondary fs-4 mt-2">${element.name}</span></div>`
    })
}

getAstroData();
