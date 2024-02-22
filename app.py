from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app)

import api

print("__name__:", __name__)

if __name__ == "__main__":
    app.run(port=5000)
