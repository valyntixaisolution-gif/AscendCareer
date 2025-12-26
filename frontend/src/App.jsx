import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicHome from './pages/PublicHome';
import PublicNavbar from './components/navbar/PublicNavbar';
import StudentNavbar from './components/navbar/StudentNavbar';
import TrainerNavbar from './components/navbar/TrainerNavbar';
import CompanyNavbar from './components/navbar/CompanyNavbar';
import AdminSidebar from './components/navbar/AdminSidebar';
import Footer from './components/common/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import StudentDashboard from './pages/student/Dashboard';
import TrainerLayout from './layouts/TrainerLayout';
import TrainerDashboard from './pages/trainer/Dashboard';
import TrainerCourses from './pages/trainer/Courses';
import TrainerAssignments from './pages/trainer/Assignments';
import TrainerStudents from './pages/trainer/Students';
import CompanyDashboard from './pages/company/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <PublicNavbar />
              <PublicHome />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <PublicNavbar />
              <Login />
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <PublicNavbar />
              <Register />
              <Footer />
            </>
          } />

          {/* Protected routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <>
                <StudentNavbar />
                <StudentDashboard />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          {/* Trainer routes */}
          <Route path="/trainer" element={
            <ProtectedRoute allowedRoles={['trainer']}>
              <TrainerLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<TrainerDashboard />} />
            <Route path="courses" element={<TrainerCourses />} />
            <Route path="assignments" element={<TrainerAssignments />} />
            <Route path="students" element={<TrainerStudents />} />
          </Route>

          <Route path="/company/dashboard" element={
            <ProtectedRoute allowedRoles={['company']}>
              <>
                <CompanyNavbar />
                <CompanyDashboard />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="flex flex-col min-h-screen">
                <div className="flex flex-1">
                  <AdminSidebar />
                  <AdminDashboard />
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          } />

          {/* 404 route */}
          <Route path="*" element={
            <>
              <PublicNavbar />
              <NotFound />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;