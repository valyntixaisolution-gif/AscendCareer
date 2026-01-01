# 🎯 API Documentation with Role-Based Access Control

Roles: `['student', 'trainer', 'company', 'admin', 'super-admin']`

---

## 📘 1️⃣ USER MODEL (`user.model.js`)

### Auth & Account

| Method | Endpoint                | What it does          | Roles |
| ------ | ----------------------- | --------------------- | ----- |
| POST   | `/auth/register`        | Register user         | Public |
| POST   | `/auth/login`           | Login                 | Public |
| POST   | `/auth/logout`          | Logout                | Authenticated |
| POST   | `/auth/refresh-token`   | Refresh token         | Authenticated |
| POST   | `/auth/verify-email`    | Verify email          | Public |
| POST   | `/auth/forgot-password` | Send reset email      | Public |
| POST   | `/auth/reset-password`  | Reset password        | Public |
| GET    | `/auth/google`          | Google login          | Public |
| GET    | `/auth/google/callback` | Google login callback | Public |
| GET    | `/auth/github`          | GitHub login          | Public |
| GET    | `/auth/github/callback` | GitHub login callback | Public |
| POST   | `/auth/google/failure`  | Google login failure  | Public |
| POST   | `/auth/github/failure`  | GitHub login failure  | Public |

### Profile

| Method | Endpoint             | What it does      | Roles |
| ------ | -------------------- | ---------------- | ----- |
| GET    | `/users/me`          | Get my profile    | Authenticated |
| PUT    | `/users/me`          | Update my profile | Authenticated |
| PUT    | `/users/me/avatar`   | Update avatar     | Authenticated |
| PUT    | `/users/me/password` | Update password   | Authenticated |

### Admin

| Method | Endpoint              | What it does     | Roles |
| ------ | --------------------- | ---------------- | ----- |
| GET    | `/users`              | List all users   | admin, super-admin |
| GET    | `/users/:userId`      | Get user by ID   | admin, super-admin |
| PUT    | `/users/:userId/role` | Update user role | super-admin only |
| DELETE | `/users/:userId`      | Delete user      | admin, super-admin |

---

## 📘 2️⃣ COURSE MODEL (`course.model.js`)

| Method | Endpoint             | What it does  | Roles |
| ------ | -------------------- | ------------- | ----- |
| GET    | `/courses`           | List courses  | All authenticated |
| POST   | `/courses`           | Create course | trainer, admin, super-admin |
| GET    | `/courses/:courseId` | Get course    | All authenticated |
| PUT    | `/courses/:courseId` | Update course | trainer (own course), admin, super-admin |
| DELETE | `/courses/:courseId` | Delete course | trainer (own course), admin, super-admin |

### Enrollment

| Method | Endpoint                      | What it does           | Roles |
| ------ | ----------------------------- | ---------------------- | ----- |
| POST   | `/courses/:courseId/enroll`   | Enroll student         | student |
| GET    | `/courses/:courseId/students` | List enrolled students | trainer (own course), admin, super-admin |
| GET    | `/users/me/courses`           | My enrolled courses    | student |

### Ratings

| Method | Endpoint                     | What it does       | Roles |
| ------ | ---------------------------- | ----------------- | ----- |
| POST   | `/courses/:courseId/ratings` | Add rating         | student |
| GET    | `/courses/:courseId/ratings` | Get course ratings | All authenticated |

---

## 📘 3️⃣ ASSIGNMENT MODEL (`assignment.model.js`)

| Method | Endpoint                         | What it does      | Roles |
| ------ | -------------------------------- | ----------------- | --------------------------------------------- |
| POST   | /courses/:courseId/assignments   | Create assignment | trainer (own course), admin                   |
| GET    | /courses/:courseId/assignments   | List assignments  | enrolled students, trainer (own course), admin|
| GET    | /assignments/:assignmentId       | Get assignment    | enrolled students, trainer (own course), admin|
| PUT    | /assignments/:assignmentId       | Update assignment | trainer (own course), admin                   |
| DELETE | /assignments/:assignmentId       | Delete assignment | trainer (own course), admin                   |
trainer (own course), admin |

### Submissions

| Method | Endpoint                            | What it does      | Roles |
| ------ | ----------------------------------- | ---------------- | ----- |
| POST   | `/assignments/:assignmentId/submit` | Submit assignment | student |
| PUT    | `/assignments/:assignmentId/grade`  | Grade submission  | trainer (own course), admin |

