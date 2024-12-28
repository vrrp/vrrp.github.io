//d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv", function(err, rows){
d3.csv("/assets/data/sstoi.indices.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

  // header values
  var headerNames = d3.keys(rows[0]);
  var headerValues = [headerNames[0],headerNames[4],
                      headerNames[6],headerNames[8]];

  // cell values
  var cellValues = [];
  for (i = 0; i < headerValues.length; i++) {
    cellValue = unpack(rows, headerValues[i]);
    cellValues[i] = cellValue;
  }

  // clean date
  for (i = 0; i < cellValues[0].length; i++) {
  var dateValue = cellValues[0][i].split(' ')[0]
  cellValues[0][i] = dateValue
  }

  // create table
  var table = {
    type: 'table',
    columnwidth: [130,130,130,150],
    columnorder: [0,1,2,3],
    header: {
      values: headerValues,
      align: "center",
      line: {width: 1, color: 'rgb(50, 50, 50)'},
      fill: {color: ['rgb(235, 100, 230)']},
      font: {family: "Arial", size: 11, color: "white"}
    },
    cells: {
      values: cellValues,
      align: ["center", "center"],
      line: {color: "black", width: 1},
      fill: {color: ['rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)']},
      font: {family: "Arial", size: 10, color: ["black"]}
    },
    xaxis: 'x',
    yaxis: 'y',
    //domain: {x: [0,0.4], y: [0,1]}
    domain: {x: [0, 1.5], y: [0, 1]}
  }


  var data = [table]


  // define layout
  var layout = {
    title: {text: false},
    plot_bgcolor: 'rgba(228, 222, 249, 0.65)',
    showlegend: false,
  }

  Plotly.newPlot('plottable_timeSeries_ensoIndex', data, layout);

});

