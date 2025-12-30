// URL del archivo CSV (cámbiala por la tuya)
 //------------------------------------------------------------------------
 const csvUrl = 'https://raw.githubusercontent.com/vrrp/vrrp.github.io/refs/heads/main/assets/data/energia_electrica.csv'; // Reemplaza con una URL válida
 // Usar fetch para obtener el CSV
Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
        csvData = results.data;
        console.log("Datos importados:", csvData);
        // Aquí puedes usar csvData en tu aplicación
         // crear estructuras de datos
         let dates=[], peru=[], colombia=[], brasil=[];   
         csvData.forEach(irow =>{
             dates.push(irow['Year']);
             peru.push(parseFloat(irow['Peru_Generation_kwh']));
             colombia.push(parseFloat(irow['Colombia_Generation_kwh']));
             brasil.push(parseFloat(irow['Brazil_Generation_kwh']));
             });
        let n_elem = dates.length-2;
        //console.log(n_elem);
        //console.log(dates[0]);
        //console.log(dates[n_elem]);
        
        // extraer valores min/mx de la data para extablecer inf y sup del eje y
        const minData = Math.min(...peru);
        const maxData = Math.max(...peru);
        //console.log(minData[0]);

        
        // Inicializar el mapa
        const map = L.map('map').setView([-5, -90], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           // attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const locations = [
            { varname: 'ONI (Nino 1+2)', nameRegion:"Peru - Total per capita (kwh)", coords: [-12.042148, -77.043740], color: '#FF5733', data: peru },
            { varname: 'ONI (Nino 3)', nameRegion:"Brasil - Total per capita (kwh)", coords: [-14.042148, -46.043740], color: '#f1ee23', data: brasil },
            { varname: 'ONI (Nino 3+4)', nameRegion:"Colombia - Total per capita (kwh)", coords: [4.042148, -74.343740], color: '#2912CC', data: colombia }
        ];
        
        let selectedLocation = locations[0];
        const markers = locations.map(loc => {
            return L.circleMarker(loc.coords,{
            	radius:8,
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
          
         // generar fechas anuales
         const startYear = dates[0];
         const endYear = dates[n_elem];
         const annualDates = [];
         
         for (let year = startYear; year <= endYear; year++) {
             annualDates.push(year.toString());
             }
         console.log(annualDates);

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
            //startDateLabel.textContent = getDateFromMonth(parseInt(startSlider.value));
            startDateLabel.textContent = annualDates;
            updateCharts();
        });

        endSlider.addEventListener('input', () => {
            if (parseInt(endSlider.value) < parseInt(startSlider.value)) {
                endSlider.value = startSlider.value;
            }
            //endDateLabel.textContent = getDateFromDay(parseInt(endSlider.value));
            //endDateLabel.textContent = getDateFromMonth(parseInt(endSlider.value));
            endDateLabel.textContent = annualDates;
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
                                    return value < 0 ? 'black' : 'blue';
                                    },
                                borderWidth: 1 
                            }]
                  },
            options: { responsive: true, 
                       //scales: { y: { beginAtZero: true } } 
                       scales: {
                        y: {
                        min: 0, // Límite inferior del eje Y
                        max: 3600   // Límite superior del eje Y
                        }}
                     },
            //plugins: [imageBackgroundPlugin] 
        });

          // Actualizar gráficos
        //--------------------------------------------------------------
        function updateCharts() {
            const startDay = parseInt(startSlider.value);
            const endDay = parseInt(endSlider.value);
            
            const labels = [];
            
            for (let i = 0; i <= n_elem; i++) {
               labels.push(annualDates[i]);
            }

            
            const data = selectedLocation.data.slice(startDay, endDay + 1);
            console.log(labels);
            /*
            lineChart.data.labels = labels;
            lineChart.data.datasets[0].data = data;
            lineChart.data.datasets[0].label = selectedLocation.varname;
            lineChart.update();*/

            barChart.data.labels = labels;
            barChart.data.datasets[0].data = data;
            barChart.data.datasets[0].label = selectedLocation.nameRegion;
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
