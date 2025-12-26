# API ROUTES

---

## 📘 1️⃣ USER MODEL (`user.model.js`)

### Auth & Account

| Method | Endpoint                | What it does          |
| ------ | ----------------------- | --------------------- |
| POST   | `/auth/register`        | Register user         |
| POST   | `/auth/login`           | Login                 |
| POST   | `/auth/logout`          | Logout                |
| POST   | `/auth/refresh-token`   | Refresh token         |
| POST   | `/auth/verify-email`    | Verify email          |
| POST   | `/auth/forgot-password` | Send reset email      |
| POST   | `/auth/reset-password`  | Reset password        |
| GET    | `/auth/google`          | Google login          |
| GET    | `/auth/google/callback` | Google login callback |
| GET    | `/auth/github`          | GitHub login          |
| GET    | `/auth/github/callback` | GitHub login callback |
| POST   | `/auth/google/failure`  | Google login failure  |
| POST   | `/auth/github/failure`  | GitHub login failure  |

### Profile

| Method | Endpoint             | What it does      |
| ------ | -------------------- | ----------------- |
| GET    | `/users/me`          | Get my profile    |
| PUT    | `/users/me`          | Update my profile |
| PUT    | `/users/me/avatar`   | Update avatar     |
| PUT    | `/users/me/password` | Update password   |

### Admin

| Method | Endpoint              | What it does     |
| ------ | --------------------- | ---------------- |
| GET    | `/users`              | List all users   |
| GET    | `/users/:userId`      | Get user by ID   |
| PUT    | `/users/:userId/role` | Update user role |
| DELETE | `/users/:userId`      | Delete user      |

---

## 📘 2️⃣ COURSE MODEL (`course.model.js`)

| Method | Endpoint             | What it does  |
| ------ | -------------------- | ------------- |
| GET    | `/courses`           | List courses  |
| POST   | `/courses`           | Create course |
| GET    | `/courses/:courseId` | Get course    |
| PUT    | `/courses/:courseId` | Update course |
| DELETE | `/courses/:courseId` | Delete course |

### Enrollment

| Method | Endpoint                      | What it does           |
| ------ | ----------------------------- | ---------------------- |
| POST   | `/courses/:courseId/enroll`   | Enroll student         |
| GET    | `/courses/:courseId/students` | List enrolled students |
| GET    | `/users/me/courses`           | My enrolled courses    |

### Ratings

| Method | Endpoint                     | What it does       |
| ------ | ---------------------------- | ------------------ |
| POST   | `/courses/:courseId/ratings` | Add rating         |
| GET    | `/courses/:courseId/ratings` | Get course ratings |

---

## 📘 3️⃣ ASSIGNMENT MODEL (`assignment.model.js`)

| Method | Endpoint                         | What it does      |
| ------ | -------------------------------- | ----------------- |
| POST   | `/courses/:courseId/assignments` | Create assignment |
| GET    | `/courses/:courseId/assignments` | List assignments  |
| GET    | `/assignments/:assignmentId`     | Get assignment    |
| PUT    | `/assignments/:assignmentId`     | Update assignment |
| DELETE | `/assignments/:assignmentId`     | Delete assignment |

### Submissions

| Method | Endpoint                            | What it does      |
| ------ | ----------------------------------- | ----------------- |
| POST   | `/assignments/:assignmentId/submit` | Submit assignment |
| PUT    | `/assignments/:assignmentId/grade`  | Grade submission  |

---

## 📘 4️⃣ PROJECT MODEL (`project.model.js`)

| Method | Endpoint                      | What it does   |
| ------ | ----------------------------- | -------------- |
| POST   | `/courses/:courseId/projects` | Create project |
| GET    | `/courses/:courseId/projects` | List projects  |
| GET    | `/projects/:projectId`        | Get project    |
| PUT    | `/projects/:projectId`        | Update project |
| DELETE | `/projects/:projectId`        | Delete project |

---

## 📘 5️⃣ INTERNSHIP MODEL (`internship.model.js`)

| Method | Endpoint                     | What it does      |
| ------ | ---------------------------- | ----------------- |
| GET    | `/internships`               | List internships  |
| POST   | `/internships`               | Create internship |
| GET    | `/internships/:internshipId` | Get internship    |
| PUT    | `/internships/:internshipId` | Update internship |
| DELETE | `/internships/:internshipId` | Delete internship |

### Apply

| Method | Endpoint                                | What it does         |
| ------ | --------------------------------------- | -------------------- |
| POST   | `/internships/:internshipId/apply`      | Apply for internship |
| GET    | `/internships/:internshipId/applicants` | List applicants      |

---

## 📘 6️⃣ JOB MODEL (`job.model.js`)

| Method | Endpoint       | What it does |
| ------ | -------------- | ------------ |
| GET    | `/jobs`        | List jobs    |
| POST   | `/jobs`        | Create job   |
| GET    | `/jobs/:jobId` | Get job      |
| PUT    | `/jobs/:jobId` | Update job   |
| DELETE | `/jobs/:jobId` | Delete job   |

### Apply

| Method | Endpoint                  | What it does    |
| ------ | ------------------------- | --------------- |
| POST   | `/jobs/:jobId/apply`      | Apply for job   |
| GET    | `/jobs/:jobId/applicants` | List applicants |

---

## 📘 7️⃣ CERTIFICATE MODEL (`certificate.model.js`)

| Method | Endpoint                       | What it does                  |
| ------ | ------------------------------ | ----------------------------- |
| GET    | `/certificates`                | List all certificates (admin) |
| POST   | `/certificates`                | Issue certificate             |
| GET    | `/certificates/:certificateId` | Get certificate               |
| GET    | `/users/me/certificates`       | My certificates               |

---

## 📘 8️⃣ PAYMENT MODEL (`payment.model.js`)

| Method | Endpoint                      | What it does          |
| ------ | ----------------------------- | --------------------- |
| POST   | `/payments`                   | Create payment        |
| GET    | `/payments/:paymentId`        | Get payment           |
| GET    | `/users/me/payments`          | My payments           |
| PUT    | `/payments/:paymentId/status` | Update payment status |

---

## 📘 9️⃣ NOTIFICATION MODEL (`notification.model.js`)

| Method | Endpoint                              | What it does        |
| ------ | ------------------------------------- | ------------------- |
| GET    | `/notifications`                      | My notifications    |
| PUT    | `/notifications/:notificationId/read` | Mark as read        |
| DELETE | `/notifications/:notificationId`      | Delete notification |
