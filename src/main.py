import streamlit as st
from st_pages import Page, Section, add_page_title, show_pages

st.set_page_config(
    page_title="DigitalForge",
    page_icon="🧊",
    layout="wide",
    initial_sidebar_state="expanded",
    menu_items={
        'Get Help': 'https://www.westfall.io/contact',
    }
)

show_pages(
    [
        Page("src/main.py", "DigitalForge", "🏠"),
        # The pages appear in the order you pass them
        Page("src/pages/reqts.py", "Requirements", "📖"),
        Page("src/pages/verifications.py", "Verifications", "✏️"),
        Page("src/pages/threads.py", "Threads", "🧵"),
        Page("src/pages/artifacts.py", "Registered Artifacts", "✏️"),
        Page("src/pages/containers.py", "Registered Containers", ":package:"),
    ]
)

st.title('DigitalForge')
st.markdown('''This is the main page to understand the current sets of
            workflows. You can navigate to any of the following sections
            using the navigation on the left.''')
