import logging
from models.model_corpus import (
    Add_new_corpus
    , View_all_corpus
    , Delete_current_corpus
    , Find_corpus_by_custom_filter
)
from apis.controllers.controller_common import Response, ERROR, SUCCESS
from flask import request, jsonify


def Register_new_corpus(user_id):
    success_response = Response(
        status=SUCCESS
        , message="corpus successfully registered"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="error register new corpus"
        , data=None
    )

    try:
        new_corpus = {
            "corpus": request.get_json()['corpus']
            , "user_id": user_id
        }

        err = Add_new_corpus(new_corpus)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        return success_response, 200
    except KeyError as err:
        err_msg = f'error register new corpus: {err} required'
        logging.error(err_msg)
        error_response['message'] = err_msg
        return jsonify(error_response), 400
    except TypeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400


def Get_all_corpus_list(user_id):
    success_response = Response(
        status=SUCCESS
        , message="successfully get corpus list"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to get corpus list"
        , data=None
    )

    try:
        corpus_list, err = View_all_corpus(user_id=user_id)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['data'] = corpus_list
        return success_response, 200
    except:
        return jsonify(error_response), 400


def Delete_corpus(user_id):
    success_response = Response(
        status=SUCCESS
        , message="corpus successfully deleted"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to delete corpus"
        , data=None
    )

    try:
        corpus_id = request.args.get('id')
        current_corpus, err = Find_corpus_by_custom_filter(
            id=corpus_id
            , user_id=user_id
        )
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        err = Delete_current_corpus(current_corpus)
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['message'] = f'Corpus with id {corpus_id} successfully deleted'
        return success_response, 200
    except KeyError as err:
        err_msg = f'error delete current corpus: {err} required'
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


def Load_current_corpus(user_id, corpus_id):
    success_response = Response(
        status=SUCCESS
        , message="successfully load current corpus"
        , data=None
    )

    error_response = Response(
        status=ERROR
        , message="failed to load current corpus"
        , data=None
    )

    try:
        current_corpus, err = Find_corpus_by_custom_filter(
            id=corpus_id
            , user_id=user_id
        )
        if err:
            logging.error(err)
            error_response['message'] = err
            return jsonify(error_response), 400

        success_response['data'] = {
            "corpus": current_corpus.corpus
        }
        return success_response, 200
    except TypeError as err:
        logging.error(err)
        error_response['message'] = err
        return jsonify(error_response), 400
