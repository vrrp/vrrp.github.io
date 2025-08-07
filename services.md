---
title: Services
layout: page
---
<H1 align="left"><span style="font-family:Times New Roman;font-size:150%;color:darkmagenta"><b>Services</b></span> </H1>

<h2>Agriculture</h2>
<ul class="Agriculture">
	<li>Climatic studies of thermal suitability indices to identify areas and periods of time, where temperature conditions are optimal for crop development.</li>	
</ul>

<h2>Atmosphere</h2>
<ul class="Atmosphere">
	<li>Climatic studies of precipitation, air temperature, air quality, cloud cover and wind speed.</li>	
</ul>

<h2>Oceanography</h2>
<ul class="Oceanography">
	<li>Climatic studies of sea surface temperature, sea surface salinity, ocean surface currents and biogeochemical variables.</li>
</ul>  

<h2>Hydrology and glaciology</h2>
<ul class="Hydrology">
	<li>Climatic studies of river flow</li>
	<li>Climatic studies of snow depth and surface fluxes from snow melt (just for tropical glaciers).</li>
</ul>

<h2>Monitoring System</h2>
<!--p> La gestión de recursos hídricos es el proceso de planificar, desarrollar, distribuir y gestionar los recursos de agua
de manera eficiente y sostenible para satisfacer las necesidades de la sociedad, la economía y el medio ambiente

Objetivos
    1. Garantizar la disponibilidad de agua para el consumo humano, agricultura, industria y ecologia
    2. Proteger la calidad del agua y prevenir la contaminacion
    3. Promover el uso eficiente del agua y reducir sus péridad
    4. Mitigar los efectos del cambio climático y los desastres naturales
</p -->
Tracking the ocean part of El Niño-Southern Oscillation (ENSO) climate pattern,
<div class="graficas-container">
	<div id="map"></div>
	<div id="charts">
            <div id="time-range">
                <h3>Period of time</h3>
                <div class="slider-container">
                    <label>Start date: <span id="start-date">1982-01</span></label>
                    <input type="range" id="start-slider" min="0" max="522" value="0"> <!-- max="365"-->
                </div>
                <div class="slider-container">
                    <label>End date  : <span id="end-date">2025-07</span></label>
                    <input type="range" id="end-slider" min="0" max="522" value="522">
                </div>
            </div>
            <div class="chart-container">
                <!--h3>Gráfico de Barras</h3-->
                <canvas id="barChart"></canvas>
            </div>
        </div>
	<!--div align="center" id="tabla_ensoONI"></div-->
	<!--div align="center" id="plot_timeSeries_ensoIndex"></div-->
	<p> Data taken from <a href="https://www.cpc.ncep.noaa.gov/data/indices/" style="color:darkmagenta"> Climate Prediction Center - NOAA</a>, and dynamic visualization development by Sacha Analytics.</p>
	<p>To visualized our products in <a href="https://vrrp.github.io/login/" style="color:darkmagenta">Monitoring</a>, email us to suscribe.</p>
