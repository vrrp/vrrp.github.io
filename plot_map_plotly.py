import plotly.express as px
import pandas as pd 

data = pd.read_csv('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
print(data)

names = list(data.columns.values)
#names = list(data.columns.values)
names = data.columns.values.tolist()
print(names)

for i in data.columns:
    print(i)

print(data.keys())
print(type(list(data.keys())))
print(type(data))

data = data.dropna(subset=["mag"])
data = data[data.mag>= 0]

# Create scatter map
fig = px.scatter_geo(data, lat='latitude', lon='longitude', color='mag',
                     hover_name='place', size='mag', size_max=10,
                     title='Earthquakes Around the World')
fig.show()
