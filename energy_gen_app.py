# imports
from flask import Flask, render_template, jsonify, url_for
from sqlalchemy import create_engine
import pandas as pd
from config import db_password

# Flask setup 
app = Flask(__name__)

db_string = f"postgresql://postgres:{db_password}@127.0.0.1:5432/Project 2"
engine = create_engine(db_string)
df = pd.read_sql("energy_gen", engine)



# Define routes
@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/about_data")
# def About_Data():
#     return render_template("about_data.html")

@app.route("/api")
def return_all():
    # return df.to_json()
    # return jsonify(area =list (df["area"]), category = list (df["category"]), fuel_type = list (df["fuel_type"]))
    return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in df.iterrows()])

@app.route("/api/<TYPE>")
def return_filtered(TYPE):
    print(TYPE)
    filtered_df = df.loc[df["category"]==TYPE]
    return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in filtered_df.iterrows()])


if __name__ == '__main__':
    app.run(debug=True)
