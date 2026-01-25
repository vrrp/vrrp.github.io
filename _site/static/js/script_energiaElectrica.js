 // Datos de ejemplo para el dashboard
 //----------------------------------------------------------------------------------------------------
        const places = [
            /*{ id: "AMA", nombre: "Amazonas", region: "selva", lat: -5.7007, lon: -77.8609 },
            { id: "ANC", nombre: "Áncash", region: "sierra", lat: -9.5277, lon: -77.8278 },
            { id: "APU", nombre: "Apurímac", region: "sierra", lat: -14.0422, lon: -73.0779 },
            { id: "ARE", nombre: "Arequipa", region: "sierra", lat: -16.3988, lon: -71.5369 },
            { id: "AYA", nombre: "Ayacucho", region: "sierra", lat: -13.1588, lon: -74.2232 },
            { id: "CAJ", nombre: "Cajamarca", region: "sierra", lat: -7.1637, lon: -78.5128 },
            { id: "CUS", nombre: "Cusco", region: "sierra", lat: -13.5226, lon: -71.9673 },
            { id: "HUV", nombre: "Huancavelica", region: "sierra", lat: -12.7613, lon: -74.9773 },
            { id: "HUC", nombre: "Huánuco", region: "sierra", lat: -9.9306, lon: -76.2422 },
            { id: "ICA", nombre: "Ica", region: "costa", lat: -14.0678, lon: -75.7286 },
            { id: "JUN", nombre: "Junín", region: "sierra", lat: -12.0651, lon: -75.2048 },
            { id: "LAL", nombre: "La Libertad", region: "costa", lat: -8.1159, lon: -79.0287 },
            { id: "LAM", nombre: "Lambayeque", region: "costa", lat: -6.7011, lon: -79.9068 },
            { id: "LIM", nombre: "Lima", region: "costa", lat: -12.0464, lon: -77.0428 },
            { id: "LOR", nombre: "Loreto", region: "selva", lat: -3.7491, lon: -73.2538 },
            { id: "MDD", nombre: "Madre de Dios", region: "selva", lat: -12.5933, lon: -69.1892 },
            { id: "MOQ", nombre: "Moquegua", region: "costa", lat: -17.1983, lon: -70.9356 },
            { id: "PAS", nombre: "Pasco", region: "sierra", lat: -10.6674, lon: -76.2566 },
            { id: "PIU", nombre: "Piura", region: "costa", lat: -5.1979, lon: -80.6282 },*/
            { id: "PUN", nombre: "Puno", region: "sierra", lat: -15.8422, lon: -70.0199 },
            { id: "SAM", nombre: "San Martín", region: "selva", lat: -6.0329, lon: -76.9714 },
            { id: "TAC", nombre: "Tacna", region: "costa", lat: -18.0146, lon: -70.2536 },
            { id: "TUM", nombre: "Tumbes", region: "costa", lat: -3.5669, lon: -80.4515 },
            { id: "UCA", nombre: "Ucayali", region: "selva", lat: -8.3791, lon: -74.5539 },
            { id: "CAL", nombre: "Callao", region: "costa", lat: -12.0565, lon: -77.1181 },
            { id: "PER", nombre: "Peru", region: "SA", lat: -11.042148, lon: -75.043740 },
            { id: "BRA", nombre: "Brasil", region: "SA", lat: -14.042148, lon: -46.043740 },
            { id: "COL", nombre: "Colombia", region: "SA", lat: 4.042148, lon: -74.343740}
        ];

        // Datos simulados para cada place
        function generarDatosSimulados() {
            const indicadores = {
                pobreza: { nombre: "Producción total percapita", unidad: "kwh" },
                educacion: { nombre: "Consumo total percapita", unidad: "kwh" },
                salud: { nombre: "Acceso a Salud", unidad: "% de cobertura" },
                economia: { nombre: "Actividad Económica", unidad: "PBI regional (MM S/)" },
                clima: { nombre: "Precipitación", unidad: "mm/year" }
            };
            
            const years = ["2019", "2020", "2021", "2022", "2023"];
            const datos = {};
            
            Object.keys(indicadores).forEach(indicador => {
                datos[indicador] = {};
                places.forEach(dep => {
                    datos[indicador][dep.id] = {};
                    let baseValue = Math.random() * 100;
                    
                    // Para cada year, generamos un valor con cierta tendencia
                    years.forEach((year, i) => {
                        // Añadimos variación con tendencia de mejora o empeoramiento
                        const tendencia = (Math.random() - 0.3) * 10;
                        baseValue = Math.max(0, Math.min(100, baseValue + tendencia));
                        datos[indicador][dep.id][year] = parseFloat(baseValue.toFixed(1));
                    });
                });
            });
            
            return { datos, indicadores };
        }

        const { datos, indicadores } = generarDatosSimulados();

        // Funciones para dibujar el mapa y los gráficos
       //----------------------------------------------------------------------------------------------------
        function dibujarMapa(indicador, year) {
            const datosDeIndicador = datos[indicador];
            const valoresMapa = [];
            
            places.forEach(dep => {
                valoresMapa.push(datosDeIndicador[dep.id][year]);
            });
            
            // Extraer colores según valores (choropleth)
            const maxValor = Math.max(...valoresMapa);
            const minValor = Math.min(...valoresMapa);
            
            // Preparar datos para el mapa
            const datosMapa = {
                type: 'scattergeo',
                lon: places.map(d => d.lon),
                lat: places.map(d => d.lat),
                text: places.map(d => d.nombre),
                hovertemplate: places.map(d => 
                    `<b>${d.nombre}</b><br>` +
                    `${indicadores[indicador].nombre}: ${datosDeIndicador[d.id][year]} ${indicadores[indicador].unidad}`
                ),
                marker: {
                    size: 12,
                    color: valoresMapa,
                    colorscale: 'YlOrRd',
                    //reversescale: indicador === 'pobreza', // Invertir escala solo para pobreza
                    reversescale: true, // Invertir escala para todas las variables
                    colorbar: {
                        title: indicadores[indicador].unidad,
                        thickness: 15,
                        orientation:'v',
                        len: 0.5,
                        y: 0.5,
                        yanchor: 'middle'
                    },
                    line: {
                        color: 'black',
                        width: 0.5
                    }
                }
            };
            
            const layout = {
                geo: {
                    scope: 'world', // opcions: usa, europe, asia, africa, north america, south america
                    showland: true,
                    landcolor: 'rgb(243, 243, 243)',
                    countrycolor: 'rgb(204, 204, 204)',
                    showocean: true,
                    oceancolor: 'rgb(230, 245, 255)',
                    showlakes: true,
                    lakecolor: 'rgb(230, 245, 255)',
                    showrivers: true,
                    rivercolor: 'rgb(230, 245, 255)',
                    resolution: 50,
                    lonaxis: {
                        range: [-86, -28] // Centrar mapa
                    },
                    lataxis: {
                        range: [-58, 15] // Centrar mapa
                    }
                },
                margin: {
                    l: 0,
                    r: 0,
                    t: 0,
                    b: 0
                },
                autosize: true
            };
            
            const config = {
                responsive: true,
                displayModeBar: true,
                modeBarButtonsToRemove: ['zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleHover']
            };
            
            Plotly.newPlot('mapa-peru', [datosMapa], layout, config);
            
            // Evento click para actualizar gráficos detallados
            document.getElementById('mapa-peru').on('plotly_click', function(data) {
                const punto = data.points[0];
                const indice = punto.pointIndex;
                const depId = places[indice].id;
                
                dibujarGraficoTendencia(depId, indicador);
                dibujarGraficoComparativo(depId, indicador, year);
            });
        }
        
        function dibujarGraficoTendencia(depId, indicador) {
            const years = ["2019", "2020", "2021", "2022", "2023"];
            const place = places.find(d => d.id === depId);
            const datosIndicador = datos[indicador][depId];
            
            const datosTendencia = {
                type: 'scatter',
                x: years,
                y: years.map(year => datosIndicador[year]),
                mode: 'lines+markers',
                line: {
                    shape: 'spline',
                    color: '#00796b',
                    width: 3
                },
                marker: {
                    size: 8,
                    color: '#00796b'
                },
                name: place.nombre
            };
            
            const layout = {
                title: {
                    text: `Tendencia de ${indicadores[indicador].nombre} en ${place.nombre}`,
                    font: {
                        size: 14
                    }
                },
                xaxis: {
                    title: 'Años'
                },
                yaxis: {
                    title: indicadores[indicador].unidad
                },
                margin: {
                    l: 60,
                    r: 30,
                    t: 50,
                    b: 50
                }
            };
            
            const config = {
                responsive: true,
                displayModeBar: false
            };
            
            Plotly.newPlot('grafico-tendencia', [datosTendencia], layout, config);
        }
        
        function dibujarGraficoComparativo(depId, indicador, year) {
            // Obtener places de la misma región para comparar
            const placeseleccionado = places.find(d => d.id === depId);
            const placesRegion = places.filter(d => 
                d.region === placeseleccionado.region
            ).slice(0, 6); // Limitar a 6 para legibilidad
            
            const datosComparativos = {
                type: 'bar',
                x: placesRegion.map(d => d.nombre),
                y: placesRegion.map(d => datos[indicador][d.id][year]),
                marker: {
                    color: placesRegion.map(d => 
                        d.id === depId ? '#00796b' : '#80cbc4'
                    )
                }
            };
            
            const layout = {
                title: {
                    text: `Comparación regional - ${indicadores[indicador].nombre} (${year})`,
                    font: {
                        size: 14
                    }
                },
                xaxis: {
                    title: false//'places'
                },
                yaxis: {
                    title: indicadores[indicador].unidad
                },
                margin: {
                    l: 60,
                    r: 30,
                    t: 50,
                    b: 80
                }
            };
            
            const config = {
                responsive: true,
                displayModeBar: false
            };
            
            Plotly.newPlot('grafico-comparativo', [datosComparativos], layout, config);
        }
        
        // Inicializar dashboard
       //----------------------------------------------------------------------------------------------------
        function inicializarDashboard() {
            const indicador = document.getElementById('indicador').value;
            const year = document.getElementById('anio').value;
            
            dibujarMapa(indicador, year);
            dibujarGraficoTendencia("PER", indicador); // Iniciamos con Lima
            dibujarGraficoComparativo("PER", indicador, year);
            
            // Evento para actualizar el dashboard cuando cambian los filtros
            document.getElementById('aplicarFiltros').addEventListener('click', function() {
                const indicador = document.getElementById('indicador').value;
                const year = document.getElementById('anio').value;
                const region = document.getElementById('region').value;
                
                dibujarMapa(indicador, year);
                
                // Si hay filtro por región, mostrar el primer place de esa región
                if (region !== 'todas') {
                    const depsFiltrados = places.filter(d => d.region === region);
                    if (depsFiltrados.length > 0) {
                        const depId = depsFiltrados[0].id;
                        dibujarGraficoTendencia(depId, indicador);
                        dibujarGraficoComparativo(depId, indicador, year);
                    }
                }
            });
            
            // Actualizar los gráficos cuando cambia el indicador o year
            //----------------------------------------------------------------------------------------------------
            document.getElementById('indicador').addEventListener('change', function() {
                const indicador = this.value;
                const year = document.getElementById('anio').value;
                const elementoMapa = document.getElementById('mapa-peru');
                
                if (elementoMapa.data && elementoMapa.data[0].lat) {
                    const indice = 0; // Usar Lima como default
                    const depId = places[indice].id;
                    
                    dibujarGraficoTendencia(depId, indicador);
                    dibujarGraficoComparativo(depId, indicador, year);
                }
            });
            
            document.getElementById('anio').addEventListener('change', function() {
                const year = this.value;
                const indicador = document.getElementById('indicador').value;
                const elementoMapa = document.getElementById('mapa-peru');
                
                if (elementoMapa.data && elementoMapa.data[0].lat) {
                    const indice = 0; // Usar Lima como default
                    const depId = places[indice].id;
                    
                    dibujarGraficoComparativo(depId, indicador, year);
                }
            });
        }
        
        // Iniciar cuando el documento esté listo
       //----------------------------------------------------------------------------------------------------
        document.addEventListener('DOMContentLoaded', inicializarDashboard);
        
        // Hacer el dashboard responsive
        //----------------------------------------------------------------------------------------------------
        window.addEventListener('resize', function() {
            Plotly.Plots.resize('mapa-peru');
            Plotly.Plots.resize('grafico-tendencia');
            Plotly.Plots.resize('grafico-comparativo');
        });
