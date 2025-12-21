// src/pages/admin/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

const AdminDashboard = () => {
  const platformStats = [
    { label: 'Total Users', value: '12,458', color: 'purple', change: '+5.2%' },
    { label: 'Active Courses', value: '487', color: 'blue', change: '+12' },
    { label: 'Partner Companies', value: '203', color: 'green', change: '+8' },
    { label: 'Monthly Revenue', value: '$42,580', color: 'orange', change: '+18.3%' },
  ];

  const recentActivities = [
    { action: 'New company registered', entity: 'TechCorp Inc.', time: '10 min ago' },
    { action: 'Course published', entity: 'Advanced React Patterns', time: '1 hour ago' },
    { action: 'Payment processed', entity: '$499.99', time: '2 hours ago' },
    { action: 'User account suspended', entity: 'user@example.com', time: '5 hours ago' },
  ];

  const systemStatus = [
    { service: 'Web Server', status: 'Operational', uptime: '99.9%' },
    { service: 'Database', status: 'Operational', uptime: '99.8%' },
    { service: 'Payment Gateway', status: 'Degraded', uptime: '95.2%' },
    { service: 'Email Service', status: 'Operational', uptime: '99.5%' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">Monitor platform performance, manage users, and review system status.</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
                <span className="text-green-600 font-medium">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
              <Link to="/admin/reports" className="text-purple-600 hover:text-purple-800">
                View Logs →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      index === 3 ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-500">{activity.entity}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-800 mb-6">System Status</h2>
            
            <div className="space-y-4">
              {systemStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{service.service}</div>
                    <div className={`text-sm ${
                      service.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {service.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{service.uptime}</div>
                    <div className="text-xs text-gray-500">uptime</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                  Add User
                </button>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                  View Reports
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  Approve Requests
                </button>
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                  System Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;