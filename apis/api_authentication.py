from apis.controllers.controller_authentication import Login, Logout
from middlewares.middleware_authentication import Token_authentication
from apis import authRouter


@authRouter.route("/auth", methods=["GET"])
def Auth_home():
    return "Welcome auth from STAT (Simple Text Analytic Tool)"


@authRouter.route("/auth/login", methods=["POST"])
def Auth_login():
    return Login()


@authRouter.route("/auth/logout", methods=["GET"])
@Token_authentication
def Auth_logout(user_id):
    return Logout(user_id)