</div>
<!--script src="/static/js/script_mapaENSOv1.js"></script-->
<!--script src="/static/js/script_mapaENSOv2.js"></script-->
<script">
// URL del archivo CSV (cámbiala por la tuya)
 //------------------------------------------------------------------------
 const csvUrl = 'https://raw.githubusercontent.com/vrrp/vrrp.github.io/refs/heads/main/assets/data/sstoi.indices.csv'; // Reemplaza con una URL válida
 // Usar fetch para obtener el CSV
Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
        csvData = results.data;
        console.log("Datos importados:", csvData);
        // Aquí puedes usar csvData en tu aplicación
         // crear estructuras de datos
         let dates=[],anom12=[], anom3=[], anom34=[];   
         csvData.forEach(irow =>{
             dates.push(irow['DATE']);
             anom12.push(parseFloat(irow['ANOM']));
             anom3.push(parseFloat(irow['ANOM.1']));
             anom34.push(parseFloat(irow['ANOM.3']));
             });
        let n_elem = dates.length-2;
        console.log(n_elem);
        console.log(dates[0]);
        console.log(dates[n_elem]);
        
        // Colocar fondo imagen sacha en grafica de barras
         // 1. Cargar imagen PNG
         //------------------------------------------------------------------------
         const bgImage = new Image();
         bgImage.src = '{{ /assets/images/sacha_logo1.png | relative_url }}'; // Asegúrate que esté en la misma carpeta o usa URL
         
           // 2. Plugin para dibujar fondo
           const imageBackgroundPlugin = {
               id: 'custom_canvas_background_image',
                   beforeDraw: (chart) => {
                         if (bgImage.complete) {
                         	const ctx = chart.ctx;
                         	const {top, left, width, height} = chart.chartArea;
                         	ctx.save();
                         	ctx.globalAlpha = 0.25;
                         	ctx.drawImage(bgImage, left, top, width, height);
                         	ctx.restore();
                         } else {
                           bgImage.onload = () => chart.draw();
                           }
                          }
                         };

        // Inicializar el mapa
        const map = L.map('map').setView([-5, -120], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           // attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // limites geograficos de las regiones ENSO       
        var nino12 =[
        	[-10, -90], // Esquina inferior izquierda [latitud, longitud]
        	[0,-80]  // Esquina superior derecha   [latitud, longitud]
        		];
        
        var nino3 =[
        	[-5, -150], // Esquina inferior izquierda [latitud, longitud]
        	[5,-90]  // Esquina superior derecha   [latitud, longitud]
        		];
              
        var nino34 =[
        	[-5, -170], // Esquina inferior izquierda [latitud, longitud]
        	[5,-120]  // Esquina superior derecha   [latitud, longitud]
        		];
        
        var nino4 =[// 160E - 150W
        	[-5, -180], // Esquina inferior izquierda [latitud, longitud]
        	[5,-150]  // Esquina superior derecha   [latitud, longitud]
        	];

        // Datos ENSO
        //--------------------------------------------------------------
        const locations = [
            { varname: 'ONI (Nino 1+2)', nameRegion:"Nino 1+2", coords: [-5, -85], rnENSO:nino12, color: '#FF5733', data: anom12 },
            { varname: 'ONI (Nino 3)', nameRegion:"Nino 3", coords: [0, -115], rnENSO:nino3, color: '#f1ee23', data: anom3 },
            { varname: 'ONI (Nino 3+4)', nameRegion:"Nino 3+4", coords: [0, -145], rnENSO:nino34, color: '#2912CC', data: anom34 }
        ];
        
        let selectedLocation = locations[0];
        const markers = locations.map(loc => {
            return L.rectangle(loc.rnENSO,{
                fillColor: loc.color,
                color: loc.color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
                }).addTo(map)
                .bindPopup(loc.nameRegion)
                .on('click', () => {
                    selectedLocation = loc;
                    updateCharts();
                });
        });

        // Configurar fechas
        //--------------------------------------------------------------
        //const startDate = new Date('2025-01-01');
        // generar fechas diarias
        const startDate = new Date(dates[0]);
        const getDateFromDay = (day) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + day);
            return date.toISOString().split('T')[0];
        };

        // generar fechas mensuales
        const getDateFromMonth = (month) => {
            const date = new Date(startDate);
            date.setMonth(startDate.getMonth() + month);
            return date.toISOString().slice(0, 7);
          };

        // Sliders
        //--------------------------------------------------------------
        const startSlider = document.getElementById('start-slider');
        const endSlider = document.getElementById('end-slider');
        const startDateLabel = document.getElementById('start-date');
        const endDateLabel = document.getElementById('end-date');

        startSlider.addEventListener('input', () => {
            if (parseInt(startSlider.value) > parseInt(endSlider.value)) {
                startSlider.value = endSlider.value;
            }
            //startDateLabel.textContent = getDateFromDay(parseInt(startSlider.value));
            startDateLabel.textContent = getDateFromMonth(parseInt(startSlider.value));
            updateCharts();
        });

        endSlider.addEventListener('input', () => {
            if (parseInt(endSlider.value) < parseInt(startSlider.value)) {
                endSlider.value = startSlider.value;
            }
            //endDateLabel.textContent = getDateFromDay(parseInt(endSlider.value));
            endDateLabel.textContent = getDateFromMonth(parseInt(endSlider.value));
            updateCharts();
        });
        console.log(startSlider);

        // Configurar gráficos
        //--------------------------------------------------------------
        //const lineCtx = document.getElementById('lineChart').getContext('2d');
        const barCtx = document.getElementById('barChart').getContext('2d');
        /*
        const lineChart = new Chart(lineCtx, {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'Datos', data: [], borderColor: 'blue', fill: false }] },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });*/

        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: { labels: [], 
                    datasets: [{ 
                                label: 'Datos',
                                data: [], 
                                //backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                                backgroundColor: function(context) {
                                    var index = context.dataIndex;
                                    var value = context.dataset.data[index];
                                    return value < 0 ? 'blue' : 'red';
                                    },
                                //borderColor: 'rgba(75, 192, 192, 1)', 
                                borderColor: function(context) {
                                    var index = context.dataIndex;
                                    var value = context.dataset.data[index];
                                    return value < 0 ? 'blue' : 'red';
                                    },
                                borderWidth: 1 
                            }]
                  },
            options: { responsive: true, 
                       //scales: { y: { beginAtZero: true } } 
                       scales: {
                        y: {
                        min: -2, // Límite inferior del eje Y
                        max: 4   // Límite superior del eje Y
                        }}
                     },
            plugins: [imageBackgroundPlugin] 
        });

        // Actualizar gráficos
        //--------------------------------------------------------------
        function updateCharts() {
            const startDay = parseInt(startSlider.value);
            const endDay = parseInt(endSlider.value);
            const labels = [];
            for (let i = startDay; i <= endDay; i++) {
                //labels.push(getDateFromDay(i));
                labels.push(getDateFromMonth(i));
            }
            const data = selectedLocation.data.slice(startDay, endDay + 1);
            /*
            lineChart.data.labels = labels;
            lineChart.data.datasets[0].data = data;
            lineChart.data.datasets[0].label = selectedLocation.varname;
            lineChart.update();*/

            barChart.data.labels = labels;
            barChart.data.datasets[0].data = data;
            barChart.data.datasets[0].label = selectedLocation.varname;
            barChart.update();
        }

        // Inicializar gráficos
        //--------------------------------------------------------------
        updateCharts();
    },
    error: function(error) {
        console.error("Error al importar el CSV:", error);
    }
    });
</script>
<!--script src="/static/js/script_tablaENSO.js"></script-->
<!--script src="/static/js/plot_timeSeries_ensoIndex.js"></script-->





























    

