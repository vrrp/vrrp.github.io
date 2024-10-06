document.addEventListener('DOMContentLoaded', function() {
    // Leer el archivo CSV
    fetch('/assets/data/gpm_prcp_south01.csv')
    .then(response => response.text())
    .then(data => {
        // Parsear el CSV
        let parsedData = Papa.parse(data, { header: true }).data;

        // Crear las series temporales
        let fechas = [];
        let north01_data = [];
        let south01_data = [];
        parsedData.forEach(row => {
            fechas.push(row['date']);
            north01_data.push(parseFloat(row['north01']));
            south01_data.push(parseFloat(row['south01']));
        });

        // Graficar la serie temporal
        // ---------------------------
        let north01_tracer = {
            x: fechas,
            y: north01_data,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'North',
            marker: {
              color: 'rgb(214, 12, 140)',
              size : 8
            },
            line: {
              color: 'rgb(214, 12, 140)',
              width: 1
            }
        };
        let south01_tracer = {
            x: fechas,
            y: south01_data,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'South',
            marker: {
              color: 'rgb(0, 128, 128)',
              size : 8
            },
            line: {
              color: 'rgb(0, 128, 128)',
              width: 1
            }
        };

        var data = [north01_tracer, south01_tracer];

        let layout = {
            title: 'The Global Precipitation Measurement',
            //xaxis: { title: 'Date' },
            xaxis: { title: false },
            yaxis: { title: 'Prcp (mm/30min)' }
        };
        // Graficar diagrama de cajas
        // ---------------------------
        var box_north = {
          y:north01_data,
          type: 'box',
          name: 'North',
          marker: {
            color: 'rgb(214, 12, 140)',
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 0.6)',
              outlierwidth: 2
            }
          },
        boxpoints: 'suspectedoutliers'
        };
        var box_south = {
          y:south01_data,
          type: 'box',
          name: 'South',
          marker: {
            color: 'rgb(0, 128, 128)',
            outliercolor: 'rgba(0, 128, 128, 0.6)',
            //outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(0, 128, 128, 1.0)',
              outlierwidth: 2
            }
          },
        boxpoints: 'suspectedoutliers'
        };
        var box_data = [box_north, box_south];
        var layout_box = {
          //title: 'Box Plot Styling Outliers'
          title: false
        };

        // Graficar 
        // ---------------------------
        Plotly.newPlot('graficoTemporal_gpm_prcp', data, layout);
        Plotly.newPlot('graficoBoxplot_gpm_prcp', box_data,layout_box);
    });
});

