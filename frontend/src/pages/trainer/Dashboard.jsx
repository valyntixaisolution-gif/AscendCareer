// src/pages/trainer/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TrainerLayout from '../../layouts/TrainerLayout';

const TrainerDashboard = () => {
  const stats = [
    { label: 'Total Courses', value: 8, color: 'green', change: '+2' },
    { label: 'Active Students', value: 245, color: 'blue', change: '+15' },
    { label: 'Assignments Pending', value: 42, color: 'orange', change: '-8' },
    { label: 'Monthly Earnings', value: '$3,850', color: 'purple', change: '+12%' },
  ];

  const recentCourses = [
    { title: 'React Masterclass', students: 85, rating: 4.8, status: 'Active' },
    { title: 'Node.js Backend', students: 42, rating: 4.7, status: 'Active' },
    { title: 'Advanced JavaScript', students: 120, rating: 4.9, status: 'Published' },
  ];

  const pendingAssignments = [
    { student: 'Alex Johnson', course: 'React Masterclass', submitted: '2 hours ago' },
    { student: 'Sarah Miller', course: 'Node.js Backend', submitted: '1 day ago' },
    { student: 'David Kim', course: 'Advanced JavaScript', submitted: '2 days ago' },
  ];

  return (
    <TrainerLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-teal-700 text-black p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-2">Trainer Dashboard</h1>
          <p className="text-green-100">Manage your courses, students, and assignments efficiently.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
                <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Courses</h2>
              <Link to="/trainer/courses" className="text-green-600 hover:text-green-800">
                Manage All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <div className="flex items-center mt-1 space-x-4">
                        <span className="text-sm text-gray-500">{course.students} students</span>
                        <span className="flex items-center text-sm text-yellow-600">
                          ⭐ {course.rating}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      course.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                      View Students
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Edit Content
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-4 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-green-400 hover:text-green-600">
                + Create New Course
              </button>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Pending Assignments</h2>
              <Link to="/trainer/assignments" className="text-green-600 hover:text-green-800">
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {pendingAssignments.map((assignment, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{assignment.student}</h3>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Submitted: {assignment.submitted}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-orange-600 font-medium">
                      ⚠️ Needs Grading
                    </span>
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                      Grade Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3">Teaching Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-500">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.8</div>
                  <div className="text-sm text-gray-500">Avg. Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TrainerLayout>
  );
};

export default TrainerDashboard;