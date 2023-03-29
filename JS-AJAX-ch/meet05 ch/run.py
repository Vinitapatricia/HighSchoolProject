from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "<h1>ok</h1>"

app.run(debug=True)