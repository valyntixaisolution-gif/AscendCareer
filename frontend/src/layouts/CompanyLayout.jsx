// src/layouts/CompanyLayout.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CompanyLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/company/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/company/jobs', label: 'Job Postings', icon: '💼' },
    { path: '/company/projects', label: 'Projects', icon: '🚀' },
    { path: '/company/applicants', label: 'Applicants', icon: '👥' },
    { path: '/company/analytics', label: 'Analytics', icon: '📊' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-700">AscendCareer</h1>
          <p className="text-gray-500 text-sm mt-1">Company Portal</p>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-700 ${
                location.pathname === item.path ? 'bg-orange-50 text-orange-700 border-r-4 border-orange-600' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            <span className="mr-2">🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <header className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500">Manage your talent pipeline</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                + Post New Job
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;