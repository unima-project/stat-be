from os import remove
from nltk import tokenize, FreqDist
from nltk.text import ConcordanceIndex
from nltk.collocations import BigramCollocationFinder
from api_common import Response, ERROR, SUCCESS
from flask import jsonify, request


def Get_tokens():
    response = Response(
        status=SUCCESS
        , message="tokenizing"
        , data=None
    )

    try:
        text = request.get_json()['text']
        tokens = Tokenizing(text)
        response['data'] = tokens
    except KeyError as err:
        response['status'] = ERROR
        response['message'] = f'{err} required'
        return jsonify(response), 400

    return jsonify(response), 200


def Get_tokens_upload():
    response = Response(
        status=SUCCESS
        , message="tokenizing upload"
        , data=None
    )

    try:
        f = request.files['text']
        err = File_validation(f.filename)
        if err:
            response['status'] = ERROR
            response['message'] = err
            return jsonify(response), 400

        f.save(f.filename)

        text = open(f.filename, "r")
        joined_text = "".join(text.readlines())
        tokens = Tokenizing(joined_text)
        text.close()
        remove(f.filename)

        response['message'] = f'{f.filename} successfully uploaded'
        response['data'] = tokens
    except KeyError as err:
        response['status'] = ERROR
        response['message'] = f'{err} required'
        return jsonify(response), 400

    return jsonify(response), 200


def Get_word_frequencies():
    response = Response(
        status=SUCCESS
        , message="freq dist"
        , data=None
    )

    try:
        tokens = request.get_json()['tokens']
        word_freq = Word_freq_counting(tokens)
        response['data'] = word_freq
    except KeyError as err:
        response['status'] = ERROR
        response['message'] = f'{err} required'
        return jsonify(response), 400

    return jsonify(response), 200


def Get_concordance_lines():
    response = Response(
        status=SUCCESS
        , message="concordance"
        , data=None
    )

    try:
        keyword = request.get_json()['keyword']
        tokens = request.get_json()['tokens']
        concordance_lines = Concordance(tokens, keyword)
        response['data'] = concordance_lines
    except KeyError as err:
        response['status'] = ERROR
        response['message'] = f'{err} required'
        return jsonify(response), 400
    except TypeError as err:
        response['status'] = ERROR
        response['message'] = err
        return jsonify(response), 400

    return jsonify(response), 200


def Get_collocate_list():
    response = Response(
        status=SUCCESS
        , message="concordance"
        , data=None
    )

    try:
        tokens = request.get_json()['tokens']
        collocate_list = Collocate(tokens)
        response['data'] = collocate_list
    except KeyError as err:
        response['status'] = ERROR
        response['message'] = f'{err} required'
        return jsonify(response), 400
    except TypeError as err:
        response['status'] = ERROR
        response['message'] = err
        return jsonify(response), 400

    return jsonify(response), 200


def File_validation(file_name):
    if not file_name.endswith('.txt'):
        return "accept .txt file only"
    return None


def Tokenizing(text):
    tokenizer = tokenize.RegexpTokenizer(r'\w+')
    tokens = tokenizer.tokenize(text)
    tokens = [token.lower() for token in tokens]
    return tokens


def Word_freq_counting(tokens):
    word_freq = FreqDist(tokens)
    word_freq_list = []

    for word in sorted(word_freq.items(), key=lambda t: (-t[1], t[0])):
        word_freq_list.append({
            "text": word[0]
            , "value": word[1]
        })

    return word_freq_list


def Concordance(tokens, keyword):
    concordance_idx = ConcordanceIndex(tokens)
    concordance_lines = concordance_idx.find_concordance(keyword, width=80)
    concordance_res = []
    idx = 0

    for c in concordance_lines:
        idx += 1
        concordance_res.append({
            "id": idx
            , "left": c[4]
            , "term": keyword
            , "right": c[5]
        })

    return concordance_res


def Collocate(tokens):
    collocation_finder = BigramCollocationFinder.from_words(tokens)
    collocation_list = sorted(collocation_finder.ngram_fd.items(), key=lambda t: (-t[1], t[0]))
    collocation_list_res = []
    idx = 0

    for col in collocation_list:
        idx += 1
        collocation_list_res.append({
            "id": idx
            , "term": col[0][0]
            , "collocate": col[0][1]
            , "count": col[1]
        })

    return collocation_list_res
