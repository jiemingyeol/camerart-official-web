from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def intro():
    # 전체 Archive 페이지 수 제공
    return render_template('intro.html', total_pages=15)

@app.route('/now')
def now():
    return render_template('now/index.html', total_pages=15)

@app.route('/now/works')
def works():
    return render_template('now/works_detail.html', total_pages=15)

@app.route('/archive/<int:num>')
def archive_page(num):
    total_pages = 15  # 실제 전체 페이지 수
    # 현재 페이지 번호와 전체 페이지 수를 템플릿에 전달
    return render_template(
        f'archive/page{num}.html',
        current_page=num,
        total_pages=total_pages
    )

@app.route("/about")
def about():
    with open("static/data/history.json", encoding="utf-8") as f:
        history_data = json.load(f)
    # 전체 페이지 수도 전달
    return render_template(
        "about.html",
        history=history_data,
        total_pages=15
    )

if __name__ == '__main__':
    app.run(debug=True)
