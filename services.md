---
title: Services
layout: page
---
<br>

<!--container superior: indicador, año y filtrar por region-->
<div class="dashboard-container">
       <header>
            <h1>Monitoreo: Energía Electrica</h1>
       </header>
        
       <div class="dashboard-controls">
            <div class="control-group">
                <label for="indicador">Indicador</label>
                <select id="indicador">
                    <option value="pobreza">Producción total percapita</option>
                    <option value="educacion">Consumo total percapita</option>
                    <option value="salud">Acceso a Salud</option>
                    <option value="economia">Actividad Económica</option>
                    <option value="clima">Datos Climáticos</option>
                </select>
            </div>
            
            <div class="control-group">
                <label for="anio">Año</label>
                <select id="anio">
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
            </div>
            
            <div class="control-group">
                <label for="region">Filtrar por Región</label>
                <select id="region">
                    <option value="todas">Todas las regiones</option>
                    <option value="SA">Sudamerica</option>
                    <option value="costa">Costa</option>
                    <option value="sierra">Sierra</option>
                    <option value="selva">Selva</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>&nbsp;</label>
                <button id="aplicarFiltros">Aplicar Filtros</button>
            </div>
       </div>
       
       <!--container grid 3 celdas - medio: mapa, cuva y barras-->
       <div class="dashboard-content">
       		<div class="map-container" id="mapa-peru"></div>	
       		<div class="chart-container" id="grafico-tendencia"></div>
       		<div class="chart-container" id="grafico-comparativo"></div>
 </div>
 <script src="/static/js/script_energiaElectrica.js"></script>


























    

