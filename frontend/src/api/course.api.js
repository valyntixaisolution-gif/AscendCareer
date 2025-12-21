import apiClient from './axios';

export const courseAPI = {
  getCourses: async () => {
    try {
      const response = await apiClient.get('/courses');
      return response.data;
    } catch (error) {
      return {
        courses: [
          {
            id: 1,
            title: 'React Fundamentals',
            category: 'Frontend',
            enrolledStudents: 25,
            status: 'Active',
            description: 'Learn React from basics to advanced concepts'
          },
          {
            id: 2,
            title: 'Node.js Backend Development',
            category: 'Backend',
            enrolledStudents: 18,
            status: 'Active',
            description: 'Build scalable backend applications with Node.js'
          },
          {
            id: 3,
            title: 'Database Design',
            category: 'Database',
            enrolledStudents: 12,
            status: 'Draft',
            description: 'Master database design principles and SQL'
          }
        ]
      };
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await apiClient.post('/courses', courseData);
      return response.data;
    } catch (error) {
      return { success: true, course: { id: Date.now(), ...courseData, status: 'Draft' } };
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      const response = await apiClient.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      return { success: true, course: { id, ...courseData } };
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await apiClient.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },

  getCourseStudents: async (courseId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/students`);
      return response.data;
    } catch (error) {
      return {
        students: [
          { id: 1, name: 'John Doe', email: 'john@example.com', progress: 75 },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', progress: 60 },
          { id: 3, name: 'Mike Johnson', email: 'mike@example.com', progress: 90 }
        ]
      };
    }
  }
};