from flask_login import UserMixin

from project import db, login_manager

@login_manager.user_loader
def load_user(user_id):
	# return User.query.filter_by(id=int(user_id))
	return User.query.get(int(user_id))

# create table
class User(db.Model, UserMixin):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(30), unique=True, nullable=False)
	email = db.Column(db.String(256), unique=True, nullable=False)
	password = db.Column(db.String(256), nullable=False)
	image_file = db.Column(db.String(256), nullable=False, default= 'default.jpg')

	carts_user = db.relationship('Cart', backref='cart_owner', lazy=True)
	wishes_user = db.relationship('Wishlist', backref='owner_wish', lazy=True)

	def __repr__(self):
		return f"User({self.username} - {self.email})"

class Product(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.Text, nullable=False)
	price = db.Column(db.Integer, nullable=False)
	image = db.Column(db.String(256), nullable=False)
	quantity = db.Column(db.Integer, nullable=False)
	desc = db.Column(db.Text, nullable=False)

	carts = db.relationship('Cart', backref='in_cart', lazy=True)
	wishes = db.relationship('Wishlist', backref='in_wishes', lazy=True)



class Cart(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.Text, nullable=False)
	price = db.Column(db.Integer, nullable=False)
	image = db.Column(db.String(256), nullable=False)
	quantity = db.Column(db.Integer, nullable=False)

	product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
	


class Wishlist(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.Text, nullable=False)
	price = db.Column(db.Integer, nullable=False)
	image = db.Column(db.String(256), nullable=False)

	product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)