// (function() {
  var tableData = data;
  var table =d3.select("tbody");
  tableData.filter(tableData=>tableData.Year==="2019-20" && tableData.Area==="All").forEach(function(state){
    var row = table.append("tr");
    Object.entries(state).forEach(function([key, value]){
        // console.log(key,value);
        var cell = table.append("td");
        cell.text(value);
    })
});



  var map = L.map('map', {
    attributionControl: false
  });

  L.tileLayer('http://{s}.tile.stamen.com/{style}/{z}/{x}/{y}.png', { style: 'toner-background' }).addTo(map);
  
var All="Australia"
 

  $.getJSON("states.min.geojson", function(data) {

    var info = L.control();

    info.update = function (props) {
      this._div.innerHTML = (props ?  props['STATE_NAME']  : 'Australia');
      
      //  console.log(info._div.innerHTML)
    };

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    info.addTo(map);

    var geojson = L.geoJson(data, {
      style: function (feature) {
        return {
          color: '#3498db',
          weight: 2,
          fillOpacity: 0.5
        };
      },
      

      
      onEachFeature: function (feature, layer) {
     

      
        layer
        .on('click', function(e) {
          layer.setStyle({
            weight: 4,
            fillOpacity: 0.8
          });
          info.update(layer.feature.properties);
          table.html("");
          var stateName=info._div.innerHTML
          console.log(stateName)
          if (stateName === "Northern Territory"){
            stateNameshort="NT"
          } else if (stateName === "Victoria"){
            stateNameshort="VIC"
          } else if (stateName === "South Australia"){
            stateNameshort="SA"
          } else if (stateName === "Tasmania"){
            stateNameshort="TAS"
          } else if (stateName === "New South Wales"){
            stateNameshort="NSW"
          } else if (stateName === "Queensland"){
            stateNameshort="QLD"
          } else if (stateName === "Western Australia"){
            stateNameshort="WA"
          };
          
          tableData.filter(tableData=>tableData.Year==="2019-20" && tableData.Area===stateNameshort).forEach(function(state){
            var row = table.append("tr");
            Object.entries(state).forEach(function([key, value]){
                // console.log(key,value);
                var cell = table.append("td");
                cell.text(value);
            })
        });

        })
        
        .on('mouseout', function(e) {
          geojson.resetStyle(layer);
          info.update();
      
        })
      }
    })

    


    geojson.addTo(map);
    var bounds = geojson.getBounds();

    map.fitBounds(bounds);

    map.options.maxBounds = bounds;
    map.options.minZoom = map.getZoom();
  });

// })();