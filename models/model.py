from main import app
from extensions import db

with app.app_context():
    db.create_all()
