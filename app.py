from flask import Flask, render_template
import json

app = Flask(__name__)

# 캐러셀을 활성화할 페이지 번호 리스트
CAROUSEL_SLIDES = {1:2, 4: 2, 15: 2}

# 페이지별 슬라이드 이미지 경로를 JSON으로 관리
with open('static/data/archive_images.json', encoding='utf-8') as f:
    ARCHIVE_IMAGES = json.load(f)

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
    # slide_count → enable_carousel 플래그 계산
    slide_count    = CAROUSEL_SLIDES.get(num, 0)
    enable_carousel = slide_count > 0

    return render_template(
        f'archive/page{num}.html',
        current_page=num,
        total_pages=total_pages,
        enable_carousel=enable_carousel,
        slide_count=slide_count
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