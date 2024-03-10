import logging
from models.model_user import (
    Add_new_user
    , View_all_user
    , Find_user_by_id
    , Update_current_user
    , Delete_current_user
)
from apis.controllers.controller_common import Response, ERROR, SUCCESS
from flask import request, jsonify
from utils.util_security import Generate_random_password, Check_hash, Generate_hash
from utils.util_validation import Validate_email


def Create_new_user():
    success_response = Response(
        status=SUCCESS
        , message="user successfully created"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="error register new user"
        , data=None
    )

    try:
        new_user = {
            "user_type": request.get_json()['user_type']
            , "name": request.get_json()['name']
            , "email": request.get_json()['email']
            , "password": Generate_random_password(8)
            , "no_ktp": request.get_json()['no_ktp']

            , "no_hp": request.get_json()['no_hp']
            , "address": request.get_json()['address']
            , "reason": request.get_json()['reason']
            , "status": request.get_json()['status']
        }

        err = Add_new_user(new_user)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['data'] = {
            "email": new_user['email']
            , "password": new_user['password']
        }

        return success_response, 200
    except KeyError as err:
        err_msg = f'error register new user: {err} required'
        logging.error(err_msg)
        error_response['message'] = err_msg
        return jsonify(error_response), 400
    except TypeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400
    except:
        return jsonify(error_response), 400


def Get_all_user_list():
    success_response = Response(
        status=SUCCESS
        , message="successfully get user list"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to get user list"
        , data=None
    )

    try:
        user_list, err = View_all_user()
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['data'] = user_list
        return success_response, 200
    except:
        return jsonify(error_response), 400


def Update_user():
    success_response = Response(
        status=SUCCESS
        , message="user successfully updated"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to update user"
        , data=None
    )

    try:
        valid_email = Validate_email(request.get_json()['email']);
        if not valid_email:
            err_msg = "email is not valid"
            logging.error(err_msg)
            error_response['message'] = err_msg
            return jsonify(error_response), 400

        current_user, err = Find_user_by_id(request.get_json()['id'])
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        current_user.user_type = request.get_json()['user_type']
        current_user.name = request.get_json()['name']
        current_user.email = request.get_json()['email']
        current_user.no_ktp = request.get_json()['no_ktp']
        current_user.no_hp = request.get_json()['no_hp']

        current_user.address = request.get_json()['address']
        current_user.reason = request.get_json()['reason']
        current_user.status = request.get_json()['status']

        err = Update_current_user(current_user)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        return success_response, 200
    except KeyError as err:
        err_msg = f'error update user: {err} required'
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
    except:
        return jsonify(error_response), 400


def Delete_user():
    success_response = Response(
        status=SUCCESS
        , message="user successfully deleted"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to delete user"
        , data=None
    )

    try:
        current_user, err = Find_user_by_id(request.args.get('id'))
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        err = Delete_current_user(current_user)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        return success_response, 200
    except KeyError as err:
        err_msg = f'error update user: {err} required'
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
    except:
        return jsonify(error_response), 400


def Update_user_password(user_id):
    success_response = Response(
        status=SUCCESS
        , message="user password successfully updated"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to update user password"
        , data=None
    )

    try:
        current_user, err = Find_user_by_id(user_id)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        is_match, err = Check_hash(request.get_json()['old_password'], current_user.password)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        if not is_match:
            err_msg = "password is incorrect"
            logging.error(err_msg)
            error_response['message'] = err_msg
            return jsonify(error_response), 400

        pw_hash, err = Generate_hash(request.get_json()['new_password'])
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        current_user.password = pw_hash
        err = Update_current_user(current_user)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        return success_response, 200
    except KeyError as err:
        err_msg = f'error update user password: {err} required'
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
    except:
        return jsonify(error_response), 400


def Reset_user_password():
    success_response = Response(
        status=SUCCESS
        , message="user password successfully reset"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to reset user password"
        , data=None
    )

    try:
        current_user, err = Find_user_by_id(request.args.get('id'))
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        new_password = Generate_random_password(8)
        pw_hash, err = Generate_hash(new_password)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        current_user.password = pw_hash
        err = Update_current_user(current_user)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['data'] = {
            "new_password": new_password
        }
        return success_response, 200
    except KeyError as err:
        err_msg = f'error reset user password: {err} required'
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
    except:
        return jsonify(error_response), 400


def Get_current_user(user_id):
    success_response = Response(
        status=SUCCESS
        , message="successfully get current user"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to get current user"
        , data=None
    )

    try:
        current_user, err = Find_user_by_id(user_id)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        user = {
            "id": current_user.id
            , "name": current_user.name
            , "email": current_user.email
            , "no_ktp": current_user.no_ktp
            , "no_hp": current_user.no_hp
            , "address": current_user.address
            , "reason": current_user.reason
            , "status": current_user.status
        }

        success_response['data'] = user
        return success_response, 200
    except:
        return jsonify(error_response), 400
