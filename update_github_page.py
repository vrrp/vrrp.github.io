

import os
import subprocess as cmd
import datetime as dt


path_now = os.getcwd()
time = dt.datetime.now()
date = time.strftime("%d-%B-%Y")
times= time.strftime("%H:%M:%S")
mensaje = input("Describir cambios: ")

os.system("git init")
os.system("git add .")
os.system(f"git commit -m '{mensaje}'")
os.system("git push origin main")

