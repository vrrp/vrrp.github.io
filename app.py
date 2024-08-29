# app.py
from flask import Flask, render_template
import pandas as pd
import plotly.express as px

app = Flask(__name__)

@app.route('/')
def dashboard():
    # Load your data
    df = pd.read_csv('data.csv')

    # Create a time series line chart
    fig1 = px.line(df, x='Date', y='Value1', title='Time Series Curve')
    graph1 = fig1.to_html(full_html=False)

    # Create a bar chart
    fig2 = px.bar(df, x='Date', y='Value2', title='Time Series Bar')
    graph2 = fig2.to_html(full_html=False)

    return render_template('index.html', graph1=graph1, graph2=graph2)

if __name__ == '__main__':
    app.run(debug=True)

