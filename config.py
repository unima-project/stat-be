from os import getenv


def Config_db(app):
    # setup database
    db_user = getenv('DB_USER')
    db_pass = getenv("DB_PASS")
    db_host = getenv("DB_HOST")
    db_name = getenv("DB_NAME")

    db_uri = f'mysql://{db_user}:{db_pass}@{db_host}/{db_name}'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
