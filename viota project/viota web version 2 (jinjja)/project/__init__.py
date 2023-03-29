from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from .forms import RegistrationForm, LoginForm

from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ILOVEYOU3000'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
db.create_all()

from project import routes