# imports
from flask import Flask, render_template

# Flask setup
app = Flask(__name__)

# Define routes
@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/about_data")
# def About_Data():
#     return render_template("about_data.html")

if __name__ == '__main__':
    app.run(debug=True)

