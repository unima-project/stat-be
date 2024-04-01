import sqlalchemy.exc

from app import db
from sqlalchemy.sql import func
from utils.util_security import Generate_hash
from utils.util_validation import Validate_email
from models.model_common import USER_ACTIVE, USER_MEMBER


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_type = db.Column(db.Integer, nullable=False, default=USER_MEMBER)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    no_ktp = db.Column(db.String(50), nullable=True)
    no_hp = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(150), nullable=False)
    reason = db.Column(db.String(100), nullable=True)
    status = db.Column(db.Integer, nullable=False, default=USER_ACTIVE)

    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


def User_data_validation(user):
    for key in user:
        value = user[key]
        if value == "" or value is None:
            return f'{key} required'

    valid_email = Validate_email(user['email'])
    if not valid_email:
        return "email is not valid"

    return None


def Add_new_user(new_user):
    err_msg = f'error add new user:'
    try:
        err = User_data_validation(new_user)
        if err:
            return err

        pw_hash, err = Generate_hash(new_user['password'])
        if err:
            return err

        user = Users(
            user_type=new_user['user_type']
            , name=new_user['name']
            , email=new_user['email']
            , password=pw_hash
            , no_ktp=new_user['no_ktp']

            , no_hp=new_user['no_hp']
            , address=new_user['address']
            , reason=new_user['reason']
            , status=new_user['status']
        )

        db.session.add(user)
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} email already registered'

    return None


def View_all_user():
    err_msg = f'error view all user:'
    users = []

    try:
        user_list = Users.query.all()

        for user in user_list:
            users.append({
                "id": user.id
                , "user_type": user.user_type
                , "name": user.name
                , "email": user.email
                , "no_ktp": user.no_ktp

                , "no_hp": user.no_hp
                , "address": user.address
                , "reason": user.reason
                , "status": user.status
            })
    except sqlalchemy.exc.OperationalError as err:
        return None, f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return None, f'{err_msg} {err}'
    except:
        return None, 'unknown error view all user'

    return users, None


def Update_current_user(current_user):
    err_msg = f'error update current user:'

    try:
        current_user.verified = True
        db.session.commit()
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None


def Delete_current_user(current_user, tx):
    err_msg = f'error delete current user:'

    try:
        tx.delete(current_user)
    except sqlalchemy.exc.OperationalError as err:
        return f'{err_msg} {err}'
    except sqlalchemy.exc.IntegrityError as err:
        return f'{err_msg} {err}'

    return None


def Find_user_by_custom_filter(**filters):
    try:
        curr_user = Users.query.filter_by(**filters).first()
        if curr_user is None:
            return None, "user not found"

        return curr_user, None
    except:
        return None, "error find user by custom filter"


def Find_user_by_id(user_id):
    try:
        curr_user = Users.query.get(user_id)
        if curr_user is None:
            return None, "user not found"

        return curr_user, None
    except:
        return None, "error find user by id"
