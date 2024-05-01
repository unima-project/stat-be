from apis.controllers.controller_user import (
    Create_new_user
, Get_all_user_list
, Update_user
, Delete_user
, Update_user_password
, Reset_user_password
, Get_current_user
)

from middlewares.middleware_authentication import Token_authentication, Token_admin_authentication
from apis import userRouter


@userRouter.route('/users/register', methods=['POST'])
@Token_admin_authentication
def User_register(user_id):
    return Create_new_user(user_id)


@userRouter.route('/users/list', methods=['GET'])
@Token_admin_authentication
def User_list(user_id):
    return Get_all_user_list(user_id)


@userRouter.route('/users/update', methods=['PUT'])
@Token_admin_authentication
def User_update(user_id):
    return Update_user(user_id)


@userRouter.route('/users/delete', methods=['DELETE'])
@Token_admin_authentication
def User_delete(user_id):
    return Delete_user(user_id)


@userRouter.route('/users/password/update', methods=['PATCH'])
@Token_authentication
def User_update_password(user_id):
    return Update_user_password(user_id)


@userRouter.route('/users', methods=['GET'])
@Token_authentication
def User_current(user_id):
    return Get_current_user(user_id)


@userRouter.route('/users/password/reset', methods=['PATCH'])
@Token_admin_authentication
def User_reset_password(user_id):
    return Reset_user_password(user_id)
