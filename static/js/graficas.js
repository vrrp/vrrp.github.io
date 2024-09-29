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

        // Crear el gráfico de barras
        let categorias = {};
        parsedData.forEach(row => {
            let categoria = row['Categoría'];
            if (categorias[categoria]) {
                categorias[categoria] += 1;
            } else {
                categorias[categoria] = 1;
            }
        });

        let categoriasNombres = Object.keys(categorias);
        let categoriasValores = Object.values(categorias);

        let trace2 = {
            x: categoriasNombres,
            y: categoriasValores,
            type: 'bar',
            name: 'Gráfico de Barras'
        };

        let layout2 = {
            title: 'Gráfico de Barras por Categoría',
            xaxis: { title: 'Categoría' },
            yaxis: { title: 'Cantidad' }
        };

        Plotly.newPlot('graficoBarras', [trace2], layout2);
    });
});

