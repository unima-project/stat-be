from werkzeug.exceptions import HTTPException
from app import app
from api_nltk import Get_word_frequencies, Get_concordance_lines, Get_tokens, Get_tokens_upload, Get_collocate_list, Get_ngram_list
import api_error_handler as err_handler


@app.errorhandler(HTTPException)
def err_handle_exception(e):
    return err_handler.handle_exception(e)


@app.errorhandler(404)
def err_page_not_found(e):
    return err_handler.page_not_found(e)


@app.route("/", methods=["GET"])
def Home():
    return "Hello from STAT (Simple Text Analytic Tool)"


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
