from nltk import tokenize, FreqDist, ngrams
from nltk.text import ConcordanceIndex
from nltk.collocations import BigramCollocationFinder
from apis.controllers.controller_common import Response, ERROR, SUCCESS
from flask import jsonify, request
from collections import Counter


def Get_tokens():
    response = Response(
        status=SUCCESS
        , message="tokenizing"
        , data=None
    )

    try:
        text = request.get_json()['text']
        tokens = Tokenizing(text)

        response['data'] = {
            "token": tokens
            , "corpus": text
        }
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

    file_name = ""
    f = None

    try:
        f = request.files['text']
        file_name = f.filename

        err = File_validation(file_name)
        if err:
            response['status'] = ERROR
            response['message'] = err
            return jsonify(response), 400

        f.save(f.filename)

        text = open(f.filename, "r",  encoding='unicode_escape')
        joined_text = "".join(text.readlines())
        tokens = Tokenizing(joined_text)

        response['message'] = f'{f.filename} successfully uploaded'
        response['data'] = {
            "token": tokens
            , "corpus": joined_text
        }
    except:
        err = "error uploading file"
        response['status'] = ERROR
        response['message'] = err

    try:
        f.close()
    except:
        print(f'failed to close/ remove file {file_name}')

    if err:
        return jsonify(response), 400
    else:
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
        width = request.get_json()['width']
        tokens = request.get_json()['tokens']
        concordance_lines = Concordance(tokens, width)
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


def Get_ngram_list():
    response = Response(
        status=SUCCESS
        , message="N-Gram list"
        , data=None
    )

    try:
        tokens = request.get_json()['tokens']
        size = request.get_json()['size']
        ngram_list = Ngrams(tokens, size)
        response['data'] = ngram_list
    except KeyError as err:
        response['status'] = ERROR
        response['message'] = f'{err} required'
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


def Remove_duplicate(arr_list):
    return list(dict.fromkeys(arr_list))


def Concordance(tokens, width):
    concordance_idx = ConcordanceIndex(tokens)

    concordance_res = []
    idx = 0

    for token in sorted(Remove_duplicate(tokens)):
        concordance_lines = concordance_idx.find_concordance(token, width=width)
        for c in concordance_lines:
            idx += 1
            concordance_res.append({
                "id": idx
                , "left": c[4]
                , "term": token
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


def Ngrams(token, size):
    ngram_list = ngrams(token, size)
    ngram_counter = Counter(ngram_list)
    ngram_counter_sorted = sorted(ngram_counter.items(), key=lambda t: (-t[1], t[0]))
    ngram_result_list = []

    idx = 0

    for ngram_type, frequency in ngram_counter_sorted:
        idx += 1
        ngram_result_list.append({
            "id": idx
            , "type": ngram_type
            , "frequency": frequency
        })

    return ngram_result_list
