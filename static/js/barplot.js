console.log("BAR CHART")
var barChart;
var dropdown = d3.select("#resource-dd")

dropdown.on("change", onDDChange);

var yeardropdown = d3.select("#year-dd")
yeardropdown.on("change", handleYearChange)
handleYearChange(true);

function handleYearChange(isInit=false){
    let userYear = yeardropdown.property("value");
    // print(userYear)

    
    d3.json(`/api/year/${userYear}`).then(yearData => {
        if (isInit == true){
            makeBarChart(yearData);
        }
        else {
            console.log("Updating")
            updateBarChart(yearData)
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

function makeBarChart(yearData){
    console.log(yearData.results);
    let myChart2 = document.getElementById("myChart2").getContext('2d');
    barChart = new Chart(myChart2, {
        type:   "bar",
        data:   {
            labels: yearData.results.map(d => d.year),
            datasets: [{
                data: yearData.results.map(d => d.energy_gen),
                backgroundColor: [
                    "#8601AF",
                ]
            }]
        },
        options: {
        }
    })
}

function updateBarChart(yearData){
    console.log(yearData.results)
    barChart.data.labels = yearData.results.map(d => d.year);
    barChart.data.datasets[0].data = yearData.results.map(d => parseInt(d.energy_gen));
    barChart.update();
}
