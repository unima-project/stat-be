from werkzeug.exceptions import HTTPException
from app import app
import apis.controllers.controller_error_handler as err_handler


@app.errorhandler(HTTPException)
def err_handle_exception(e):
    return err_handler.handle_exception(e)


@app.errorhandler(404)
def err_page_not_found(e):
    return err_handler.page_not_found(e)


@app.route("/", methods=["GET"])
def Home():
    return "Welcome home from STAT (Simple Text Analytic Tool)"


@app.route("/tools", methods=["GET"])
def Tools():
    return "Welcome tools from STAT (Simple Text Analytic Tool)"


import apis.api_authentication
import apis.api_user
import apis.api_nltk
import apis.api_corpus
