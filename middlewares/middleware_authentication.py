import logging
from functools import wraps
from flask import request, jsonify, g
from apis.controllers.controller_common import Response, ERROR
from utils.util_security import Decode_jwt_token
from models.model_user import Find_user_by_id, USER_ADMIN


def Token_authentication(func):
    @wraps(func)
    def __token_authentication(*args, **kwargs):
        response_error = Response(
            status=ERROR
            , message="user unauthorized"
            , data=None
        )

        user_id, err = Token_validation(request)
        if err:
            err_msg = f'error token authentication: {err}'
            logging.error(err_msg)
            return jsonify(response_error), 401

        _, err = Find_user_by_id(user_id)
        if err:
            logging.error(f'error token authentication: {err}')
            return jsonify(response_error), 401

        result = func(user_id, *args, **kwargs)
        return result

    return __token_authentication


def Token_admin_authentication(func):
    @wraps(func)
    def __token_authentication(*args, **kwargs):
        response_error = Response(
            status=ERROR
            , message="user unauthorized"
            , data=None
        )

        user_id, err = Token_validation(request)
        if err:
            logging.error(f'error token authentication: {err}')
            return jsonify(response_error), 401

        curr_user, err = Find_user_by_id(user_id)
        if err:
            logging.error(f'error token authentication: {err}')
            return jsonify(response_error), 401

        if curr_user.user_type != USER_ADMIN:
            return jsonify(response_error), 401

        result = func(user_id, *args, **kwargs)
        return result

    return __token_authentication


def Token_validation(req):
    jwt_token = req.cookies.get("token")
    if jwt_token == "":
        return 0, "error token validation: token required"

    payload, err = Decode_jwt_token(jwt_token)
    if err:
        return 0, f"error token validation: {err}"

    user_id = payload['id']
    return user_id, None
