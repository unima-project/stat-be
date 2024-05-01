from bcrypt import hashpw, checkpw, gensalt
import jwt
import secrets
import os

secret_key = os.getenv("SECRET_KEY")
db_user = os.getenv('DB_USER')

def Generate_hash(password):
    try:
        pw = password.encode('utf-8')
        salt = gensalt(12)

        pw_hash = hashpw(pw, salt)
        return pw_hash, None
    except ValueError as err:
        return "", f"error generate hash: {err}"
    except:
        return "", "error generate hash"


def Check_hash(password, pw_hash):
    try:
        pw = password.encode('utf-8')
        pwd_hash = pw_hash.encode('utf-8')

        is_match = checkpw(pw, pwd_hash)
        return is_match, None
    except ValueError as err:
        return False, f"error check hash: {err}"
    except:
        return False, "error check hash"


def Generate_jwt_token(payload):
    try:
        token = jwt.encode(payload=payload, key=secret_key, algorithm="HS256")
        return token, None
    except TypeError as err:
        return "", err


def Decode_jwt_token(jwt_token):
    try:
        payload = jwt.decode(jwt=jwt_token, key=secret_key, verify=True, algorithms=["HS256"])
        return payload, None
    except jwt.ExpiredSignatureError as err:
        return "", f"error decode jwt token: {err}"
    except jwt.exceptions.DecodeError as err:
        return "", f"error decode jwt token: {err}"
    except TypeError:
        return "", "error decode jwt token"


def Generate_random_password(length):
    return secrets.token_urlsafe(length)
