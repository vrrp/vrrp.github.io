document.addEventListener('DOMContentLoaded', function() {
    // Leer el archivo CSV
    fetch('/assets/data/datos.csv')
    .then(response => response.text())
    .then(data => {
        // Parsear el CSV
        let parsedData = Papa.parse(data, { header: true }).data;

        // Crear las series temporales
        let fechas = [];
        let valores = [];
        parsedData.forEach(row => {
            fechas.push(row['Fecha']);
            valores.push(parseFloat(row['Valor']));
        });

        // Graficar la serie temporal
        let trace1 = {
            x: fechas,
            y: valores,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Serie Temporal'
        };

        let layout1 = {
            title: 'GMP',
            xaxis: { title: 'Dates' },
            yaxis: { title: 'PRCP (mm/min)' }
        };

        Plotly.newPlot('graficoTemporal', [trace1], layout1);
    });
});

