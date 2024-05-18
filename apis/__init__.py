from flask import Blueprint

mainRouter = Blueprint("main_router", __name__)
authRouter = Blueprint("auth_router", __name__)
corpusRouter = Blueprint("corpus_router", __name__)
ntlkRouter = Blueprint("ntlk_router", __name__)
userRouter = Blueprint("user_router", __name__)
tokenRouter = Blueprint("token_router", __name__)
aboutRouter = Blueprint("about_router", __name__)