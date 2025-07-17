 // URL del archivo CSV (cámbiala por la tuya)
 //const csvUrl = 'https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv'; // Reemplaza con una URL válida
const csvUrl2 = 'https://raw.githubusercontent.com/vrrp/vrrp.github.io/refs/heads/main/assets/data/sstoi.indices.csv'; // Reemplaza con una URL válida

// Usar fetch para obtener el CSV
fetch(csvUrl2)
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
     //console.log(date);
     //console.log(anom34);
     
     // build data structure to table web
     let headerNames = ["Date", "ANOM 1+2", "ANOM 3", "ANOM 3+4"];
     let cellValues = [date, anom12, anom3, anom34]; 
     
     // create table
     var table = {
         type: 'table',
         columnwidth: [230,200,200,200],
         columnorder: [0,1,2,3],
         header: {
         	values: headerNames,
         	align: "center",
         	line: {width: 1, color: 'rgb(50, 50, 50)'},
         	fill: {color: ['rgb(235, 100, 230)']},
         	font: {family: "Arial", size: 11, color: "white"}
         	},
         cells: {
         	values: cellValues,
         	align: ["center", "center"],
         	line: {color: "black", width: 1},
         	fill: {color: ['rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)']},
         	font: {family: "Arial", size: 12, color: ["black"]}
         	},
         xaxis: 'x',
         yaxis: 'y',
         domain: {x: [0,0.4], y: [0,1]}
         };
         
     var data = [table];
     let layout = {
            title: "ONI",
            //xaxis: { title: 'Date' },
            xaxis: { title: false },
            yaxis: { title: false }
        };
        
     Plotly.newPlot('tabla_ensoONI', data, layout);
     
     
     });
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
