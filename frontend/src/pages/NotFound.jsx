import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaRocket, FaStar } from 'react-icons/fa';

const NotFound = () => {
  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={sparkleAnimation}
          className="absolute top-20 left-20 text-blue-300"
        >
          <FaStar size={20} />
        </motion.div>
        <motion.div
          animate={{ ...sparkleAnimation, transition: { ...sparkleAnimation.transition, delay: 0.5 } }}
          className="absolute top-40 right-32 text-indigo-300"
        >
          <FaStar size={16} />
        </motion.div>
        <motion.div
          animate={{ ...sparkleAnimation, transition: { ...sparkleAnimation.transition, delay: 1 } }}
          className="absolute bottom-32 left-40 text-purple-300"
        >
          <FaStar size={24} />
        </motion.div>
        <motion.div
          animate={{ ...sparkleAnimation, transition: { ...sparkleAnimation.transition, delay: 1.5 } }}
          className="absolute bottom-20 right-20 text-blue-300"
        >
          <FaStar size={18} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* 404 Number with Rocket */}
          <div className="relative inline-block">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-none"
            >
              404
            </motion.h1>
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 text-blue-500"
            >
              <FaRocket size={40} className="sm:w-16 sm:h-16" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Looks like you've ventured into uncharted territory. The page you're looking for seems to have taken a different career path!
          </p>
        </motion.div>

        {/* Animated Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="text-blue-500 mb-3">
              <FaHome size={24} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Go Home</h3>
            <p className="text-sm text-slate-600">Return to your career dashboard</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="text-purple-500 mb-3">
              <FaRocket size={24} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Explore</h3>
            <p className="text-sm text-slate-600">Discover new opportunities</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="text-indigo-500 mb-3">
              <FaStar size={24} className="mx-auto" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Get Help</h3>
            <p className="text-sm text-slate-600">Contact our support team</p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:bg-white"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        {/* Brand Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <p className="text-slate-500 text-sm">
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ascend Career
            </span>
            {' '}- Your journey to success continues
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-sm"
      />
      
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          rotate: [0, -8, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-12 w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full opacity-15 blur-sm"
      />
    </div>
  );
};

export default NotFound;