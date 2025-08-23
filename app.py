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
    return render_template('intro.html', total_pages=total_pages, current_page='intro')

@app.route('/now')
def now():
    archive_data = load_archive_data()
    total_pages = len(archive_data)-1
    current_page = 16
    exhibition = archive_data.get(str(current_page), {})
    has_carousel = "poster_carousel" in exhibition["images"]
    return render_template('archive/index.html',
        current_page=current_page,
        total_pages=total_pages,
        exhibition=exhibition,
        has_carousel=has_carousel,
        current_section='now'
    )

@app.route('/now/works')
def now_works():
    archive_data = load_archive_data()
    total_pages = len(archive_data)-1
    current_page = 15
    exhibition = archive_data.get(str(current_page), {})
    return render_template('archive/works_detail.html',
        current_page=current_page,
        total_pages=total_pages,
        exhibition=exhibition,
        current_section='now'
    )

@app.route('/archive/<int:num>')
def archive_page(num):
    archive_data = load_archive_data()
    total_pages = len(archive_data)-1
    exhibition = archive_data[str(num)]
    has_carousel = "poster_carousel" in exhibition["images"]
    return render_template(
        'archive/index.html',
        current_page=num,
        total_pages=total_pages,
        exhibition=exhibition,
        has_carousel=has_carousel,
        current_section='archive'
    )

@app.route('/archive/<int:num>/works')
def archive_works(num):
    archive_data = load_archive_data()
    total_pages = len(archive_data)-1
    exhibition = archive_data.get(str(num), {})
    return render_template(
        f'archive/works_detail.html',
        current_page=num,
        total_pages=total_pages,
        exhibition=exhibition,
        current_section='archive'
    )

@app.route("/about")
def about():
    archive_data = load_archive_data()
    total_pages = len(archive_data)-1
    with open("static/data/history.json", encoding="utf-8") as f:
        history_data = json.load(f)
    # 전체 페이지 수도 전달
    return render_template(
        "about.html",
        history=history_data,
        total_pages=total_pages,
        current_page='about'
    )

if __name__ == '__main__':
    app.run(debug=True)
