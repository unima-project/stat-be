import logging

from flask import jsonify
from api_common import Response, ERROR


def handle_exception(e):
    err_msg = f"http error: {e.description}"
    logging.error(err_msg)
    return jsonify(Response(status=ERROR, message=err_msg, data=None)), 500


def page_not_found(e):
    err_msg = f"http error: {e.description}"
    logging.error(err_msg)
    return jsonify(Response(status=ERROR, message=err_msg, data=None)), 404
