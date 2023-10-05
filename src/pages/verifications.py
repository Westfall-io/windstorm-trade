import streamlit as st
import requests
import pandas as pd

st.set_page_config(
    page_title="Verifications",
    page_icon="🧊",
    layout="wide",
    initial_sidebar_state="expanded",
    menu_items={
        'Get Help': 'https://www.westfall.io/contact',
    }
)

st.title('Registered Verifications')

#r = requests.get(url="http://localhost:8000/artifacts")
df = pd.read_json("http://localhost:8000/models/verifications/main")
names = []
for index, rows in df.iterrows():
    name = ''
    if rows['reqt_shortName'] is not None:
        name += str(rows['reqt_shortName']) + ' '
    name = rows['reqt_declaredName']
    names.append(name)
df['Name'] = names
df.set_index('Name', inplace=True)
#st.dataframe(df, column_config={
#    "commit_url":st.column_config.LinkColumn()
#})
df = df.rename(columns={"qualifiedName": "Qualified Name"})
df = df.drop(columns=['id', 'reqt_qualifiedName', 'reqt_shortName', 'reqt_declaredName', 'commit_id', 'text', 'payload'])
verified = [False]*len(df)

df['Verified'] = verified

st.dataframe(df)
