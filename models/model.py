import models.model_user
import models.model_corpus
import models.model_token


def initDB(app, db):
    with app.app_context():
        db.create_all()
