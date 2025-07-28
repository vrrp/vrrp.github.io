 // URL del archivo CSV (cámbiala por la tuya)
 //------------------------------------------------------------------------
 const csvUrl = 'https://raw.githubusercontent.com/vrrp/vrrp.github.io/refs/heads/main/assets/data/sstoi.indices.csv'; // Reemplaza con una URL válida
 // Usar fetch para obtener el CSV
fetch(csvUrl)
     .then(response => response.text())
     .then(data => {
     
     // Usar Papa Parse para analizar el archivo CSV
     //------------------------------------------------------------------------
     Papa.parse(data, {
     	header: true, // definir primera fila como header
     	complete: function(results){
     		const tableHeader = document.getElementById('tableHeader');
     		const tableBody = document.getElementById('tableBody');
     		
     		// Crear encabezado de la tabla
     		const headers = Object.keys(results.data[0]);
     		//console.log(headers);
     		
     		const headerRow = document.createElement('tr');
     		//console.log(headerRow);
     		headers.forEach(ihead => {
     			const th = document.createElement('th');
     			th.textContent = ihead;
     			headerRow.appendChild(th)  
     			});
     		//tableHeader.appendChild(headerRow);
     		//console.log(tableHeader);
     	},
     });
     
     // Parsear el CSV
     //------------------------------------------------------------------------
     let parsedData = Papa.parse(data, { header: true }).data;
     
     // crear estructuras de datos
     let date = [];
     let anom12=[];
     let anom3 =[];
     let anom34=[];     
     
     parsedData.forEach(irow =>{
     	date.push(irow['DATE']);
     	anom12.push(parseFloat(irow['ANOM']));
     	anom3.push(parseFloat(irow['ANOM.1']));
     	anom34.push(parseFloat(irow['ANOM.3']));
});


// Inicializar el mapa
//------------------------------------------------------------------------
        const map = L.map('map').setView([-5, -130], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
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

        // Datos de ejemplo
        const regiones = [
            {id: 1, nombre: "RN 1+2", coords: [-5, -85], rnENSO:nino12,color: '#ff7800', datos: anom12},
            {id: 2, nombre: "RN 3", coords: [0, -115], rnENSO:nino3, color:'#f1ee23', datos: anom3},
            {id: 3, nombre: "RN 3+4", coords: [0, -145], rnENSO:nino34, color:'#FF5733', datos: anom34}
        ];

        const meses = date;//["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
        console.log(meses);

        // Crear marcadores
        const markers = {};
        regiones.forEach(region => {
            const marker = L.rectangle(region.rnENSO, {
                /*radius: 12,*/
                fillColor: region.color,
                color: region.color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            }).addTo(map);
            
            marker.bindPopup(`<b>${region.nombre}</b>`);
            marker.on('click', () => actualizarGraficos(region.id));
            markers[region.id] = marker;
        });
        
        // Inicializar gráficos
        const barCtx = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Datos por mes',
                    data: [],
                    /*backgroundColor: 'rgba(54, 162, 235, 0.5)'*/
                    backgroundColor: function(context) {
                    	var index = context.dataIndex;
                    	var value = context.dataset.data[index];
                    	return value < 0 ? 'blue' : 'red';
                    	},
                    borderColor: function(context) {
                    	var index = context.dataIndex;
                    	var value = context.dataset.data[index];
                    	return value < 0 ? 'blue' : 'red';
                    	},
                    borderWidth: 1                    
                }],
            },
            /*
            options: {
            	scales: {
            		x: {
            		   type: 'time',
            		   time: {
            		   	parser: 'YYYY/MM/DD', // Asegúrate de que coincida con el formato de tus etiquetas
            		   	unit: 'year',
            		   	displayFormats: {
            		   	year: 'YYYY',
            		   	}},
            		   ticks: {
            		   	callback: function(value, index, ticks) {
            		   	return  value; // Muestra solo el año
            		   	}}
            		},
            		y: {
            		    beginAtZero: true,
            		    },
            		},
    	    },*/
    	    options: {
    	    	scales: {
    	    		y: {
    	    		min: -2, // Límite inferior del eje Y
    	    		max: 4   // Límite superior del eje Y
    	    		}}
    	    	}
        });

        // Función para actualizar gráficos cuando se selecciona una región
        function actualizarGraficos(regionId) {
            const region = regiones.find(r => r.id === regionId);
            
            // Resaltar marcador seleccionado
            Object.values(markers).forEach(m => {
                m.setStyle({fillColor: "#f7f7d1"});
            });
            markers[regionId].setStyle({fillColor: "#ff0000"});
            
            // Actualizar datos en gráficos        
            barChart.data.datasets[0].label = `${region.nombre} - ONI `;
            barChart.data.datasets[0].data = region.datos;
            barChart.update();
        }

        // Inicializar con la primera región
        actualizarGraficos(1);
        
});        

