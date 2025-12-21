import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasRole, getUnauthorizedRedirect } from '../utils/helpers';
import { ROLES } from '../utils/constants';
import StudentNavbar from '../components/navbar/StudentNavbar';

const StudentLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hasRole(user, ROLES.STUDENT)) {
    return <Navigate to={getUnauthorizedRedirect(user)} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;