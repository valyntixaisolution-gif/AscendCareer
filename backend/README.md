## **API TABLE – AUTH MODULE**

| Method | Endpoint                | What It Does               |
| ------ | ----------------------- | -------------------------- |
| POST   | `/auth/register`        | Register new user          |
| POST   | `/auth/login`           | Login user & return tokens |
| POST   | `/auth/verify-otp`      | Verify phone/email OTP     |
| POST   | `/auth/refresh`         | Refresh JWT token          |
| POST   | `/auth/forgot-password` | Send reset link            |
| POST   | `/auth/reset-password`  | Reset password             |
| GET    | `/auth/me`              | Get logged-in user         |
