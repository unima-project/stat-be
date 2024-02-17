ERROR = "ERROR"
SUCCESS = "SUCCESS"


def Response(status, message, data):
    return {
        "status": status
        , "message": message
        , "data": data
    }
