# 🧶 스마뜨 (Smart) - 뜨게질 커뮤니티 플랫폼

스마뜨는 뜨개질 애호가들을 위한 종합 플랫폼입니다.

## ✨ 주요 기능

- 🎨 **도안 공유**: 뜨개질 패턴 업로드 및 공유
- 👥 **커뮤니티**: 뜨개질 애호가들과의 소통
- 📚 **튜토리얼**: 초보자를 위한 단계별 가이드
- 🧮 **재료 계산기**: 필요한 실의 양과 바늘 사이즈 계산
- 📊 **진행 추적**: 프로젝트 진행도 관리
- 🔍 **스마트 검색**: 난이도, 카테고리별 도안 검색

## 🛠 기술 스택

### 백엔드
- **FastAPI** - 고성능 Python 웹 프레임워크
- **SQLAlchemy** - ORM
- **SQLite** - 데이터베이스
- **Pydantic** - 데이터 검증

### 프론트엔드
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Vite** - 빌드 도구

## 🚀 시작하기

### 🌐 온라인 데모
**GitHub Pages에서 바로 사용해보세요!**
- 🎨 **라이브 데모**: https://jinyoung89.github.io/Smart

### 🏠 로컬 개발

#### 간편 실행 (권장)
```bash
./start.sh
```

#### 개별 실행

##### 백엔드 실행
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

##### 프론트엔드 실행
```bash
cd frontend
npm install
npm run dev
```

### 접속 정보
- 🎨 프론트엔드: http://localhost:3000
- 🔌 백엔드 API: http://localhost:8000
- 📚 API 문서: http://localhost:8000/docs

### 📦 GitHub Pages 배포
```bash
cd frontend
npm run deploy
```

## 📁 프로젝트 구조

```
뜨게질/
├── backend/          # FastAPI 백엔드
├── frontend/         # React 프론트엔드
└── README.md
```

## 🎯 개발 로드맵

- [x] 프로젝트 초기 설정
- [x] 백엔드 API 개발 (FastAPI + SQLAlchemy)
- [x] 프론트엔드 UI 개발 (React + TypeScript + Tailwind)
- [x] 도안 업로드 기능 (이미지 및 파일 업로드)
- [x] 커뮤니티 기능 (게시글 작성/조회)
- [x] 재료 계산기 (실 필요량 계산)
- [x] 검색 및 필터링 (난이도, 카테고리별)
- [x] 반응형 디자인 및 현대적 UI/UX

## 📸 스크린샷

### 홈페이지
현대적이고 아름다운 디자인의 홈페이지로 서비스 소개와 주요 기능을 한눈에 볼 수 있습니다.

### 패턴 갤러리
다양한 뜨개질 패턴을 카드 형태로 보기 좋게 정리했으며, 난이도와 카테고리별로 필터링할 수 있습니다.

### 재료 계산기
프로젝트 종류, 크기, 실 굵기를 선택하면 필요한 실의 양을 자동으로 계산해줍니다.

### 커뮤니티
뜨개질 애호가들이 소통할 수 있는 공간으로 튜토리얼, 작품 자랑, 질문 등을 카테고리별로 나누어 관리합니다.

## 👩‍💻 제작자

**지현정** - 뜨개질을 사랑하는 개발자

- 🧶 뜨개질 애호가들을 위한 플랫폼을 꿈꾸며
- 💻 React, TypeScript, FastAPI로 구현
- 🌟 커뮤니티와 공유의 가치를 믿는

---

Made by **지현정** for knitting enthusiasts
