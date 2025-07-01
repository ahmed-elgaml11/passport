# 🛡️ Passport Authentication Example (Local, JWT, Google OAuth2)

This repository demonstrates how to implement authentication in a Node.js/Express app using **Passport.js** with three strategies:

- 🔐 Local Strategy (email + password)
- 🪙 JWT Strategy (token-based, stateless auth)
- 🌐 Google OAuth2 Strategy (social login with Google)

---

## 🚀 Features

- 🔑 User registration & login with email/password  with local and jwt strategies
- 🪙 JWT generation and protection of API routes
- 🌐 Google login with OAuth2
- 📦 MongoDB with Mongoose
- 🛠️ Organized folder structure
- 🛠️ Error Handling

---

## 🗂️ Project Structure
### strategies configrations 

/src/config/ passport-local
/src/config/ passport-jwt
/src/config/ passport-google


for local:    /src/api/users/user.routes           
for jwt:      /src/api/users/user2.routes
for Oauth:    /src/api/users/user3.routes
