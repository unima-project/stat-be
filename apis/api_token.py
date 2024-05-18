from apis.controllers.controllers_token import (
    Get_all_token_list
    , Delete_token
)
from apis import tokenRouter
from middlewares.middleware_authentication import Token_authentication


@tokenRouter.route('/tokens', methods=['GET'])
def Token_get_all_token_list():
    return Get_all_token_list()


@tokenRouter.route('/tokens/delete', methods=['DELETE'])
@Token_authentication
def Token_delete(user_id):
    return Delete_token(user_id)
