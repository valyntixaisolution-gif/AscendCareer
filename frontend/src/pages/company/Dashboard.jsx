// src/pages/company/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLayout from '../../layouts/CompanyLayout';

const CompanyDashboard = () => {
  const stats = [
    { label: 'Active Jobs', value: 8, color: 'orange', change: '+2' },
    { label: 'Total Applicants', value: 156, color: 'blue', change: '+24' },
    { label: 'Open Projects', value: 5, color: 'green', change: '+1' },
    { label: 'Hired This Month', value: 12, color: 'purple', change: '+3' },
  ];

  const recentApplicants = [
    { name: 'Alex Johnson', role: 'Frontend Developer', status: 'New', date: 'Today' },
    { name: 'Sarah Miller', role: 'Data Scientist', status: 'Reviewed', date: 'Yesterday' },
    { name: 'David Kim', role: 'DevOps Engineer', status: 'Interview', date: '2 days ago' },
  ];

  const activeJobs = [
    { title: 'Senior React Developer', applicants: 45, status: 'Active' },
    { title: 'Junior UX Designer', applicants: 23, status: 'Active' },
    { title: 'Product Manager', applicants: 18, status: 'Closing Soon' },
  ];

  return (
    <CompanyLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-black p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
          <p className="text-orange-100">Manage your job postings, projects, and applicants in one place.</p>
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
                <span className="text-green-600 font-medium">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applicants */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Applicants</h2>
              <Link to="/company/applicants" className="text-orange-600 hover:text-orange-800">
                View all →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentApplicants.map((applicant, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{applicant.name}</h3>
                      <p className="text-sm text-gray-500">{applicant.role}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        applicant.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        applicant.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {applicant.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{applicant.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Jobs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Active Job Postings</h2>
              <Link to="/company/jobs" className="text-orange-600 hover:text-orange-800">
                Manage →
              </Link>
            </div>
            
            <div className="space-y-4">
              {activeJobs.map((job, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.applicants} applicants</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        job.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status}
                      </span>
                      <button className="mt-2 text-sm text-orange-600 hover:text-orange-800">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-4 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-orange-400 hover:text-orange-600">
                + Create New Job Posting
              </button>
            </div>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyDashboard;