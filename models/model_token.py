from app import db
from sqlalchemy.sql import func


class Tokens(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.JSON, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


def InputToken(token, user_id):
    try:
        new_token = Tokens(
            token=token
            , user_id=user_id
        )

        db.session.add(new_token)
        db.session.commit()
    except:
        return "error"


def FindByUserID(user_id):
    tokens = Tokens.query.filter_by(user_id=user_id)
    return tokens


def FindByTokenID(token_id):
    tokens = Tokens.query.get(token_id)
    return tokens
