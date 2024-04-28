# simple-text-analysis-tool

### pull code from git remote repository
```commandline
> git init
> git remote add origin https://github.com/michaelwp/simple-text-analysis-tool.git
> git pull origin main
```

### setup MySQL Database
```commandline
> mysql -uroot -p
> CREATE DATABASE stat;
> GRANT ALL PRIVILEGES ON stat.* TO 'root'@'localhost';
```

### setup env config
- create file with name `.env`
- add these env items (<i>as listed in `env_example`</i>) and replace the values with your own. <br />
<i>example</i> :
```text
PORT=5000
SECRET_KEY=rahasia

DB_USER=root
DB_PASS=password
DB_HOST=localhost
DB_NAME=stat

APPLICATION_COOKIE_DOMAIN=localhost

ROOT_DEFAULT_NAME=root
ROOT_DEFAULT_PASS=password
ROOT_DEFAULT_EMAIL=root@stat.com

...
...
...
```

### setup user root / admin
- you can adjust this in `model_admin.py` <br />
default `name`, `pass` & `email` according to env config <br />
(`ROOT_DEFAULT_NAME`, `ROOT_DEFAULT_PASS`, `ROOT_DEFAULT_EMAIL`)
```commandline
> make create-admin
```

### setup & run apps
```commandline
> python -m venv ./venv
> source venv/bin/activate 
> make init
> make run
```

### additional requirements
- for ubuntu os, addtional libraries required before `pip requirements`   
```commandline
> sudo apt-get install python3-dev default-libmysqlclient-dev build-essential pkg-config
```
