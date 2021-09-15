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
    y_val = df["year"].unique()
    x_val = df["fuel_type"].unique()
    return render_template("home.html", y_val=y_val, x_val=x_val)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/api")
def return_all():
       return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in df.iterrows()])

# @app.route("/api/category/<CATEGORY>")
# def return_filtered(CATEGORY):
#     print(CATEGORY)
#     filtered_df = df.loc[df["category"]==TYPE]
#     return jsonify(results=[{"area": row["area"], "category": row["category"], "fuel_type": row["fuel_type"], "year": row["year"], "energy_gen":row["energy_gen"] } for idx, row in filtered_df.iterrows()])

# app route for fuel doughnutchart and DD 
@app.route("/api/fuel/<YEAR>")
def return_fuel(YEAR):
    print(YEAR)
    fuel_filter_df = df.loc[(df["year"]==YEAR) & (df["area"]=="All")]
    fuel_vc = fuel_filter_df.groupby("fuel_type")["energy_gen"].sum().reset_index()
    print(fuel_vc)
    return jsonify(results=[{"fuel_type": row["fuel_type"], "energy_gen": row["energy_gen"] } for idx, row in fuel_vc.iterrows()])


# app route for year barchart and DD 
@app.route("/api/year/<FUEL>")
def return_year(FUEL):
    print(FUEL)
    year_filter_df = df.loc[(df["fuel_type"]==FUEL) & (df["area"]=="All")]
    year_vc = year_filter_df.groupby("year")["energy_gen"].sum().reset_index()
    print(year_vc)
    return jsonify(results=[{"year": row["year"], "energy_gen": row["energy_gen"] } for idx, row in year_vc.iterrows()])


if __name__ == '__main__':
    app.run(debug=True)

