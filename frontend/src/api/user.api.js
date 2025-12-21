import apiClient from './axios';

export const userAPI = {
  getStudents: async () => {
    try {
      const response = await apiClient.get('/users/students');
      return response.data;
    } catch (error) {
      return {
        students: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            enrolledCourses: ['React Fundamentals', 'Node.js Backend Development'],
            progress: 75,
            joinDate: '2024-01-15',
            lastActive: '2024-02-10'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            enrolledCourses: ['React Fundamentals'],
            progress: 60,
            joinDate: '2024-01-20',
            lastActive: '2024-02-09'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            enrolledCourses: ['Database Design'],
            progress: 90,
            joinDate: '2024-01-10',
            lastActive: '2024-02-11'
          },
          {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            enrolledCourses: ['React Fundamentals', 'Database Design'],
            progress: 45,
            joinDate: '2024-01-25',
            lastActive: '2024-02-08'
          }
        ]
      };
    }
  },

  getStudentProfile: async (studentId) => {
    try {
      const response = await apiClient.get(`/users/students/${studentId}`);
      return response.data;
    } catch (error) {
      return {
        student: {
          id: studentId,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          enrolledCourses: [
            { name: 'React Fundamentals', progress: 75, grade: 'A-' },
            { name: 'Node.js Backend Development', progress: 60, grade: 'B+' }
          ],
          assignments: [
            { title: 'Build a Todo App', status: 'Submitted', grade: 'A-', submissionDate: '2024-02-10' },
            { title: 'API Integration Project', status: 'Pending', grade: null, submissionDate: null }
          ],
          joinDate: '2024-01-15',
          lastActive: '2024-02-10'
        }
      };
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/trainer/dashboard');
      return response.data;
    } catch (error) {
      return {
        stats: {
          totalCourses: 3,
          activeStudents: 55,
          pendingAssignments: 8,
          submissionsToReview: 12
        },
        recentActivity: [
          { type: 'submission', message: 'John Doe submitted Todo App assignment', time: '2 hours ago' },
          { type: 'enrollment', message: 'Sarah Wilson enrolled in React Fundamentals', time: '4 hours ago' },
          { type: 'submission', message: 'Mike Johnson submitted Database Schema assignment', time: '6 hours ago' },
          { type: 'enrollment', message: 'Alex Brown enrolled in Node.js Backend Development', time: '1 day ago' }
        ]
      };
    }
  }
};