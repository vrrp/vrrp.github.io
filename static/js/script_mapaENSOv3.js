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
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('barChart');
  const imgSrc = canvas.dataset.img;

  const image = new Image();
  image.src = imgSrc;

  image.onload = function () {
    const ctx = canvas.getContext('2d');

    const backgroundImagePlugin = {
      id: 'customBackgroundImage',
      beforeDatasetsDraw(chart) {
        const { ctx, chartArea } = chart;
        const { left, top, width, height } = chartArea;

        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.restore();
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
      });
    error: function(error) {
        console.error("Error al importar el CSV:", error);
    }
    });
    
    
    
    
    
    
    
    
    
    
