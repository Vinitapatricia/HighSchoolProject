import os
import secrets
from PIL import Image

from flask import render_template, url_for, redirect, flash, get_flashed_messages, jsonify, request,make_response

from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from project import app, db
from project.forms import RegistrationForm, LoginForm, UpdateProfileForm
from project.models import User

@app.route("/")
@app.route("/home")
def index():
	return render_template("index.html")

@app.route("/game")
@login_required
def game():
	return render_template("game.html")

@app.route("/register", methods=["GET", "POST"])
def register():
	form = RegistrationForm()
	acc = False

	if form.validate_on_submit():
		# db.create_all()
		cnt = 0
			
		a = User.query.filter(User.email == form.email.data ).count()
		
		if(a == 3):
			return render_template("register.html", form=form ,acc=acc, full = True)

		hashed_passwd = generate_password_hash(form.password.data, method ='pbkdf2:sha256', salt_length=16)

		user = User(username=form.username.data,
					email=form.email.data,
					password=hashed_passwd,
					level = 1,
					profile = "default",
					current_score = 0,
					highest_score = 0,
					damage_potion = 0,
					health_potion =0,
					defend_potion = 0,
					coin = 0,
					rabbit_char = False,
					dino_char = False)

		db.session.add(user)
		db.session.commit()
		acc= True
		return redirect(url_for("login"))

	return render_template("register.html", form=form ,acc=acc, full = False)

@app.route("/login", methods=['GET', 'POST'])
def login():
	form = LoginForm()

	if form.validate_on_submit():
		user = User.query.filter(User.username == form.username.data ).first()
		if user and check_password_hash(user.password, form.password.data):
			login_user(user, remember=form.remember.data)
			
			return redirect(url_for("game"))


	return render_template('login.html', title='Login', form = form)



@login_required
@app.route("/get_user")
def get_user():
	data = {"username" :current_user.username, 
			"level" :current_user.level, 
			"profile" :current_user.profile, 
			"current_score" : current_user.current_score, 
			"highest_score" : current_user.highest_score, 
			"damage_potion" : current_user.damage_potion, 
			"health_potion" : current_user.health_potion, 
			"defend_potion" : current_user.defend_potion, 
			"coin" : current_user.coin, 
			"rabbit_char" : current_user.rabbit_char, 
			"dino_char" : current_user.dino_char,
			"ip" : request.remote_addr}
	return jsonify(data)

@login_required
@app.route("/update_coin", methods=['POST'])
def update_coin():
	new = request.form.get("newCoin")
	current_user.coin = new
	db.session.commit()
	return jsonify({'status' : True})

@login_required
@app.route("/update_level", methods=['POST'])
def update_level():
	new = request.form.get("newLevel")
	current_user.level = new
	db.session.commit()
	return jsonify({'status' : True})

@login_required
@app.route("/update_damage_potion", methods=['POST'])
def update_damage_potion():
	new = request.form.get("new_p")
	current_user.damage_potion = new
	db.session.commit()
	return jsonify({'status' : True})

@login_required
@app.route("/update_defend_potion", methods=['POST'])
def update_defend_potion():
	new = request.form.get("new_p")
	current_user.defend_potion = new
	db.session.commit()
	return jsonify({'status' : True})

@login_required
@app.route("/update_health_potion", methods=['POST'])
def update_health_potion():
	new = request.form.get("new_p")
	current_user.health_potion = new
	db.session.commit()
	return jsonify({'status' : True})
@login_required
@app.route("/update_rabbit_char", methods=['POST'])
def update_rabbit_char():
	new = request.form.get("new_p")
	current_user.rabbit_char = new_p
	db.session.commit()
	return jsonify({'status' : True})

@login_required
@app.route("/update_dino_char", methods=['POST'])
def update_dino_char():
	new = request.form.get("new_p")
	current_user.dino_char = new_p
	db.session.commit()
	return jsonify({'status' : True})

@login_required
@app.route("/update_profile", methods=['POST'])
def update_profile():
	new = request.form.get("new_p")
	current_user.profile = new
	db.session.commit()
	return jsonify({'status' : True})

# @login_required
@app.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('login'))