import sqlalchemy.exc
from sqlalchemy import desc

from sqlalchemy.sql import func, insert
from extensions import db


class Themes(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    color = db.Column(db.Text, default="", nullable=False)
    status = db.Column(db.Integer, default=1, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


def Add_new_theme(color):
    err_msg = 'error add new theme:'

    try:
        db.session.add(Themes(color=color))
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None


def Get_first_theme():
    try:
        current_theme = Themes.query.order_by(desc(Themes.created_at)).first()
        if current_theme is None:
            return None, "theme not found"
    except sqlalchemy.exc.IntegrityError as err:
        return None, err
    except sqlalchemy.exc.NoResultFound as err:
        return None, err

    return current_theme, None


def Update_current_theme(current_theme):
    err_msg = 'error update current theme:'

    try:
        current_theme.verified = True
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None
