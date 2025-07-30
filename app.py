from flask import Flask, render_template
import json
import os

app = Flask(__name__)

CAROUSEL_SLIDES = {1: 2, 4: 2, 15: 2}

# JSON 파일 로드 함수
def load_archive_data():
    with open(os.path.join("static", "data", "archive.json"), encoding="utf-8") as f:
        return json.load(f)

@app.route('/')
def intro():
    archive_data = load_archive_data()
    total_pages = len(archive_data)
    return render_template('intro.html', total_pages=total_pages)

@app.route('/now')
def now():
    archive_data = load_archive_data()
    exhibition = archive_data.get("16", {})
    total_pages = len(archive_data)
    return render_template('archive/16/index.html',
                           current_page=16,
                           total_pages=total_pages,
                           exhibition=exhibition)

@app.route('/now/works')
def now_works():
    archive_data = load_archive_data()
    exhibition = archive_data.get("16", {})
    total_pages = len(archive_data)
    return render_template('archive/16/works_detail.html',
                           current_page=16,
                           total_pages=total_pages,
                           exhibition=exhibition)

@app.route('/archive/<int:num>')
def archive_page(num):
    archive_data = load_archive_data()
    exhibition = archive_data.get(str(num), {})
    total_pages = len(archive_data)
    slide_count = CAROUSEL_SLIDES.get(num, 0)
    enable_carousel = slide_count > 0

    return render_template(
        f'archive/{num}/index.html',
        current_page=num,
        total_pages=total_pages,
        enable_carousel=enable_carousel,
        slide_count=slide_count,
        exhibition=exhibition
    )

@app.route('/archive/<int:num>/works')
def archive_works(num):
    archive_data = load_archive_data()
    exhibition = archive_data.get(str(num), {})
    total_pages = len(archive_data)
    return render_template(
        f'archive/{num}/works_detail.html',
        current_page=num,
        total_pages=total_pages,
        exhibition=exhibition
    )

@app.route("/about")
def about():
    with open("static/data/history.json", encoding="utf-8") as f:
        history_data = json.load(f)
    return render_template("about.html",
                           history=history_data,
                           total_pages=len(load_archive_data()))

if __name__ == '__main__':
    app.run(debug=True)
