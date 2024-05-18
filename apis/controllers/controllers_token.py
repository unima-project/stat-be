import logging

from models.model_common import USER_ADMIN
from models.model_token import View_all_token, Find_token_by_id, Delete_current_token
from apis.controllers.controller_common import Response, ERROR, SUCCESS
from flask import jsonify, request
from models.model_user import Find_user_by_id


def Get_all_token_list():
    response = Response(
        status=SUCCESS
        , message="all token list"
        , data=None
    )

    try:
        token_list, err = View_all_token()
        if err:
            response['status'] = ERROR
            response['message'] = err
            return jsonify(response), 500

        response['data'] = token_list
    except:
        response['status'] = ERROR
        response['message'] = "error get all token list"
        return jsonify(response), 400

    return jsonify(response), 200


def Delete_token(user_id):
    success_response = Response(
        status=SUCCESS
        , message="token successfully deleted"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to delete token"
        , data=None
    )

    try:
        current_user, err = Find_user_by_id(user_id)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        if current_user.user_type != USER_ADMIN:
            logging.error('unauthorized')
            error_response['message'] = 'unauthorized'
            return jsonify(error_response), 401

        token_id = int(request.args.get('id'))
        current_token, err = Find_token_by_id(token_id)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        err = Delete_current_token(current_token)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['message'] = f'token with id {token_id} successfully deleted'
        return success_response, 200
    except KeyError as err:
        err_msg = f'error delete current token: {err} required'
        logging.error(err_msg)
        error_response['message'] = err_msg
        return jsonify(error_response), 400
    except TypeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400
    except AttributeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400
