from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config_db
from apis import api
from apis import api_authentication
from apis import api_nltk
from apis import api_user
from apis import api_corpus


def create_app():
    app = Flask(__name__)
    load_dotenv()

    # setup db
    Config_db(app)
    from extensions import db
    db.init_app(app)

    # setup cors
    cors = CORS()
    cors.init_app(app)

    import models

    # register router
    app.register_blueprint(api.mainRouter)
    app.register_blueprint(api_authentication.authRouter)
    app.register_blueprint(api_nltk.ntlkRouter)
    app.register_blueprint(api_corpus.corpusRouter)
    app.register_blueprint(api_user.userRouter)

    return app
