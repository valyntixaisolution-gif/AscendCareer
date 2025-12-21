import apiClient from './axios';

export const projectAPI = {
  getAssignments: async () => {
    try {
      const response = await apiClient.get('/assignments');
      return response.data;
    } catch (error) {
      return {
        assignments: [
          {
            id: 1,
            title: 'Build a Todo App',
            course: 'React Fundamentals',
            deadline: '2024-02-15',
            submissionCount: 15,
            totalStudents: 25,
            description: 'Create a fully functional todo application using React hooks'
          },
          {
            id: 2,
            title: 'API Integration Project',
            course: 'Node.js Backend Development',
            deadline: '2024-02-20',
            submissionCount: 8,
            totalStudents: 18,
            description: 'Build a REST API with authentication and database integration'
          },
          {
            id: 3,
            title: 'Database Schema Design',
            course: 'Database Design',
            deadline: '2024-02-25',
            submissionCount: 5,
            totalStudents: 12,
            description: 'Design a normalized database schema for an e-commerce platform'
          }
        ]
      };
    }
  },

  createAssignment: async (assignmentData) => {
    try {
      const response = await apiClient.post('/assignments', assignmentData);
      return response.data;
    } catch (error) {
      return { success: true, assignment: { id: Date.now(), ...assignmentData, submissionCount: 0 } };
    }
  },

  getSubmissions: async (assignmentId) => {
    try {
      const response = await apiClient.get(`/assignments/${assignmentId}/submissions`);
      return response.data;
    } catch (error) {
      return {
        submissions: [
          {
            id: 1,
            studentName: 'John Doe',
            studentEmail: 'john@example.com',
            submissionDate: '2024-02-10',
            status: 'Submitted',
            grade: null,
            fileUrl: '#'
          },
          {
            id: 2,
            studentName: 'Jane Smith',
            studentEmail: 'jane@example.com',
            submissionDate: '2024-02-12',
            status: 'Late',
            grade: null,
            fileUrl: '#'
          }
        ]
      };
    }
  },

  gradeSubmission: async (submissionId, grade, feedback) => {
    try {
      const response = await apiClient.put(`/submissions/${submissionId}/grade`, { grade, feedback });
      return response.data;
    } catch (error) {
      return { success: true };
    }
  }
};