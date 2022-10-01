
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


<iframe width="1520" height="585" src="https://www.youtube.com/embed/86YLFOog4GM" title="🌎 Nasa Live Stream  - Earth From Space :  Live Views from the ISS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>