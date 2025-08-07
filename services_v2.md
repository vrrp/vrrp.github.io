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
<script src="/static/js/script_mapaENSOv2.js"></script>
<!--script src="/static/js/script_tablaENSO.js"></script-->
<!--script src="/static/js/plot_timeSeries_ensoIndex.js"></script-->





























    

