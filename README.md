# simple-text-analysis-tool

### pull code from git remote repository
```commandline
> git init
> git remote add origin https://github.com/michaelwp/simple-text-analysis-tool.git
> git pull origin main
```

### setup backend (http://localhost:5000)
```commandline
> python -m venv ./venv
> source venv/bin/activate 
> pip install -r requirements.txt
> python -m flask --app app run
```

### setup Client (http://localhost:3000)
```commandline
> cd client
> npm i --force 
> npm start
```

### setup MySQL v.8.3.0 Database
```commandline
> mysql -uroot -p
> CREATE DATABASE unima;
> GRANT ALL PRIVILEGES ON unima.* TO 'root'@'localhost';
```

![home](./home.png "home")
![tool](./tool.png "tool")

