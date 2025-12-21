import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasRole, getUnauthorizedRedirect } from '../utils/helpers';
import { ROLES } from '../utils/constants';
import AdminSidebar from '../components/navbar/AdminSidebar';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (!hasRole(user, ROLES.ADMIN)) {
    return <Navigate to={getUnauthorizedRedirect(user)} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-0">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;