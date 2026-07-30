// lib/routes.ts

export const ROUTES = {
  // Public Routes
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAILS: (id: string) => `/courses/${id}`,
  TEACHERS: '/teachers',
  TEACHER_PROFILE: (id: string) => `/teachers/${id}`,
  CENTERS: '/centers',
  PRICING: '/pricing',
  FAQ: '/faq',

  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/register',

  // Dashboards
  STUDENT: {
    DASHBOARD: '/student',
    EXAMS: '/student/exams',
    BOOKINGS: '/student/booking',
    STATS: '/student/stats',
  },
  TEACHER: {
    DASHBOARD: '/teacher',
  },
  PARENT: {
    DASHBOARD: '/parent',
  },
  ADMIN: {
    DASHBOARD: '/admin',
  },

  // Media
  WATCH_VIDEO: (id: string) => `/watch/${id}`,
  PROFILE: '/profile',
} as const;