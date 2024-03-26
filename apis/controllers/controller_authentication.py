import logging
import os

from flask import request, jsonify, make_response
from models.model_user import Find_user_by_custom_filter, USER_ACTIVE
from utils.util_security import Check_hash, Generate_jwt_token
from apis.controllers.controller_common import Response, SUCCESS, ERROR
from datetime import datetime, timedelta


def Login():
    success_response = Response(
        status=SUCCESS
        , message="user successfully login"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="user unauthorized"
        , data=None
    )

    try:
        email = request.get_json()['email']
        password = request.get_json()['password']

        curr_user, err = Find_user_by_custom_filter(
            email=email, status=USER_ACTIVE
        )
        if err is not None:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 401

        if curr_user:
            pw_hash = curr_user.password
            is_match, err = Check_hash(password, pw_hash)
            if err:
                logging.error('login error:', err)
                return jsonify(error_response), 401

            if not is_match:
                err_msg = "user or password is not found"
                logging.error(err_msg)
                error_response['message'] = err_msg
                return jsonify(error_response), 401

            payload = {"id": curr_user.id, "exp": datetime.utcnow() + timedelta(hours=1)}
            token, err = Generate_jwt_token(payload)
            if err:
                logging.error('login error:', err)
                return jsonify(error_response), 401

            success_response["data"] = {
                "id": curr_user.id
                , "name": curr_user.name
                , "token": token
                , "type": curr_user.user_type
            }

            resp = make_response(jsonify(success_response))
            resp.set_cookie(
                key="token"
                , value=token
                , max_age=timedelta(hours=1)
                , secure=True
                , domain=os.getenv("APPLICATION_COOKIE_DOMAIN", "localhost")
            )

            return resp, 200
    except KeyError as err:
        err_msg = f'login error: {err} required'

        logging.error(err_msg)
        error_response['message'] = err_msg
        return jsonify(error_response), 401
    except:
        return jsonify(error_response), 401


def Logout(user_id):
    success_response = Response(
        status=SUCCESS
        , message="user successfully logout"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="logout failed"
        , data=None
    )

    try:
        resp = make_response(jsonify(success_response))
        resp.set_cookie(key="token", value="", max_age=timedelta(seconds=0), secure=True)
        resp.delete_cookie("token", secure=True)
        return resp, 200
    except:
        return jsonify(error_response), 401
