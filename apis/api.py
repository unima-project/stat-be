from werkzeug.exceptions import HTTPException
import apis.controllers.controller_error_handler as err_handler
from apis import mainRouter


@mainRouter.errorhandler(HTTPException)
def err_handle_exception(e):
    return err_handler.handle_exception(e)


@mainRouter.errorhandler(404)
def err_page_not_found(e):
    return err_handler.page_not_found(e)


@mainRouter.route("/", methods=["GET"])
def Home():
    return "Welcome home from STAT (Simple Text Analytic Tool)"


@mainRouter.route("/tools", methods=["GET"])
def Tools():
    return "Welcome tools from STAT (Simple Text Analytic Tool)"
