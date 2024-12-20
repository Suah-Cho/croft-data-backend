# croft-data
작업자가 편리하게 데이터를 입력할 수 있는 서비스

### 기술 스택
Express, Javascript, MySQL, JWT

### 서비스 시행하기
1. git clone을 한다.
```bash
git clone https://github.com/Suah-Cho/croft-data-backend.git
```

2. 터미널에서 패키지 설치 후 실행
```bash
npm install # 패키지 설치
npm start # node 실행
```

### 환경 변수 설정
환경 변수 예시 (.env.exmaple)
```.env
DB_HOST=localhost
DB_USER=suahcho
DB_PASSWORD=1234
DB_DATABASE=testdb
DB_PORT=3306
JWT_SECRET_KEY=jwtsecretky
```