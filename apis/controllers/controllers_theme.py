import logging

from models.model_theme import Get_first_theme, Update_current_theme, Add_new_theme
from apis.controllers.controller_common import Response, ERROR, SUCCESS
from flask import jsonify, request


def Get_theme():
    response = Response(
        status=SUCCESS
        , message="theme"
        , data=None
    )

    try:
        curr_theme, err = Get_first_theme()
        if err:
            response['status'] = ERROR
            response['message'] = err
            return jsonify(response), 500

        theme = {
            "id": curr_theme.id
            , "color": curr_theme.color
            , "created_at": curr_theme.created_at
            , "updated_at": curr_theme.updated_at
        }

        response['data'] = theme
    except TypeError as err:
        response['status'] = ERROR
        response['message'] = err
        return jsonify(response), 400
    except ValueError as err:
        response['status'] = ERROR
        response['message'] = err
        return jsonify(response), 400

    return jsonify(response), 200


def Update_theme(user_id):
    success_response = Response(
        status=SUCCESS
        , message="theme successfully updated"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to update theme"
        , data=None
    )

    try:
        color = request.get_json()['color']
        current_theme, err = Get_first_theme()
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        current_theme.color = color
        err = Update_current_theme(current_theme)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['message'] = 'theme successfully updated'
        return success_response, 200
    except KeyError as err:
        err_msg = f'error update theme: {err} required'
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


def Add_theme(user_id):
    success_response = Response(
        status=SUCCESS
        , message="theme successfully added"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="error add new theme"
        , data=None
    )

    try:
        color = request.get_json()['color']
        if color == '':
            logging.error('color required !!')
            error_response['message'] = 'color required !!'
            return jsonify(error_response), 400

        err = Add_new_theme(color)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 500

        return success_response, 200
    except KeyError as err:
        err_msg = f'error add new color: {err} required'
        logging.error(err_msg)
        error_response['message'] = err_msg
        return jsonify(error_response), 400
    except TypeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400