---

## 📘 4️⃣ PROJECT MODEL (`project.model.js`)

| Method | Endpoint                      | What it does   | Roles |
| ------ | ----------------------------- | -------------- | ----- |
| POST   | `/courses/:courseId/projects` | Create project | trainer (own course), admin |
| GET    | `/courses/:courseId/projects` | List projects  | All enrolled students, trainer (own course) |
| GET    | `/projects/:projectId`        | Get project    | All enrolled students, trainer (own course) |
| PUT    | `/projects/:projectId`        | Update project | trainer (own course), admin |
| DELETE | `/projects/:projectId`        | Delete project | trainer (own course), admin |

---

## 📘 5️⃣ INTERNSHIP MODEL (`internship.model.js`)

| Method | Endpoint                                | What it does      | Roles |
| ------ | --------------------------------------- | ---------------- | ----- |
| GET    | `/internships`                          | List internships  | All authenticated |
| POST   | `/internships`                          | Create internship | company, admin |
| GET    | `/internships/:internshipId`            | Get internship    | All authenticated |
| PUT    | `/internships/:internshipId`            | Update internship | company (own), admin |
| DELETE | `/internships/:internshipId`            | Delete internship | company (own), admin |

### Apply

| Method | Endpoint                                | What it does         | Roles |
| ------ | --------------------------------------- | ------------------- | ----- |
| POST   | `/internships/:internshipId/apply`      | Apply for internship | student |
| GET    | `/internships/:internshipId/applicants` | List applicants      | company (own), admin |

---

## 📘 6️⃣ JOB MODEL (`job.model.js`)

| Method | Endpoint                  | What it does    | Roles |
| ------ | ------------------------- | --------------- | ----- |
| GET    | `/jobs`                   | List jobs       | All authenticated |
| POST   | `/jobs`                   | Create job      | company, admin |
| GET    | `/jobs/:jobId`            | Get job         | All authenticated |
| PUT    | `/jobs/:jobId`            | Update job      | company (own), admin |
| DELETE | `/jobs/:jobId`            | Delete job      | company (own), admin |

### Apply

| Method | Endpoint                  | What it does    | Roles |
| ------ | ------------------------- | --------------- | ----- |
| POST   | `/jobs/:jobId/apply`      | Apply for job   | student |
| GET    | `/jobs/:jobId/applicants` | List applicants | company (own), admin |

---

## 📘 7️⃣ CERTIFICATE MODEL (`certificate.model.js`)

| Method | Endpoint                       | What it does                  | Roles |
| ------ | ------------------------------ | ----------------------------- | ----- |
| GET    | `/certificates`                | List all certificates (admin) | admin, super-admin |
| POST   | `/certificates`                | Issue certificate             | trainer, admin, super-admin |
| GET    | `/certificates/:certificateId` | Get certificate               | student (owner), trainer (assigned), admin |
| GET    | `/users/me/certificates`       | My certificates               | student |

---

## 📘 8️⃣ PAYMENT MODEL (`payment.model.js`)

| Method | Endpoint                      | What it does          | Roles |
| ------ | ----------------------------- | -------------------- | ----- |
| POST   | `/payments`                   | Create payment        | student |
| GET    | `/payments/:paymentId`        | Get payment           | student (owner), admin |
| GET    | `/users/me/payments`          | My payments           | student |
| PUT    | `/payments/:paymentId/status` | Update payment status | admin, super-admin |

---

## 📘 9️⃣ NOTIFICATION MODEL (`notification.model.js`)

| Method | Endpoint                              | What it does        | Roles |
| ------ | ------------------------------------- | ----------------- | ----- |
| GET    | `/notifications`                      | My notifications    | All authenticated |
| PUT    | `/notifications/:notificationId/read` | Mark as read        | All authenticated |
| DELETE | `/notifications/:notificationId`      | Delete notification | Owner, admin |


⚠️ Summary of potentially missing routes:

Unenroll from course: DELETE /courses/:courseId/enroll

List submissions for an assignment: GET /assignments/:assignmentId/submissions

Submit project (if applicable)

Withdraw internship/job application: DELETE /internships/:id/apply / DELETE /jobs/:id/apply

Optional admin actions: deactivate user, revoke certificate, refund payment

Notifications: mark all as read