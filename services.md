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
                    <option value="generacion">Generación Eléctrica per cápita</option>
                </select>
            </div>
            
            <div class="control-group">
                <label for="anio">Año</label>
                <select id="anio">
                    <!-- Las opciones se generan dinámicamente desde script_energiaElectrica.js -->
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


























    

