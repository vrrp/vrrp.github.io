// Datos de los países de Sudamérica con datos en el CSV
//----------------------------------------------------------------------------------------------------
        const places = [
            { id: "PER", nombre: "Peru",     region: "SA", lat: -11.042148, lon: -75.043740 },
            { id: "BRA", nombre: "Brasil",   region: "SA", lat: -14.042148, lon: -46.043740 },
            { id: "COL", nombre: "Colombia", region: "SA", lat:   4.042148, lon: -74.343740 }
        ];

        // Variables globales que se llenarán con los datos del CSV
        let datos = {};
        let indicadores = {};

        // Parsea el texto de un CSV en un array de objetos
        function parseCSV(text) {
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            return lines.slice(1).map(line => {
                const values = line.split(',');
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i] ? values[i].trim() : '';
                });
                return obj;
            }).filter(row => row.Year !== '');
        }

        // Carga y procesa el CSV para construir datos e indicadores
        async function cargarDatosCSV() {
            const response = await fetch('/assets/data/energia_electrica.csv');
            const text = await response.text();
            const rows = parseCSV(text);

            indicadores = {
                generacion: { nombre: "Generación Eléctrica per cápita", unidad: "kwh" }
            };

            datos = { generacion: { PER: {}, BRA: {}, COL: {} } };

            rows.forEach(row => {
                const year = row.Year;
                datos.generacion.PER[year] = parseFloat(row.Peru_Generation_kwh);
                datos.generacion.BRA[year] = parseFloat(row.Brazil_Generation_kwh);
                datos.generacion.COL[year] = parseFloat(row.Colombia_Generation_kwh);
            });

            // Poblar el selector de año dinámicamente con los años del CSV (desc)
            const years = rows.map(r => r.Year).sort((a, b) => b - a);
            const anioSelect = document.getElementById('anio');
            anioSelect.innerHTML = years
                .map(y => `<option value="${y}">${y}</option>`)
                .join('');
        }

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
                    //`${indicadores[indicador].nombre}: ${datosDeIndicador[d.id][year]} ${indicadores[indicador].unidad}`
                    ` ${datosDeIndicador[d.id][year]} ${indicadores[indicador].unidad}`
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
            const years = Object.keys(datos[indicador][depId]).sort();
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
        async function inicializarDashboard() {
            await cargarDatosCSV();

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
