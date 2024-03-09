from app import app
from apis.controllers.controller_nltk import (
    Get_word_frequencies
    , Get_concordance_lines
    , Get_tokens
    , Get_tokens_upload
    , Get_collocate_list
    , Get_ngram_list
)


@app.route("/nltk/tokens", methods=["POST"])
def Nltk_get_tokens():
    return Get_tokens()


@app.route("/nltk/tokens/upload", methods=["POST"])
def Nltk_get_tokens_upload():
    return Get_tokens_upload()


@app.route("/nltk/word_frequencies", methods=["POST"])
def Nltk_get_word_frequencies():
    return Get_word_frequencies()


@app.route('/nltk/concordances', methods=['POST'])
def Nltk_get_concordance_lines():
    return Get_concordance_lines()


@app.route('/nltk/collocates', methods=['POST'])
def Nltk_get_collocates_list():
    return Get_collocate_list()


@app.route('/nltk/ngrams', methods=['POST'])
def Nltk_get_ngram_list():
    return Get_ngram_list()
