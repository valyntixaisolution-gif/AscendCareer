// src/layouts/TrainerLayout.jsx - Simplified version
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TrainerLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/trainer/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/trainer/courses', label: 'My Courses', icon: '📚' },
    { path: '/trainer/assignments', label: 'Assignments', icon: '📝' },
    { path: '/trainer/students', label: 'Students', icon: '👨‍🎓' },
    { path: '/trainer/analytics', label: 'Analytics', icon: '📊' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Similar structure as StudentLayout but with trainer branding */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-700">AscendCareer</h1>
          <p className="text-gray-500 text-sm mt-1">Trainer Portal</p>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 ${
                location.pathname === item.path ? 'bg-green-50 text-green-700 border-r-4 border-green-600' : ''
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

      <div className="ml-64">
        <header className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">Trainer Portal</p>
                <p className="text-sm text-gray-500">Manage your courses</p>
              </div>
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

export default TrainerLayout;