from apis.controllers.controller_authentication import Login, Logout
from app import app
from middlewares.middleware_authentication import Token_authentication


@app.route("/login", methods=["POST"])
def Auth_login():
    return Login()


@app.route("/logout", methods=["GET"])
@Token_authentication
def Auth_logout():
    return Logout()
