from apis.controllers.controller_authentication import Login, Logout
from app import app
from middlewares.middleware_authentication import Token_authentication


@app.route("/auth/login", methods=["POST"])
def Auth_login():
    return Login()


@app.route("/auth/logout", methods=["GET"])
@Token_authentication
def Auth_logout(user_id):
    return Logout(user_id)
