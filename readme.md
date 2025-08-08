# 🎨 Camerart 공식 웹사이트

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
- 최신 전시(16회차) 소개 페이지
- **좌측 영역:** 전시 포스터 고정 배치
- **우측 영역:** 스크롤 가능한 전시 정보 표시
  - **Installation Views:** 클릭&드래그(Dragscroll)로 부드러운 좌우 스크롤 지원
  - **Works:** 일부 작업물 미리보기와 "MORE" 버튼을 통한 상세 페이지 이동
  - **Funding:** 외부 크라우드 펀딩 페이지 임베드로 바로가기 가능

---

### 3️⃣ **PAST (Archive)**
- `/archive/<num>` 경로로 1~15회차 전시별 개별 페이지 제공
- **페이지 구성:**
  - 좌측: 전시 포스터(일부 페이지는 캐러셀 지원, poster_carousel)
  - 우측: 전시 정보(Description, Artist, Installation Views, Works, Funding)
  - Works는 수동 좌표 배치로 위치 정확도 개선
  - Funding 제목 클릭 시 외부 링크(`funding_embed`)로 새 창 열림
  - **포스터 영역 마우스 휠 기능 제거** (캐러셀 버튼으로만 전환 가능)

---

### 4️⃣ **CAMER:ART (About)**
- `history.json` 기반으로 연혁 데이터 자동 로드
- Hover 시 미리보기 이미지 표시, 클릭 시 상세 설명과 이미지 확장 표시
- 색상(`color`) 값에 따른 Hover 효과와 배경 스타일 변경
- **반응형 지원:** 1920*1080 레이아웃 유지하면서 화면 크기에 따른 텍스트 크기 조정
  - 2000~3000px: 중간 크기 텍스트
  - 3000px 이상: 큰 텍스트 및 이미지 크기 조정

---

### 5️⃣ **Sidebar 내비게이션**
- 우측 상단 햄버거 버튼을 통한 전체 페이지 이동
- 메뉴 항목:
  - (CAMER:ART) → About 페이지
  - (ON VIEW) → Now 페이지
  - (PAST) → 1~16회차 전시 페이지
- 상태 유지:
  - 마지막 열림/닫힘 상태 및 PAST 서브메뉴 상태를 `localStorage`에 저장
  - Intro → Now 최초 진입 시 닫힘 상태로 초기화

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
│   │   ├─ intro/
│   │   ├─ icons/
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

## 🎨 반응형 디자인

### **레이아웃 원칙**
- **기본 레이아웃:** 1920*1080 해상도에 최적화
- **반응형 적용:** 화면 크기 변화 시에만 요소 크기 조정
- **16:9 비율 유지:** 기본 레이아웃 구조 보존

### **브레이크포인트**
- **1920px 이하:** 기본 스타일
- **2000~3000px:** 중간 크기 텍스트 및 이미지 조정
- **3000px 이상:** 큰 텍스트 및 이미지 크기 조정

### **주요 반응형 요소**
- **About 페이지:** Timeline 텍스트 크기 및 확장 영역 높이 조정
- **Archive 페이지:** Works 이미지 크기 및 캐러셀 이미지 일관성 유지
- **전체 페이지:** 폰트 크기, 여백, 패딩 조정

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

---

## 📝 최근 업데이트

### **반응형 디자인 개선**
- 1920*1080 레이아웃 보존하면서 화면 크기별 최적화
- About 페이지 timeline 텍스트 크기 단계별 조정
- Archive 페이지 이미지 크기 일관성 개선

### **사용자 경험 개선**
- Archive 페이지 포스터 영역 마우스 휠 기능 제거
- 캐러셀 버튼으로만 포스터 전환 가능
- 스크롤 동작 개선 및 레이아웃 안정성 향상