# JWT를 이용한 로그인 워크플로우

### 로그인 세부 내용
1. JWT를 이용한다.
    a. Access Token은 1시간, Refresh Token은 14일로 설정한다.
2. 기기별로 로그인은 하나만 가능하다.
    a. 만약, pc1에서 로그인한 상태에서 pc2를 로그인하면 pc1은 로그아웃된다.
3. 세션 로그인 정보는 서버 메모리에 저장한다.
    a. 관련하여 데이터베이스 or Redis 사용 여부는 이후 정한다.

### 사용자 워크플로우
```plantuml

@startuml

participant "Browser" as b
participant "Server" as s
participant "Database" as d

b -> s : 1. 사용자 로그인
s <-> d : 2. 사용자 확인

s -> s : 3. Access Token, Refresh Token 발급
s -> b : 4. 응답 (+ Access Token, Refresh Token)

== If Access Token is not expired ==

b -> s : 5. 데이터 요청 (+ Access Token in Header)
s -> s : 6. Access Token 검증
s -> b : 7. 응답 (+ 요청 데이터)

== If Access Token expired ==

b -> s : 5. 데이터 요청 (+ Access Token in Header)
s -> s : 6. Access Token 검증 / Access Token 만료 확인
s -> b : 7. Access Token 만료 신호 (unAuthorization)
b -> s : 8. Access Token 발급 요청 (+ Access Token in Header / Refresh Token in cookie)
s -> s : 9. Refresh Token 확인 후, 새로운 Access Token 발급
s -> b : 10. 응답 (+ new Access Token)
 

@enduml
```

### API
- Access Token은 Browser에서 State로 가지고 API 요청 시 Header로 요청한다.
- Refresh Token은 Cookie로 설정한다. 

```plantuml
@startuml

participant "Browser" as b
participant "Server" as s
participant "Database" as d

b -> s : 1. POST /login (body : email, password) application/x-www-form-urlencoded
s -> d : 2. 데이터베이스 쿼리 조회
s -> s : 3. Access Token, Refresh Token 발급 
s -> b : 4. status 200, {access token, refresh token}

== If Access Token is not expired ==

b -> s : 5. GET /data (header : Access Token, cookie : Refresh Token)
s -> s : 6. Access Token 검증
s -> b : 7. status 200, {data}

== If Access Token is expired ===

b -> s : 5. GET /data (header : Access Token, cookie : Refresh Token)
s -> s : 6. Access Token 검증 및 만료 확인
s -> b : 7. status 404

b -> s : 8. GET /new-access-token (header : Access Token, cookie : Refresh Token)
s -> s : 9. Refresh Token 확인 후 새로운 Access Token 발급
s -> b : 10. status 200, {access token}

b -> s : 11. GET /data (header : Access Token, cookie : Refresh Token) 재요청
s -> s : 12. Access Token 검증
s -> b : 13. status 200, {data}


@enduml

```