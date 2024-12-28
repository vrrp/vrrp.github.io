//d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv", function(err, rows){
d3.csv("/assets/data/sstoi.indices.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

  const getcolor = (values) => values.map(val => val >=0 ? '#b04553':'blue');
  
  // create 1st plot
  var trace1 = {
    x: unpack(rows, 'DATE'),
    y: unpack(rows, 'ANOM'),
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'bar',
    marker: {color:getcolor(unpack(rows, 'ANOM'))},
    name: 'ANOM Niño 1+2'
  }
  // create 2nd plot
  var trace2 = {
    x: unpack(rows, 'DATE'),
    y: unpack(rows, 'ANOM.1'),
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'bar',
    marker: {color:getcolor(unpack(rows, 'ANOM.1'))},
    name: 'ANOM Niño 3'
  }

  // create 3rd plot
  var trace3 = {
    x: unpack(rows, 'DATE'),
    y: unpack(rows, 'ANOM.3'),
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'bar',
    marker: {color:getcolor(unpack(rows, 'ANOM.3'))},
    name: 'ANOM Niño 3+4'
  }

  var data = [trace1,trace2,trace3]
  
  // define subplot axes
  var axis = {
    showline: true,
    zeroline: false,
    showgrid: true,
    mirror:true,
    ticklen: 4,
    gridcolor: '#ffffff',
    tickfont: {size: 10},
  }

  var axis1 = {domain: [0., 1], anchor: 'y1', showticklabels: false}
  var axis2 = {domain: [0., 1], anchor: 'y2', showticklabels: false}
  var axis3 = {domain: [0., 1], anchor: 'y3'}

  var axis4 = {domain: [0.66, 0.98], anchor: 'x1', hoverformat: '.2f'}
  var axis5 = {domain: [0.34, 0.64], anchor: 'x2', hoverformat: '.2f'}
  var axis6 = {domain: [0.0, 0.32],  anchor: 'x3', hoverformat: '.2f'}
  
  //var axis5 = {domain: [0.34, 0.64], anchor: 'x2', tickprefix: '$', hoverformat: '.2f'}
  //var axis6 = {domain: [0.0, 0.32], anchor: 'x3', tickprefix: '\u20BF', hoverformat: '.2f'}

  // define layout
  var layout = {
    autosize: false,
    width: 350,
    height: 450,
    margin:{l:25, r:15, b:23, t: 100, pad:4},
    title: {text: "Climate Variability: Oceanic Niño Index (ONI)"},
    plot_bgcolor: 'rgba(228, 222, 249, 0.65)',
    showlegend: false,
    xaxis1: Object.assign(axis1, axis),
    xaxis2: Object.assign(axis2, axis),
    xaxis3: Object.assign(axis3, axis),

    yaxis1: Object.assign(axis4, axis),
    yaxis2: Object.assign(axis5, axis),
    yaxis3: Object.assign(axis6, axis)
  }

  Plotly.newPlot('plot_timeSeries_ensoIndex', data, layout);

});

