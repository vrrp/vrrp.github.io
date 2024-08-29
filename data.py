import pandas as pd

# Example time series data
data = {
    'Date': pd.date_range(start='2023-01-01', periods=12, freq='M'),
    'Value1': [100, 120, 130, 125, 145, 160, 155, 150, 165, 170, 180, 190],
    'Value2': [90, 95, 100, 105, 110, 115, 120, 125, 130, 140, 150, 160]
}

df = pd.DataFrame(data)
df.to_csv('data.csv', index=False)
