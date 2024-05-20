from apis.controllers.controllers_theme import (
    Get_theme
    , Update_theme
    , Add_theme
)
from apis import themeRouter
from middlewares.middleware_authentication import Token_authentication


@themeRouter.route('/themes', methods=['GET'])
def Theme_get():
    return Get_theme()


@themeRouter.route('/themes/update', methods=['PUT'])
@Token_authentication
def Theme_update(user_id):
    return Update_theme(user_id)


@themeRouter.route('/themes/add', methods=['POST'])
@Token_authentication
def Theme_add(user_id):
    return Add_theme(user_id)
