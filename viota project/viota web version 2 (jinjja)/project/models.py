from project import db
from datetime import datetime

# FLASK ORM - SQA;chemy Object Relation Model (ORM)
class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(100), unique=True, nullable=False)
	email = db.Column(db.String(200), unique=True, nullable=False)
	# image_file = db.Column(db.String(100), nullable=False, default='default.jpg')
	password = db.Column(db.String(100), nullable=False)
