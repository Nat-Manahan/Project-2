console.log("READY FOR DUTY DIR")

var dropdown = d3.select("#resource-dd")

dropdown.on("change", onDDChange);

var dropdowntwo = d3.select("#fuel_type-dd")

dropdowntwo.on("change", onDDChange);

// d3.json("/api").then(data => {
//     console.log(data)
// })

function onDDChange() {
    var newValue = dropdown.property("value");
    var secondValue = dropdowntwo.property("value");
console.log (secondValue)
// (function() {
    var tableData = data;
    var table =d3.select("tbody");
    table.html("")
    tableData.filter(tableData=>tableData.Category===newValue && tableData.Fuel_Type===secondValue).forEach(function(state){
      var row = table.append("tr");
      Object.entries(state).forEach(function([key, value]){
          // console.log(key,value);
          var cell = table.append("td");
          cell.text(value);
      })
  });
    console.log(newValue)

    // d3.json(`/api/${newValue}`).then(newData => { 
    //     console.log(newData);
    // })
}

// let myChart1 = document.getElementById("myChart").getContext('2d');
// let chart1 = new Chart(myChart1, {
//     type:   'doughnut',
//     data:   {
//         labels: labels1,
//         datasets: [ {
//             data: 
//         }]
//     }
// })