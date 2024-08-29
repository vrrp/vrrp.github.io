from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # List of image filenames to be animated
    images = [
        "iheight_of_zero_isotherm_vilcanota_valley_day_jan2019.png",
        "iheight_of_zero_isotherm_vilcanota_valley_day_feb2019.png",
        "iheight_of_zero_isotherm_vilcanota_valley_day_mar2019.png"
    ]
    return render_template('index.html', images=images)

if __name__ == '__main__':
    app.run(debug=True)

