#!/bin/bash

echo "🧶 스마뜨 서비스를 시작합니다..."

# 백엔드 서버 시작
echo "📡 백엔드 서버 시작 중..."
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 잠시 대기
sleep 3

# 프론트엔드 서버 시작
echo "🎨 프론트엔드 서버 시작 중..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "✅ 서버가 시작되었습니다!"
echo "📱 프론트엔드: http://localhost:3000"
echo "🔌 백엔드 API: http://localhost:8000"
echo "📚 API 문서: http://localhost:8000/docs"
echo ""
echo "종료하려면 Ctrl+C를 누르세요"

# 종료 시그널 처리
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' SIGINT SIGTERM

# 백그라운드 프로세스 대기
wait
