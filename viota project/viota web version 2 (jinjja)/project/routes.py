from flask import render_template, url_for, redirect, flash

from project import app, db, bcrypt
from project.models import User
from project.forms import RegistrationForm, LoginForm

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
		hashed_password =bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		user = User(username=form.username.data, email=form.email.data, password=hashed_password)
		db.session.add(user)
		db.session.commit()
		return redirect(url_for('index'))

	return render_template("register.html", form=form)

@app.route("/login")
def login():
	form = LoginForm()
	return render_template('login.html', form=form)