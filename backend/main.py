from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import os
import uuid
from pathlib import Path

# 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./smartra.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI 앱 초기화
app = FastAPI(
    title="스마뜨 API",
    description="뜨개질 커뮤니티 플랫폼 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 업로드 디렉토리 생성
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# 정적 파일 서빙
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 데이터베이스 모델
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    patterns = relationship("Pattern", back_populates="author")
    posts = relationship("Post", back_populates="author")

class Pattern(Base):
    __tablename__ = "patterns"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    difficulty = Column(String)  # beginner, intermediate, advanced
    category = Column(String)    # scarf, hat, sweater, etc.
    yarn_weight = Column(String)
    needle_size = Column(String)
    estimated_time = Column(String)
    image_url = Column(String)
    pattern_file_url = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_public = Column(Boolean, default=True)
    
    author = relationship("User", back_populates="patterns")

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    category = Column(String)  # tutorial, showcase, question, etc.
    
    author = relationship("User", back_populates="posts")

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

# Pydantic 모델
class UserBase(BaseModel):
    username: str
    email: str
    full_name: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class PatternBase(BaseModel):
    title: str
    description: str
    difficulty: str
    category: str
    yarn_weight: Optional[str] = None
    needle_size: Optional[str] = None
    estimated_time: Optional[str] = None

class PatternCreate(PatternBase):
    pass

class PatternResponse(PatternBase):
    id: int
    author_id: int
    created_at: datetime
    is_public: bool
    image_url: Optional[str] = None
    pattern_file_url: Optional[str] = None
    author: UserResponse
    
    class Config:
        from_attributes = True

class PostBase(BaseModel):
    title: str
    content: str
    category: str

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    author_id: int
    created_at: datetime
    author: UserResponse
    
    class Config:
        from_attributes = True

# 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API 엔드포인트
@app.get("/")
async def root():
    return {
        "message": "🧶 스마뜨 API에 오신 것을 환영합니다!",
        "description": "뜨개질 애호가들을 위한 커뮤니티 플랫폼",
        "created_by": "지현정",
        "version": "1.0.0"
    }

# 사용자 관리
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[UserResponse])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다")
    return user

# 패턴 관리
@app.post("/patterns/", response_model=PatternResponse)
async def create_pattern(
    title: str = Form(...),
    description: str = Form(...),
    difficulty: str = Form(...),
    category: str = Form(...),
    yarn_weight: Optional[str] = Form(None),
    needle_size: Optional[str] = Form(None),
    estimated_time: Optional[str] = Form(None),
    author_id: int = Form(...),
    image: Optional[UploadFile] = File(None),
    pattern_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # 파일 업로드 처리
    image_url = None
    pattern_file_url = None
    
    if image:
        image_filename = f"{uuid.uuid4()}_{image.filename}"
        image_path = UPLOAD_DIR / image_filename
        with open(image_path, "wb") as buffer:
            content = await image.read()
            buffer.write(content)
        image_url = f"/uploads/{image_filename}"
    
    if pattern_file:
        file_filename = f"{uuid.uuid4()}_{pattern_file.filename}"
        file_path = UPLOAD_DIR / file_filename
        with open(file_path, "wb") as buffer:
            content = await pattern_file.read()
            buffer.write(content)
        pattern_file_url = f"/uploads/{file_filename}"
    
    db_pattern = Pattern(
        title=title,
        description=description,
        difficulty=difficulty,
        category=category,
        yarn_weight=yarn_weight,
        needle_size=needle_size,
        estimated_time=estimated_time,
        author_id=author_id,
        image_url=image_url,
        pattern_file_url=pattern_file_url
    )
    
    db.add(db_pattern)
    db.commit()
    db.refresh(db_pattern)
    return db_pattern

@app.get("/patterns/", response_model=List[PatternResponse])
async def get_patterns(
    skip: int = 0, 
    limit: int = 100, 
    difficulty: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Pattern).filter(Pattern.is_public == True)
    
    if difficulty:
        query = query.filter(Pattern.difficulty == difficulty)
    if category:
        query = query.filter(Pattern.category == category)
    
    patterns = query.offset(skip).limit(limit).all()
    return patterns

@app.get("/patterns/{pattern_id}", response_model=PatternResponse)
async def get_pattern(pattern_id: int, db: Session = Depends(get_db)):
    pattern = db.query(Pattern).filter(Pattern.id == pattern_id).first()
    if pattern is None:
        raise HTTPException(status_code=404, detail="패턴을 찾을 수 없습니다")
    return pattern

# 커뮤니티 게시글
@app.post("/posts/", response_model=PostResponse)
async def create_post(post: PostCreate, author_id: int, db: Session = Depends(get_db)):
    db_post = Post(**post.dict(), author_id=author_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/posts/", response_model=List[PostResponse])
async def get_posts(
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Post)
    
    if category:
        query = query.filter(Post.category == category)
    
    posts = query.order_by(Post.created_at.desc()).offset(skip).limit(limit).all()
    return posts

@app.get("/posts/{post_id}", response_model=PostResponse)
async def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다")
    return post

# 재료 계산기 API
@app.post("/calculate/yarn")
async def calculate_yarn_needed(
    pattern_type: str,
    size: str,
    yarn_weight: str,
    gauge: Optional[int] = 4  # stitches per inch
):
    """뜨개질 프로젝트에 필요한 실의 양을 계산합니다."""
    
    # 기본 계산 로직 (실제로는 더 복잡한 계산이 필요)
    base_amounts = {
        "hat": {"baby": 100, "child": 150, "adult": 200},
        "scarf": {"short": 200, "medium": 300, "long": 400},
        "sweater": {"baby": 400, "child": 600, "adult": 800},
        "blanket": {"baby": 800, "throw": 1200, "full": 1600}
    }
    
    yarn_multipliers = {
        "lace": 0.7,
        "fingering": 0.8,
        "dk": 1.0,
        "worsted": 1.2,
        "chunky": 1.5
    }
    
    base_amount = base_amounts.get(pattern_type, {}).get(size, 300)
    multiplier = yarn_multipliers.get(yarn_weight, 1.0)
    
    estimated_grams = int(base_amount * multiplier)
    estimated_meters = int(estimated_grams * 4)  # 대략적인 미터 계산
    
    return {
        "estimated_grams": estimated_grams,
        "estimated_meters": estimated_meters,
        "recommended_skeins": max(1, estimated_grams // 50),
        "pattern_type": pattern_type,
        "size": size,
        "yarn_weight": yarn_weight
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
