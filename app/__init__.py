from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from apis import api
from apis import api_authentication
from apis import api_nltk
from apis import api_user
from apis import api_corpus
from apis import api_token
from apis import api_about
from apis import api_theme
from config import Config_db
from models.model import initDB


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

    initDB(app, db)

    # register router
    app.register_blueprint(api.mainRouter)
    app.register_blueprint(api_authentication.authRouter)
    app.register_blueprint(api_nltk.ntlkRouter)
    app.register_blueprint(api_corpus.corpusRouter)
    app.register_blueprint(api_user.userRouter)

    app.register_blueprint(api_token.tokenRouter)
    app.register_blueprint(api_about.aboutRouter)
    app.register_blueprint(api_theme.themeRouter)

    return app
