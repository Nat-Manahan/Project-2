console.log("DOUGHNUT CHART")
var doughnutChart;
var dropdown = d3.select("#resource-dd")

dropdown.on("change", onDDChange);

var fueldropdown = d3.select("#fuel_type-dd")
fueldropdown.on("change", handleFuelChange)
handleFuelChange(true);

function handleFuelChange(isInit=false){
    let userFuel = fueldropdown.property("value");
    
    d3.json(`/api/fuel/${userFuel}`).then(fuelData => {
        if (isInit == true){
            makeDoughnut(fuelData);
        }
        else {
            console.log("Updating")
            updateDoughnut(fuelData)
        }
    })

}

function onDDChange() {
    var newValue = dropdown.property("value");

    console.log(newValue)

    d3.json(`/api/${newValue}`).then(newData => { 
        console.log(newData);
    })
}

function makeDoughnut(fuelData){
    console.log(fuelData.results);
    let myChart1 = document.getElementById("myChart1").getContext('2d');
    doughnutChart = new Chart(myChart1, {
        type:   'doughnut',
        data:   {
            labels: fuelData.results.map(d => d.fuel_type),
            datasets: [ {
                data: fuelData.results.map(d => d.energy_gen),
                backgroundColor: [
                    "#C21460",
                    "#FE2712",
                    "#FC600A",

                    "#FB9902",
                    "#FCCB1A",
                    "#FEFE33",

                    "#B2D732",
                    "#66B032",
                    "#347B98",

                    "#0247FE",
                    "#8601AF",
                ]
            }]
        },
        options: {}
    })
}

function updateDoughnut(fuelData){
    console.log(fuelData.results)
    doughnutChart.data.labels = fuelData.results.map(d => d.fuel_type);
    doughnutChart.data.datasets[0].data = fuelData.results.map(d => parseInt(d.energy_gen));
    doughnutChart.update();
}
