# 📌 Camerart 공식 웹사이트

**카메랄트(Camer:art)**는 비평적 사고와 현대 예술을 기반으로 기획 전시를 만들어가는 전시 그룹입니다.  
이 웹사이트는 그룹의 전시를 온라인 공간에서 체계적으로 소개하고, 기록을 남기기 위해 개발되었습니다.

---

## 🚀 주요 기능

### 1️⃣ **Intro 페이지**
- `background.gif`와 3개의 gif 요소를 배경으로 구성
- 화면 클릭 시 `/now` 페이지로 이동
- 첫 접속에서만 사이드바 메뉴가 자동으로 닫힌 상태로 초기화

---

### 2️⃣ **ON VIEW (Now)**
- 현재 진행 중인 전시(최신 전시, 16번째) 소개
- **왼쪽**: 전시 포스터 고정  
- **오른쪽**: 스크롤 가능한 전시 정보 영역
  - **Installation Views**: 클릭&드래그(Dragscroll)로 좌우 스크롤
  - **Works**: 일부 작업물 미리보기 + "MORE" 클릭 시 `/works` 페이지 이동
  - **Funding**: 외부 크라우드 펀딩 페이지 iframe 임베드

---

### 3️⃣ **PAST (Archive)**
- `/archive/<num>` 경로로 1~15회차 전시 페이지 제공
- **페이지 구성**:
  - 왼쪽 포스터 / 오른쪽 전시 정보 (Description, Artist, Installation, Works, Funding)
  - **Works → MORE** 클릭 시 `/archive/<num>/works` 상세 페이지
- **기능**:
  - 마우스 휠로 이전/다음 전시 페이지 전환 (포스터 영역에서 작동)
  - 일부 전시(1, 4, 15회차)는 Carousel 기능 지원
  - Funding 제목 클릭 시 `archive.json`에 정의된 외부 링크 새 창 열림

---

### 4️⃣ **CAMER:ART (About)**
- `history.json` 기반으로 연혁 데이터 동적 로드
- Hover 시 미리보기 이미지 표시
- 클릭 시 상세 설명 및 이미지가 펼쳐지며 자동 스크롤
- 색상(`color`) 값에 따라 Hover 효과 및 펼침 배경색 변경

---

### 5️⃣ **Sidebar 내비게이션**
- 항상 우측 상단에 표시되는 햄버거 버튼
- 메뉴:
  - (CAMER:ART): About 페이지 이동
  - (ON VIEW): Now 페이지 이동
  - (PAST): 1~16회차 전시 페이지 이동
- **상태 유지**:
  - 마지막 열림/닫힘 상태 및 PAST 서브메뉴 상태를 `localStorage`에 저장
  - Intro → Now 최초 진입 시에는 닫힌 상태로 초기화

---

## 📂 폴더 구조

```
camerart-official-web/
│
├─ app.py
├─ requirements.txt
├─ .env
├─ .gitignore
├─ readme.md
│
├─ templates/
│   ├─ layout.html
│   ├─ intro.html
│   ├─ about.html
│   ├─ archive/
│   │   ├─ index.html
│   │   └─ works_detail.html
│
├─ static/
│   ├─ css/
│   │   ├─ style.css
│   │   ├─ sidebar.css
│   │   ├─ archive.css
│   │   ├─ about.css
│   │   ├─ intro.css
│   │   └─ works_detail.css
│   ├─ js/
│   │   ├─ sidebar.js
│   │   ├─ archive.js
│   │   ├─ about.js
│   │   ├─ intro.js
│   │   └─ dragscroll.js
│   ├─ data/
│   │   ├─ archive.json
│   │   └─ history.json
│   ├─ images/
│   │   ├─ intro/ (배경 및 gif)
│   │   ├─ icons/ (UI 아이콘)
│   │   ├─ about/
│   │   │   ├─ preview/1.png~16.png
│   │   │   └─ exhibition/[id]/detail*.png
│   │   └─ archive/[1~16]/(포스터, install, works 이미지)
│   └─ fonts/GothicA1.ttf
└─ venv/
```

---

## 🔧 개발 환경

- Python 3.x
- Flask
- HTML / CSS / JavaScript (Vanilla)
- Jinja2 템플릿
- JSON 데이터 기반 동적 페이지 로딩
- 정적 리소스 기반 이미지, 폰트 관리

---

## 📄 라우팅

| URL                          | 설명                                |
|------------------------------|-------------------------------------|
| `/`                          | Intro 페이지                        |
| `/now`                       | 최신 전시(16회차) 소개 페이지       |
| `/now/works`                 | 최신 전시 Works 상세 페이지         |
| `/archive/<num>`             | 과거 전시 페이지 (1~15회차)         |
| `/archive/<num>/works`       | 과거 전시 Works 상세 페이지         |
| `/about`                     | 그룹 소개 & 연혁 페이지             |

---

## ▶ 실행 방법

1. 가상환경 생성 및 활성화
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```
2. 패키지 설치
   ```bash
   pip install -r requirements.txt
   ```
3. 서버 실행
   ```bash
   python app.py
   ```
4. 브라우저에서 접속
   ```
   http://127.0.0.1:5000
   ```
