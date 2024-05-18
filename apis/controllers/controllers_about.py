import logging

from models.model_about import Add_new_content, Update_current_content, Get_first_content
from apis.controllers.controller_common import Response, ERROR, SUCCESS
from flask import jsonify, request


def Get_about():
    response = Response(
        status=SUCCESS
        , message="content"
        , data=None
    )

    try:
        curr_content, err = Get_first_content()
        if err:
            response['status'] = ERROR
            response['message'] = err
            return jsonify(response), 500

        content = {
            "id": curr_content.id
            , "content": curr_content.content
            , "created_at": curr_content.created_at
            , "updated_at": curr_content.updated_at
        }

        response['data'] = content
    except TypeError as err:
        response['status'] = ERROR
        response['message'] = err
        return jsonify(response), 400
    except ValueError as err:
        response['status'] = ERROR
        response['message'] = err
        return jsonify(response), 400

    return jsonify(response), 200


def Update_content(user_id):
    success_response = Response(
        status=SUCCESS
        , message="about successfully updated"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to update about"
        , data=None
    )

    try:
        content = request.get_json()['content']
        current_content, err = Get_first_content()
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        current_content.content = content
        err = Update_current_content(current_content)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['message'] = 'content successfully updated'
        return success_response, 200
    except KeyError as err:
        err_msg = f'error update content: {err} required'
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


def Add_content(user_id):
    success_response = Response(
        status=SUCCESS
        , message="content successfully added"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="error add new corpus"
        , data=None
    )

    try:
        content = request.get_json()['content']
        if content == '':
            logging.error('content required !!')
            error_response['message'] = 'content required !!'
            return jsonify(error_response), 400

        err = Add_new_content(content)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 500

        return success_response, 200
    except KeyError as err:
        err_msg = f'error add new content: {err} required'
        logging.error(err_msg)
        error_response['message'] = err_msg
        return jsonify(error_response), 400
    except TypeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400
