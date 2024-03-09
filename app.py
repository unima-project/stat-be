import os

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config_db

app = Flask(__name__)

load_dotenv()

cors = CORS(app)

# setup config
db = Config_db(app)

import models.model
import apis.api

if __name__ == "__main__":
    app.run(port=os.getenv("PORT", 5000))
