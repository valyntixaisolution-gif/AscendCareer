// src/pages/LandingPage.jsx
import React from 'react';
import { AnimatedCounter } from '../hooks/useCountUp.jsx';  // Changed from "./hooks"
import CompanyLogos from '../components/CompanyLogos';  // Changed from "./components"
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build Your Global Career with 
              <span className="block text-yellow-300 mt-2">World-Class Mentorship</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100">
              Join our international career development platform connecting students, 
              trainers, and companies across 50+ countries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:-translate-y-1 shadow-lg"
                onClick={() => navigate('/register/student')}
              >
                Start Learning Free
              </button>
              <button 
                className="bg-transparent hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg text-lg border-2 border-white transition-all"
                onClick={() => navigate('/register/company')}
              >
                Hire Top Talent
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={500} suffix="+" duration={1500} /></div>
                
                <div className="text-blue-200">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={2000} suffix="+" duration={1500} />
                </div>

                <div className="text-blue-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={1500} suffix="+" duration={1500} />
                </div>

                <div className="text-blue-200">Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                    <AnimatedCounter end={5000} suffix="+" duration={1500} />
                </div>

                <div className="text-blue-200">Jobs Filled</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        All the Skills You Need in One Place
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        From critical technical skills to soft skills, AscendCareer supports 
        your complete professional development journey.
      </p>
    </div>

    {/* Role Cards - Fixed height and alignment */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Student Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">👨‍🎓</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">For Students</h3>
        <ul className="space-y-3 mb-8 flex-grow">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Enroll in industry-relevant courses</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Work on real-world projects & internships</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Build your digital portfolio</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Get hired by top companies</span>
          </li>
        </ul>
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-auto"
          onClick={() => navigate('/register/student')}
        >
          Start Learning Journey
        </button>
      </div>

      {/* Trainer Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">👨‍🏫</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">For Trainers</h3>
        <ul className="space-y-3 mb-8 flex-grow">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Create and publish your courses</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Mentor aspiring professionals</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Evaluate assignments & projects</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Earn from your expertise</span>
          </li>
        </ul>
        <button 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mt-auto"
          onClick={() => navigate('/register/trainer')}
        >
          Become a Trainer
        </button>
      </div>

      {/* Company Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🏢</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">For Companies</h3>
        <ul className="space-y-3 mb-8 flex-grow">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Post jobs & internship opportunities</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Access our global talent pool</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Collaborate on real projects</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Hire skilled professionals</span>
          </li>
        </ul>
        <button 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors mt-auto"
          onClick={() => navigate('/register/company')}
        >
          Find Top Talent
        </button>
      </div>
    </div>
  </div>
</section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Trending Skills & Technologies
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Master the most in-demand skills with our curated learning paths
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">💻</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Web Development</h4>
              <p className="text-gray-600">
                HTML, CSS, JavaScript, React, Node.js, and modern frameworks for full-stack development.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Data Science</h4>
              <p className="text-gray-600">
                Python, Machine Learning, AI, Data Visualization, and Analytics with real-world datasets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">☁️</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Cloud Computing</h4>
              <p className="text-gray-600">
                AWS, Azure, Google Cloud, DevOps practices, and cloud architecture design patterns.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">📱</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Mobile Development</h4>
              <p className="text-gray-600">
                iOS, Android, React Native, Flutter, and cross-platform mobile app development.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">🔒</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Cybersecurity</h4>
              <p className="text-gray-600">
                Ethical Hacking, Network Security, Cryptography, and security best practices.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-blue-600 text-3xl mb-4">🎨</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">UI/UX Design</h4>
              <p className="text-gray-600">
                Figma, Adobe XD, User Research, Prototyping, and design thinking methodologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPANIES SECTION ===== */}
      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Trusted by Leading Companies Worldwide
      </h3>
    </div>
    <CompanyLogos />
  </div>
</section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Launch Your Global Career?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Join thousands of professionals who've transformed their careers with AscendCareer
          </p>
          <button 
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-12 rounded-full text-lg shadow-lg transform hover:-translate-y-1 transition-all"
            onClick={() => navigate('/register')}
          >
            Get Started For Free
          </button>
          <p className="mt-6 text-blue-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;