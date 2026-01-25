import requests
import pandas as pd
import os
import io


def download_files_from_web(url,data_path ,output_file):
    try:
        response = requests.get(url+output_file, timeout=10)
        response.raise_for_status()
        df = pd.read_csv(io.StringIO(response.text), delim_whitespace=True)
        iyear, imonth = (df["YR"].iloc[0], df["MON"].iloc[0])
        fyear, fmonth = (df["YR"].iloc[-1], df["MON"].iloc[-1])
        #dates = pd.date_range(start="1950-01", end="2024-11", freq="MS")
        dates = pd.date_range(start=str(iyear)+"-"+str(imonth), end=str(fyear)+"-"+str(fmonth), freq="MS")
        df.insert(0, "DATE", dates)
        #print(df.head())
        print(df.tail(3))

        with open(data_path+output_file, "w", encoding="utf-8") as file:
            file.write(response.text)
        df.to_csv(data_path+output_file+".csv", sep=",", header=True, index=False)
        print(f"Done '{output_file}'.")

    
    except requests.exceptions.RequestException as e:
        print(f"Error '{e}'")

data_path = "../../assets/data/"
url = "https://www.cpc.ncep.noaa.gov/data/indices/"

output_ersst5_file = "ersst5.nino.mth.91-20.ascii"
output_sstoi_file = "sstoi.indices"

print(os.system("tail "+data_path+output_sstoi_file+".csv"))

download_files_from_web(url, data_path, output_ersst5_file)
download_files_from_web(url, data_path, output_sstoi_file)

