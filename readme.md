# Camerart 웹페이지 프로젝트

**카메랄트(Camerart)**는 전시 동아리로서, 뉴미디어와 예술, 비평적 사고를 기반으로 다양한 기획 전시를 운영합니다.  
이 웹사이트는 그룹의 전시 및 기록을 온라인으로 소개하기 위해 개발되었습니다.

---

## 🔧 개발 환경

- Python 3.x
- Flask
- HTML / CSS / JS
- Jinja2 (Flask 템플릿 엔진)
- JSON 기반 전시 기록 데이터
- 폴더 기반 정적 리소스 관리 (데이터베이스 미사용)

---


## 📂 폴더 구조

```
camerart_official_web/
├── app.py
├── .env
├── readme.md
├── requirements.txt
├── .gitignore
│
├── static/
│   ├── css/
│   │   ├── style.css
│   │   ├── sidebar.css
│   │   ├── about.css
│   │   └── intro.css
│   │
│   ├── js/
│   │   ├── sidebar.js
│   │   ├── dragscroll.js
│   │   ├── about.js
│   │   └── intro.js
│   │
│   ├── data/
│   │   └── history.json
│   │
│   └── images/
│       ├── intro/
│       │   ├── background.gif
│       │   ├── box1.gif
│       │   ├── box2.gif
│       │   └── box3.gif
│       │
│       ├── now/
│       │   ├── funding.jpg
│       │   ├── poster.jpg
│       │   ├── install1.jpg ~ install6.jpg
│       │   └── work1.jpg ~ work4.jpg
│       │
│       ├── about/
│       │   ├── logo.png
│       │   ├── preview/
│       │   │   └── 1.jpg ~ 15.jpg
│       │   └── exhibition/
│       │       └── 1~15/
│       │           └── detail1.jpg, detail2.jpg
│       │
│       └── archive/
│           └── 1~15/
│               ├── poster.jpg
│               ├── funding.jpg
│               ├── install1.jpg ~ install3.jpg
│               └── work1.jpg, work2.jpg
│
├── templates/
│   ├── layout.html
│   ├── intro.html
│   ├── about.html
│   ├── now/
│   │   ├── index.html
│   │   └── works_detail.html
│   └── archive/
│       └── page1.html ~ page15.html
```

---

## 🌐 주요 페이지 구성

### 1. `/`  
인트로 페이지 (`intro.html`)  
→ 클릭 시 `/now`로 이동

---

### 2. `/now`  
현재 전시 페이지  
- 좌측 고정 포스터 이미지  
- 우측 세션 구성  
  - **Installation Views**: 좌우 스크롤 이미지  
  - **Works**: More 버튼 → 상세 페이지  
  - **Funding**: 이미지와 설명

---

### 3. `/archive/<int:num>`  
이전 전시 아카이브  
- 총 15개 페이지 (`1th ~ 15th`)  
- `/now`와 동일한 구조  
  - 단, **Works에는 상세 보기 없음**

---

### 4. `/about`  
카메랄트 소개 및 연혁  
- 상단 소개 텍스트 + 로고  
- 연혁 정보는 `static/data/history.json`에서 불러옴  
- 연도별 `.timeline-section` 자동 생성  
  - Hover 시 플로팅 이미지  
  - 클릭 시 상세 설명 + 이미지가 아래로 펼쳐짐 (toggle 동작)

---

## 🧠 인터랙션 기능 요약

### 사이드바 (공통)
- 오른쪽 상단 ☰ 버튼 고정
- 메뉴: NOW / ARCHIVE (1~15) / ABOUT
- 슬라이드 인/아웃 애니메이션
- ✅ **`localStorage`를 이용해 열림/닫힘 상태 유지**
- ✅ **서브메뉴(ARCHIVE) 열림 상태도 기억**

### ABOUT 타임라인
- `.timeline-entry`는 `data-id`, `data-preview` 속성 보유
- `about.js`에서
  - Hover 시 → 이미지 프리뷰 표시
  - Click 시 → 상세 설명 토글
- ✅ 클릭한 상태 유지됨
- ✅ 페이지 전환 후에도 펼쳐진 항목/프리뷰 상태 복원

---

## 📝 커스터마이징 방법

### 새로운 전시 추가 (아카이브)
1. `/archive/16.html` 템플릿 생성
2. `static/images/archive/16/` 이미지 추가
3. `layout.html`의 사이드바 메뉴 확장 (자동화 필요 시 JS 처리 가능)

### ABOUT 연혁 추가
1. `static/data/history.json`에 항목 추가
2. `id`, `label`, `description`, `preview`, `images` 필드를 따름
3. 이미지 경로는 통일된 구조 유지:
   - 프리뷰: `/static/images/about/preview/{id}.jpg`
   - 상세: `/static/images/about/exhibition/{id}/detail1.jpg` 등

---

## ⚠️ 주의 사항

- `#imagePreview`는 DOM 하단에 있어야 하며, `position: absolute`로 지정
- 모든 `.timeline-entry`는 `data-id`와 `data-preview`를 포함해야 hover/클릭 기능이 작동
- CSS 전환 효과를 자연스럽게 유지하려면:
  - `display` 대신 `transform`, `visibility`, `opacity` 사용
  - `.sidebar-no-transition` 클래스를 활용해 초기 깜빡임 제거

---

## ▶️ 실행 방법

```bash
# (1) 가상환경 활성화 (선택)
source env/bin/activate      # 또는 .\env\Scripts\activate (Windows)

# (2) Flask 앱 실행
python app.py                # 또는 flask run

# 기본 접속: http://localhost:5000