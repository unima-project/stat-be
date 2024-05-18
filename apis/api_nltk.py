from apis.controllers.controller_nltk import (
    Get_word_frequencies
    , Get_concordance_lines
    , Get_tokens
    , Get_tokens_upload
    , Get_collocate_list
    , Get_ngram_list
)

from apis import ntlkRouter


@ntlkRouter.route("/nltk/tokens", methods=["POST"])
def Nltk_get_tokens():
    return Get_tokens()


@ntlkRouter.route("/nltk/tokens/upload", methods=["POST"])
def Nltk_get_tokens_upload():
    return Get_tokens_upload()


@ntlkRouter.route("/nltk/word_frequencies", methods=["POST"])
def Nltk_get_word_frequencies():
    return Get_word_frequencies()


@ntlkRouter.route('/nltk/concordances', methods=['POST'])
def Nltk_get_concordance_lines():
    return Get_concordance_lines()


@ntlkRouter.route('/nltk/collocates', methods=['POST'])
def Nltk_get_collocates_list():
    return Get_collocate_list()


@ntlkRouter.route('/nltk/ngrams', methods=['POST'])
def Nltk_get_ngram_list():
    return Get_ngram_list()