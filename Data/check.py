import pandas as pd

df = pd.read_csv("AES_CLEAN_DF.csv")

print(df["Year"].value_counts())
