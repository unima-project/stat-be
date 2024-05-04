import models.model_user
import models.model_corpus

def initDB(app, db):
    with app.app_context():
        db.create_all()
