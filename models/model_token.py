import sqlalchemy.exc

from sqlalchemy.sql import func, insert
from extensions import db


class Tokens(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(50), unique=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


def Add_new_tokens(token_list):
    err_msg = f'error add new token:'

    try:
        data = [{"token": token} for token in token_list]
        insert_statement = (insert(Tokens)
                            .values(data)
                            .prefix_with("IGNORE"))
        db.session.execute(insert_statement)
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} token already registered'

    return None


def View_all_token():
    err_msg = f'error view all token:'

    try:
        token_list = Tokens.query.order_by(Tokens.token).all()
        tokens = [{
            "id": token.id
            , "token": token.token
            , "created_at": token.created_at
        } for token in token_list]
    except sqlalchemy.exc.OperationalError as err:
        return None, f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return None, f'{err_msg} {err}'
    except AttributeError as err:
        return None, f'{err_msg} {err}'

    return tokens, None


def Find_token_by_id(token_id):
    try:
        curr_token = Tokens.query.get(token_id)
        if curr_token is None:
            return None, "token not found"

        return curr_token, None
    except:
        return None, "error find token by id"


def Delete_current_token(current_token):
    err_msg = 'error delete current token:'

    try:
        db.session.delete(current_token)
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None
