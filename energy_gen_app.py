# imports
from flask import Flask, render_template, jsonify, url_for
from sqlalchemy import create_engine
import pandas as pd
from config import db_password

# flask setup 
app = Flask(__name__)

# database setup
db_string = f"postgresql://postgres:{db_password}@127.0.0.1:5432/Project 2"
engine = create_engine(db_string)
df = pd.read_sql("energy_gen", engine)


# define routes
@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/api")
def return_all():
       return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in df.iterrows()])

@app.route("/api/<CATEGORY>")
def return_filtered(CATEGORY):
    print(CATEGORY)
    filtered_df = df.loc[df["category"]==TYPE]
    return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in filtered_df.iterrows()])

@app.route("/api/<FUEL>")
def return_fuel(FUEL):
    print(FUEL)
    fuel_filter_df = df.loc[df["fuel_type"]==FUEL]
    return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in fuel_filter_df.iterrows()])

if __name__ == '__main__':
    app.run(debug=True)

