import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasRole, getUnauthorizedRedirect } from '../utils/helpers';
import { ROLES } from '../utils/constants';
import CompanyNavbar from '../components/navbar/CompanyNavbar';

const CompanyLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!hasRole(user, ROLES.COMPANY)) {
    return <Navigate to={getUnauthorizedRedirect(user)} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyNavbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;