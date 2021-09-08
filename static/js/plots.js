console.log("READY FOR DUTY DIR")

var dropdown = d3.select("#resource-dd")

dropdown.on("change", onDDChange);

d3.json("/api").then(data => {
    console.log(data)
})

function onDDChange() {
    var newValue = dropdown.property("value");

    console.log(newValue)

    d3.json(`/api/${newValue}`).then(newData => { 
        console.log(newData);
    })
}