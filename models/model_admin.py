import pymysql
from os import getenv
from bcrypt import hashpw, gensalt
from dotenv import load_dotenv
from model_common import USER_ADMIN, USER_ACTIVE

load_dotenv("../.env")

db_user = getenv('DB_USER')
db_pass = getenv("DB_PASS")
db_host = getenv("DB_HOST")
db_name = getenv("DB_NAME")

conn = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_pass,
    db=db_name,
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)


def Generate_hash(password):
    try:
        pw = password.encode('utf-8')
        salt = gensalt(12)

        pw_hash = hashpw(pw, salt)
        return pw_hash, None
    except ValueError as err:
        return "", f"error generate hash: {err}"
    except:
        return "", "error generate hash"


passHash, err = Generate_hash(getenv("ROOT_DEFAULT_PASS"))
if err:
    print(err)

new_user = {
    "user_type": USER_ADMIN
    , "name": getenv("ROOT_DEFAULT_NAME")
    , "email": getenv("ROOT_DEFAULT_EMAIL")
    , "password": passHash
    , "no_ktp": "123456"

    , "no_hp": "08123"
    , "address": "alamat"
    , "reason": "alasan"
    , "status": USER_ACTIVE
}

try:
    with conn.cursor() as cursor:
        sql = "INSERT INTO " \
              "`users` (`user_type`, `name`, `email`, `password`, `no_ktp`, `no_hp`, `address`, `reason`, `status`) " \
              "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(
            sql,
            (
                new_user["user_type"]
                , new_user["name"]
                , new_user["email"]
                , new_user["password"]
                , new_user["no_ktp"]

                , new_user["no_hp"]
                , new_user["address"]
                , new_user["reason"]
                , new_user["status"]
            )
        )

    conn.commit()
    print("Root user inserted successfully")
except pymysql.err.IntegrityError as err:
    print(f'error insert root user: {err}')
finally:
    conn.close()
