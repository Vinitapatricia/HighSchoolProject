from flask_login import UserMixin

from project import db, login_manager

@login_manager.user_loader
def load_user(user_id):
	return User.query.get(int(user_id))

# create table
class User(db.Model, UserMixin):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(30), unique=True, nullable=False)
	email = db.Column(db.String(256), nullable=False)
	password = db.Column(db.String(256), nullable=False)
	level = db.Column(db.Integer, nullable=False)
	profile = db.Column(db.String(256), nullable=False)
	current_score = db.Column(db.Integer, nullable=False)
	highest_score = db.Column(db.Integer, nullable=False)
	damage_potion = db.Column(db.Integer, nullable=False)
	health_potion = db.Column(db.Integer, nullable=False)
	defend_potion = db.Column(db.Integer, nullable=False)
	coin = db.Column(db.Integer, nullable=False)

	rabbit_char = db.Column(db.Boolean, nullable=False)
	dino_char = db.Column(db.Boolean, nullable=False)
	

	def __repr__(self):
		return f"User({self.username} - {self.email})"
