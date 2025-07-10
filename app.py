from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def intro():
    return render_template('intro.html')

@app.route('/now')
def now():
    return render_template('now/index.html')

@app.route('/now/works')
def works():
    return render_template('now/works_detail.html')

@app.route('/archive/<int:num>')
def archive_page(num):
    return render_template(f'archive/page{num}.html')

@app.route("/about")
def about():
    with open("static/data/history.json", encoding="utf-8") as f:
        history_data = json.load(f)
    return render_template("about.html", history=history_data)

if __name__ == '__main__':
    app.run(debug=True)