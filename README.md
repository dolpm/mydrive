# Screenshots
![image](https://user-images.githubusercontent.com/34420038/148321014-98fb4a36-9764-42ef-ac0c-1443eff2327f.png)
![image](https://user-images.githubusercontent.com/34420038/148320916-894d68d2-09ee-4bce-93ca-514b82f04743.png)

# Usage
The main purpose of this is project was to become a little more familiar
with go and postgresql. In essence, it is a simple file storage application, similar to that of something like *AWS S3* or *Google Drive*. Currently, it only supports a single user, however, with a bit of tinkering could be set up for as many as you need (w/ the addition of an additional auth form on top of the OTP).

I am currently running this on my raspberry pi and can provide a bit more insight into that installation if you want to contact me.

## Pre-requisites
- Docker
- npm/yarn/pnpm
- node
- go (I am using *v1.18beta1*)
- nginx (**optional**, however useful for production)

## Features
- OTP authentication (to be used w/ google authenticator and whatnot)
- File storage
- Folder creation
- Public link sharing for viewing pdf files
- Storage statistics

## Enviornment variables
- OTP_SECRET: An 80-bit bas32 encoded string. I used [this](https://www.xanxys.net/totp/) website to generate the key. **Take the hex string and convert it to base32 - this application does not like the spaces**.
- SESSION_SECRET: Any session secret.
- PRODUCTION: Boolean, set to true if you are running the application in a production environment.
- NEXT_PUBLIC_API_URI: The url where the backend/api portion of the application will be accessed in production. This gets rid of a lot of cors issues and using a reverse proxy like *nginx* you can have *https://myurl.com/api/v1* proxy to the backend. This would be what you set **NEXT_PUBLIC_API_URI** equal to.

## Getting up and running
- Set up your environment variables
- Database: ```cd db && docker-compose up -d```
- Backend: ```cd backend && go build ./cmd/mydrive/main.go && ./main```
- Frontend: ```cd frontend && npm i && npm build && npm start```
