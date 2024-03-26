from apis.controllers.controller_corpus import (
    Register_new_corpus
    , Get_all_corpus_list
    , Delete_corpus
    , Load_current_corpus
    , Get_all_public_corpus_list

    , Load_current_public_corpus
    , Update_corpus_public_status
)
from app import app
from middlewares.middleware_authentication import Token_authentication


@app.route('/corpuses/register', methods=['POST'])
@Token_authentication
def Corpus_register(user_id):
    return Register_new_corpus(user_id)


@app.route('/corpuses', methods=['GET'])
@Token_authentication
def Corpus_list(user_id):
    return Get_all_corpus_list(user_id)


@app.route('/corpuses/delete', methods=['DELETE'])
@Token_authentication
def Corpus_delete(user_id):
    return Delete_corpus(user_id)


@app.route('/corpuses/<corpus_id>', methods=['GET'])
@Token_authentication
def Corpus_load(user_id, corpus_id):
    return Load_current_corpus(user_id, corpus_id)


@app.route('/corpuses/publics/update', methods=['PATCH'])
@Token_authentication
def Corpus_public_update(user_id):
    return Update_corpus_public_status(user_id)


@app.route('/corpuses/publics', methods=['GET'])
def Public_corpus_list():
    return Get_all_public_corpus_list()


@app.route('/corpuses/publics/<corpus_id>', methods=['GET'])
def Public_corpus_load(corpus_id):
    return Load_current_public_corpus(corpus_id)
