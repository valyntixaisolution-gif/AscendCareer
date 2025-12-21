import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash, FaArrowRight, FaUser, FaChalkboardTeacher, FaBuilding, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import AccountTypeModal from '../components/common/AccountTypeModal';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    phone: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showRoleModal, setShowRoleModal] = useState(true);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { 
      value: 'student', 
      label: 'Student', 
      description: 'Start learning & building skills',
      icon: FaUser,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      value: 'trainer', 
      label: 'Trainer', 
      description: 'Teach, mentor, and earn',
      icon: FaChalkboardTeacher,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      value: 'company', 
      label: 'Company', 
      description: 'Hire verified talent',
      icon: FaBuilding,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case 'name':
        if (value.length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          delete errors.confirmPassword;
        }
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (value) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (Object.keys(fieldErrors).length > 0) {
      setError('Please fix all errors before submitting');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || null
      };
      
      const result = await register(userData);
      
      if (result.success) {
        switch(result.role) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'trainer':
            navigate('/trainer/dashboard');
            break;
          case 'company':
            navigate('/company/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError(`Registration error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleValue) => {
    setFormData(prev => ({ ...prev, role: roleValue }));
    setShowRoleModal(false);
  };

  const getRoleInfo = () => {
    const selectedRole = roles.find(role => role.value === formData.role);
    return selectedRole || roles[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex min-h-screen">
        {/* Left Panel - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6">
                Join the future of
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Career Growth
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Create your account and unlock access to premium learning, networking, and career opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-slate-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  <span>Join 50,000+ professionals worldwide</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  <span>Access exclusive courses and certifications</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  <span>Connect with industry leaders</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Register Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Ascend Career
              </h1>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900">
                Create your account
              </h2>
              <p className="mt-2 text-slate-600">
                Start your career journey today
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      fieldErrors.name ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {fieldErrors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {fieldErrors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {fieldErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {fieldErrors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Account Type
                  </label>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRoleModal(true)}
                    className="w-full p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-gradient-to-r ${getRoleInfo().gradient} text-white shadow-lg`}>
                        {(() => {
                          const IconComponent = getRoleInfo().icon;
                          return <IconComponent className="w-6 h-6" />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {getRoleInfo().label}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {getRoleInfo().description}
                        </p>
                      </div>
                      <div className="text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>
                  <p className="mt-2 text-sm text-slate-500">
                    Click to change your account type
                  </p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                      }`}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {fieldErrors.password}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        fieldErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
                      }`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {fieldErrors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded mt-1"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label htmlFor="terms" className="ml-3 text-sm text-slate-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || !agreedToTerms || Object.keys(fieldErrors).length > 0}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <FaArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200"
                >
                  <FaGoogle className="w-4 h-4 text-red-500 mr-2" />
                  Google
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200"
                >
                  <FaLinkedin className="w-4 h-4 text-blue-600 mr-2" />
                  LinkedIn
                </motion.button>
              </div>

              <div className="text-center">
                <span className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign in
                  </Link>
                </span>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-500">
                  🔒 Your data is protected with enterprise-grade security
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Account Type Modal */}
      <AccountTypeModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelect={handleRoleSelect}
        selectedRole={formData.role}
      />
    </div>
  );
};

export default Register;