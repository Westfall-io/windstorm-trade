import streamlit as st
import requests
import pandas as pd

st.set_page_config(
    page_title="Artifacts",
    page_icon="👋",
)

st.title('Artifacts')

#r = requests.get(url="http://localhost:8000/artifacts")
df = pd.read_json("http://localhost:8000/artifacts")
df.set_index('id', inplace=True)
#st.dataframe(df, column_config={
#    "commit_url":st.column_config.LinkColumn()
#})
table = '''<table>
  <tr>
    <th>Link</th>
    <th>Project Path</th>
    <th>Branch</th>
    <th>Commit</th>
    <th>Last Updated</th>
  </tr>'''

for index,row in df.iterrows():
    table += '<tr>'
    table += '''<td><a href="{}" target="_self">
        <div style="
            display: inline-block;
            padding: 0.5em 1em;
            color: #FFFFFF;
            background-color: blue;
            border-radius: 3px;
            text-decoration: none;">
            {}
        </div>
    </a></td>'''.format(row['commit_url'].replace('http://', 'https://').split('/commit')[0],index)
    table += '<td>{}</td>'.format(row['full_name'])
    table += '<td>{}</td>'.format(row['ref'])
    table += '<td>{}</td>'.format(row['commit'])
    table += '<td>{}</td>'.format(row['date_updated'])
    table += '</tr>'
table += '</table>'
st.markdown(table, unsafe_allow_html=True)
