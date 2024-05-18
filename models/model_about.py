import sqlalchemy.exc
from sqlalchemy import desc

from sqlalchemy.sql import func, insert
from extensions import db


class Abouts(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, default="", nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


def Add_new_content(content):
    err_msg = 'error add new content:'

    try:
        db.session.add(Abouts(content=content))
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None


def Get_first_content():
    err_msg = 'error get content:'

    try:
        curr_content = Abouts.query.order_by(desc(Abouts.created_at)).first()
        if curr_content is None:
            return None, "content not found"

        return curr_content, None
    except sqlalchemy.exc.OperationalError as err:
        return None, f'{err_msg} {err}'
    except sqlalchemy.exc.MultipleResultsFound as err:
        return None, f'{err_msg} {err}'
    except sqlalchemy.exc.NoResultFound as err:
        return None, None


def Update_current_content(current_content):
    err_msg = 'error update current content:'

    try:
        current_content.verified = True
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None
