import os
import secrets
from PIL import Image

from flask import render_template, url_for, redirect, flash, get_flashed_messages

from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from project import app, db
from project.forms import RegistrationForm, LoginForm, UpdateProfileForm, QuantityProduct, CartForm
from project.models import User, Product, Cart, Wishlist

@app.route("/")
@app.route("/home")
def index():
	return render_template("index.html")


@app.route("/product", methods=["GET", "POST"])
def product():
	return render_template("product.html", products = Product.query.all())


@app.route("/<product_id>/productdetail", methods=["GET", "POST"])
@login_required
def product_detail(product_id):
	form = QuantityProduct()
	product = Product.query.filter(Product.id == product_id ).first()

	check = Cart.query.filter(Cart.name == product.name, current_user.id ==  Cart.user_id ).first()
	wish = Wishlist.query.filter(Wishlist.product_id == product_id, current_user.id ==  Wishlist.user_id ).first()
	add = False

	if form.validate_on_submit():
		if check==None:
			item = Cart(name=product.name, price=product.price, image= product.image, quantity=form.quantity.data, product_id=product_id, user_id=current_user.id)
			db.session.add(item)
			db.session.commit()
			add = True

			return render_template("product-detail.html", form=form, product=product, add=add, wish=wish)

		quan = check.quantity +form.quantity.data
		check.quantity = quan
		db.session.commit()
		add = True

	return render_template("product-detail.html", form=form, product=product, add=add, wish=wish)

@app.route("/<product_id>/wishlist", methods=['GET', 'POST'])
@login_required
def wishlist(product_id):
	a = product_id

	wish = Wishlist.query.filter(Wishlist.product_id == product_id, current_user.id ==  Wishlist.user_id ).first()
	
	print(wish)
	
	if wish == None:
		product = Product.query.filter(Product.id == product_id).first()
		item = Wishlist(name=product.name, price=product.price, image= product.image, product_id=product_id, user_id=current_user.id)
		db.session.add(item)
		db.session.commit()

	else:
		product = Wishlist.query.filter(Wishlist.product_id == product_id, current_user.id ==  Wishlist.user_id ).delete()
		db.session.commit()

	return redirect(url_for('product_detail', product_id=a))

@app.route("/wishlist", methods=['GET', 'POST'])
@login_required
def wishlist_page():
	products = Wishlist.query.filter(current_user.id ==  Wishlist.user_id ).all()
	print(products)
	return render_template('wishlist.html', products=products)

@app.route("/register", methods=["GET", "POST"])
def register():
	form = RegistrationForm()
	acc = False

	if form.validate_on_submit():

		hashed_passwd = generate_password_hash(form.password.data, method ='pbkdf2:sha256', salt_length=16)

		user = User(username=form.username.data, email=form.email.data, password=hashed_passwd)
		db.session.add(user)
		db.session.commit()
		acc= True
		return render_template("register.html", form=form ,acc=acc)

	return render_template("register.html", form=form, acc=acc)

@app.route("/login", methods=['GET', 'POST'])
def login():
	form = LoginForm()

	if form.validate_on_submit():
		user = User.query.filter(User.username == form.username.data ).first()
		if user and check_password_hash(user.password, form.password.data):
			login_user(user, remember=form.remember.data)
			return redirect((url_for('index')))


	return render_template('login.html', title='Login', form = form)

@app.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('index'))

def save_picture(form_picture):
	file_name, file_ext = os.path.splitext(form_picture.filename)
	random_name = secrets.token_hex(16)
	picture_name = random_name+file_ext

	picture_path = os.path.join(app.root_path, 'static/profile_pic', picture_name)

	image = Image.open(form_picture)
	image.thumbnail((125,125))
	image.save(picture_path)

	return picture_name

@app.route("/profile", methods=['GET', 'POST'])
@login_required
def profile():
	form = UpdateProfileForm()
	if form.validate_on_submit():

		current_user.username = form.username.data
		current_user.email = form.email.data

		if form.picture.data:
			picture_file = save_picture(form.picture.data)
			current_user.image_file = picture_file

		db.session.commit()
		flash('Your account has been updated!', 'success')

	image_file = url_for('static', filename='profile_pic/'+current_user.image_file)
	form.username.data = current_user.username
	form.email.data = current_user.email
	return render_template('profile.html', image_file=image_file, form=form)

@app.route("/cart", methods=['GET', 'POST'])
@login_required
def cart():
	form = CartForm()
	products = Cart.query.filter( current_user.id ==  Cart.user_id ).all()
	pr = 0
	# print(form.quantity.data)
	for product in products:
		pr += product.price*product.quantity

	return render_template('cart.html', products=products, pr =pr, form=form)

@app.route("/<product_id>/remove", methods=['GET', 'POST'])
@login_required
def remove(product_id):
	remover = Cart.query.filter(Cart.product_id == product_id, current_user.id ==  Cart.user_id).delete()
	db.session.commit()
	return redirect(url_for('cart'))


@app.route("/<product_id>/addmore", methods=['GET', 'POST'])
@login_required
def addmore(product_id):
	add = Cart.query.filter(Cart.product_id == product_id, current_user.id ==  Cart.user_id).first()
	add.quantity += 1
	db.session.commit()

	return redirect(url_for('cart'))

@app.route("/<product_id>/reduce", methods=['GET', 'POST'])
@login_required
def reduce(product_id):
	add = Cart.query.filter(Cart.product_id == product_id, current_user.id ==  Cart.user_id).first()
	add.quantity -= 1
	db.session.commit()

	return redirect(url_for('cart'))