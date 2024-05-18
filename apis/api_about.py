from apis.controllers.controllers_about import (
    Get_about
    , Update_content
    , Add_content
)
from apis import aboutRouter
from middlewares.middleware_authentication import Token_authentication


@aboutRouter.route('/abouts', methods=['GET'])
def About_get():
    return Get_about()


@aboutRouter.route('/abouts/update', methods=['PUT'])
@Token_authentication
def About_update(user_id):
    return Update_content(user_id)


@aboutRouter.route('/abouts/add', methods=['POST'])
@Token_authentication
def About_add(user_id):
    return Add_content(user_id)
