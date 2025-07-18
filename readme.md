# Camerart 웹페이지 프로젝트

**카메랄트(Camerart)**는 전시 동아리로서, 뉴미디어와 예술, 비평적 사고를 기반으로 다양한 기획 전시를 운영합니다.  
이 웹사이트는 그룹의 전시 및 기록을 온라인으로 소개하기 위해 개발되었습니다.

---

## 🔧 개발 환경

- Python 3.x  
- Flask  
- HTML / CSS / JavaScript  
- Jinja2 (Flask 템플릿 엔진)  
- JSON 기반 데이터(`static/data/history.json`)  
- 폴더 기반 정적 리소스 관리 (데이터베이스 미사용)

---

## 📂 폴더 구조

    camerart_official_web/
    ├── app.py
    ├── .env
    ├── .gitignore
    ├── readme.md
    ├── requirements.txt
    ├── static/
    │   ├── css/
    │   │   ├── style.css
    │   │   ├── sidebar.css
    │   │   ├── archive.css
    │   │   └── about.css
    │   ├── js/
    │   │   ├── dragscroll.js
    │   │   ├── sidebar.js
    │   │   ├── archive.js
    │   │   ├── about.js
    │   │   └── intro.js
    │   ├── images/
    │   │   └── archive/
    │   │       ├── 1/
    │   │       │   ├── poster.jpg
    │   │       │   ├── install1.jpg
    │   │       │   └── ...
    │   │       └── 2/
    │   │           ├── poster1.jpg
    │   │           ├── poster2.jpg
    │   │           └── ...
    │   └── data/
    │       └── history.json
    └── templates/
        ├── layout.html
        ├── intro.html
        ├── now/
        │   ├── index.html
        │   └── works_detail.html
        ├── archive/
        │   ├── page1.html
        │   └── ... (page2.html ~ page15.html)
        └── about.html

---

## 🚀 주요 기능

### 공통
- **사이드바 내비게이션**  
  - NOW, ARCHIVE, ABOUT 메뉴 제공  
  - 햄버거 아이콘 클릭 시 열고 닫힘

### ARCHIVE
- **Ordinal 메뉴**: `1st`, `2nd`, `3rd`, ... 형식으로 표시 (Jinja 매크로 사용)  
- **현재 페이지 강조**: 보고 있는 페이지 메뉴에 밑줄 및 볼드 유지  
- **호버 밑줄**: Archive 서브메뉴 항목에 마우스 호버 시 밑줄 표시  
- **휠 내비게이션**: 왼쪽 포스터 영역(`.poster`, 또는 캐러셀 비활성 시)에서 마우스 휠로 이전/다음 페이지 이동 (부드러운 페이드 전환)  
- **캐러셀 기능**  
  - 특정 페이지(예: 2, 5)만 활성화 (`CAROUSEL_SLIDES` 딕셔너리와 `slide_count` 매핑 방식)  
  - `images/archive/<num>/poster1.jpg`, `poster2.jpg` 순서로 슬라이드 표시  
  - 이전/다음 버튼(`.prev`, `.next`)으로만 슬라이드 전환  
  - 스타일: `static/css/archive.css`  
  - 로직: `static/js/archive.js`
- **드래그 스크롤**  
  - Installation Views(`id="installScroll"`)와 Works 갤러리(`.works-gallery`)에 `dragscroll.js` 적용  
  - 마우스 클릭&드래그로 부드러운 좌우 스크롤 가능

### NOW
- **고정 포스터 + 스크롤 콘텐츠**  
  - 왼쪽에 포스터, 오른쪽에 Installation Views, Works, Funding 섹션  
  - Installation Views: 클릭&드래그 스크롤(`dragscroll.js`)  
  - Works: 클릭 시 상세 페이지로 이동 (이미지와 설명 고정)  
  - Funding: 이미지 및 설명 고정

### ABOUT
- **타임라인**  
  - `static/data/history.json`에서 연혁 데이터 동적으로 로드  
  - **Hover preview**: 목록에 마우스 올리면 미리보기 이미지 표시  
  - **Hover label**: 항목별 `color` 변수에 따라 텍스트 색상 및 밑줄 적용  
  - **Toggle detail**: 클릭 시 상세 설명 영역 확장/축소, 확장 시 배경색을 해당 `color`로 변경

---

## 📄 라우팅

| URL                  | 설명                  |
|----------------------|-----------------------|
| `/`                  | Intro 페이지          |
| `/now`               | Now 메인 페이지       |
| `/now/works`         | Now 작업물 상세 페이지|
| `/archive/<num>`     | Archive 페이지 (`num`번째)|
| `/about`             | About 타임라인 페이지 |

---

## 🎨 기술 스택

- Frontend: HTML5, CSS3, Vanilla JS  
- Backend: Flask, Jinja2  
- Libraries: `dragscroll.js` (드래그 스크롤), custom `archive.js`, `sidebar.js`, `about.js`, `intro.js`  
- Data: JSON(`history.json`), static 파일 관리  
