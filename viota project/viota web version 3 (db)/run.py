from flask import Flask, render_template, url_for, redirect, flash

from flask import render_template, url_for, redirect, flash
from forms import RegistrationForm, LoginForm

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = '5fc9c06ad13b4b9a3d12aa9a5825234a84cbd67f66660014cd8a0657284b94b4'	

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# create table

class User(db.Model):
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
	
	

products = [
	{
		'image' : 'product-1.jpg',
		'name' : 'Soft Funiture',
		'price' : '$150'
	},
	{
		'image' : 'product-2.jpg',
		'name' : 'Soft Funiture',
		'price' : '$150'
	},
	{
		'image' : 'product-1.jpg',
		'name' : 'Soft Funiture',
		'price' : '$150'
	},
	{
		'image' : 'product-2.jpg',
		'name' : 'Soft Funiture',
		'price' : '$150'
	}
]

@app.route("/")
@app.route("/home")
def index():
	return render_template("index.html")


@app.route("/product", methods=["GET", "POST"])
def product():
	return render_template("product.html", products = products)

@app.route("/register", methods=["GET", "POST"])
def register():
	form = RegistrationForm()

	if form.validate_on_submit():
		flash(f"Account created for {form.username.data}!", "success")

	return render_template("register.html", form=form)

@app.route("/login")
def login():
	form = LoginForm()
	return render_template('login.html', form=form)

if __name__ == '__main__':
	app.run(debug=True)


