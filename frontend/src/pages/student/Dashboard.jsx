// src/pages/student/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';

const StudentDashboard = () => {
  const stats = [
    { label: 'Active Courses', value: 3, color: 'blue' },
    { label: 'Completed Projects', value: 2, color: 'green' },
    { label: 'Applied Jobs', value: 5, color: 'purple' },
    { label: 'Certificates', value: 1, color: 'orange' },
  ];

  const recentCourses = [
    { title: 'React Advanced Patterns', progress: 75, deadline: '3 days' },
    { title: 'Node.js Backend Development', progress: 40, deadline: '1 week' },
    { title: 'Data Structures & Algorithms', progress: 20, deadline: '2 weeks' },
  ];

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="text-blue-100">Continue your learning journey. You have 2 assignments due this week.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
              <Link to="/student/courses" className="text-blue-600 hover:text-blue-800">
                View all →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm text-red-600">Due: {course.deadline}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {course.progress}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Deadlines</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium">Assignment: React Hooks</div>
                  <div className="text-sm text-gray-500">Advanced Web Development</div>
                </div>
                <div className="text-red-600 font-medium">Tomorrow</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium">Project Submission</div>
                  <div className="text-sm text-gray-500">E-commerce Website</div>
                </div>
                <div className="text-orange-600 font-medium">3 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;