import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChalkboardTeacher, FaBuilding, FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

const AccountTypeModal = ({ isOpen, onClose, onSelect, selectedRole }) => {
  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
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

  const handleSelect = (roleValue) => {
    onSelect(roleValue);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Choose Your Account Type
              </h2>
              <p className="text-lg text-slate-600">
                Select the option that best describes your goals
              </p>
            </div>

            {/* Options */}
            <div className="px-8 pb-8 space-y-4">
              {roles.map((role) => {
                const IconComponent = role.icon;
                const isSelected = selectedRole === role.value;
                
                return (
                  <motion.button
                    key={role.value}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(role.value)}
                    className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? `border-${role.color}-500 bg-${role.color}-50 shadow-lg`
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 ${
                        isSelected
                          ? `bg-gradient-to-r ${role.gradient} text-white shadow-lg`
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-xl mb-1">
                          {role.label}
                        </h3>
                        <p className="text-slate-600 text-base">
                          {role.description}
                        </p>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`w-6 h-6 rounded-full bg-${role.color}-500 flex items-center justify-center`}
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountTypeModal;