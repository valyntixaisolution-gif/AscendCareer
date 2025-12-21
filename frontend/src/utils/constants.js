// User Roles
export const ROLES = {
  STUDENT: 'student',
  TRAINER: 'trainer',
  COMPANY: 'company',
  ADMIN: 'admin'
};

// Dashboard Routes by Role
export const DASHBOARD_ROUTES = {
  [ROLES.STUDENT]: '/student/dashboard',
  [ROLES.TRAINER]: '/trainer/dashboard',
  [ROLES.COMPANY]: '/company/dashboard',
  [ROLES.ADMIN]: '/admin/dashboard'
};

// Route Prefixes
export const ROUTE_PREFIXES = {
  [ROLES.STUDENT]: '/student',
  [ROLES.TRAINER]: '/trainer',
  [ROLES.COMPANY]: '/company',
  [ROLES.ADMIN]: '/admin'
};

// Common Routes
export const COMMON_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  HOME: '/'
};

// Navigation Items by Role
export const NAV_ITEMS = {
  [ROLES.STUDENT]: [
    { path: '/student/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/student/courses', label: 'Courses', icon: 'courses' },
    { path: '/student/projects', label: 'Projects', icon: 'projects' },
    { path: '/student/jobs', label: 'Jobs', icon: 'jobs' },
    { path: '/student/profile', label: 'Profile', icon: 'profile' }
  ],
  [ROLES.TRAINER]: [
    { path: '/trainer/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/trainer/courses', label: 'Courses', icon: 'courses' },
    { path: '/trainer/assignments', label: 'Assignments', icon: 'assignments' },
    { path: '/trainer/students', label: 'Students', icon: 'students' },
    { path: '/trainer/messages', label: 'Messages', icon: 'messages' }
  ],
  [ROLES.COMPANY]: [
    { path: '/company/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/company/post-job', label: 'Post Job', icon: 'post-job' },
    { path: '/company/jobs', label: 'Jobs', icon: 'jobs' },
    { path: '/company/applicants', label: 'Applicants', icon: 'applicants' },
    { path: '/company/projects', label: 'Projects', icon: 'projects' }
  ],
  [ROLES.ADMIN]: [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/admin/users', label: 'Users', icon: 'users' },
    { path: '/admin/courses', label: 'Courses', icon: 'courses' },
    { path: '/admin/payments', label: 'Payments', icon: 'payments' },
    { path: '/admin/reports', label: 'Reports', icon: 'reports' },
    { path: '/admin/settings', label: 'Settings', icon: 'settings' }
  ]
};