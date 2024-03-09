from apis.controllers.controller_user import (
    Create_new_user
    , Get_all_user_list
    , Update_user
    , Delete_user
)
from app import app


@app.route('/users/register', methods=['POST'])
def User_register():
    return Create_new_user()


@app.route('/users', methods=['GET'])
def User_list():
    return Get_all_user_list()


@app.route('/users/update', methods=['POST'])
def User_update():
    return Update_user()


@app.route('/users/delete', methods=['GET'])
def User_delete():
    return Delete_user()
