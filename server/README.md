Database entity-relationship diagram:
![img.png](entity-relationship-diagram.png)

### Setup

\`\`\`bash
cd server
python -m venv .venv
source .venv/Scripts/activate # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`
