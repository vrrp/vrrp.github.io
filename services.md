---
title: Services
layout: page
---
<H1 align="left"><span style="font-family:Times New Roman;font-size:150%;color:darkmagenta"><b>Monitoreo Energía Electrica</b></span> </H1>

<div class="graficas-container">
	<div id="map"></div>
	
	
	<div id="charts">
            <div id="time-range">
                <!--h3>Rango de tiempo:</h3-->
                
                <div class="slider-container">
                    <label>Inicio: <span id="start-date">1985</span></label>
                    <input type="range" id="start-slider" min="0" max="40" value="0"> 
                </div>
                <div class="slider-container">
                    <label>Fin: <span id="end-date">2024</span></label>
                    <input type="range" id="end-slider" min="0" max="40" value="40">
                </div>
            </div>
            
            <div class="chart-container">
                <!--h3>Gráfico de Barras</h3-->
                <canvas id="barChart" data-img="{{ '/assets/images/tu_imagen.png' | relative_url }}"></canvas>
            </div>
    </div>
</div>

<script src="/static/js/script_mapa_energia.js"></script>





























    

