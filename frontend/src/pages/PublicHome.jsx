import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlay, FaArrowRight, FaCheck, FaStar, FaUsers, FaGlobe, 
  FaChevronLeft, FaChevronRight, FaQuoteLeft, FaAward,
  FaRocket, FaShieldAlt, FaClock, FaHandshake, FaGraduationCap,
  FaBuilding, FaChartLine, FaBriefcase, FaLaptopCode, FaUserTie,
  FaIndustry, FaNetworkWired, FaLightbulb, FaBullseye, FaGoogle,
  FaMicrosoft, FaAmazon, FaFacebook, FaApple, FaVideo, FaFilter,
  FaSearch, FaBookmark, FaCertificate, FaCode, FaPalette, FaDatabase,
  FaMobile, FaCloud, FaRobot, FaChartBar, FaCamera, FaMusic,
  FaGamepad, FaLanguage, FaHeart, FaEye, FaDownload, FaCalendarAlt,
  FaCreditCard, FaShoppingCart, FaTimes, FaExternalLinkAlt, FaMapMarkerAlt,
  FaBell, FaChalkboardTeacher, FaClipboardList, FaTrophy
} from 'react-icons/fa';
import HeroSection from '../components/HeroSection';


const PublicHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentCourseSlide, setCurrentCourseSlide] = useState(0);
  

  
  // Trusted Companies State
  const [companyCount, setCompanyCount] = useState(14000);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  

  

  
  // AI Course Marketplace State
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('recommended');
  const [courseView, setCourseView] = useState('grid');
  const [comparedCourses, setComparedCourses] = useState([]);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  
  // Role Switcher State
  const [activeRole, setActiveRole] = useState('student');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Company logos data
  const companies = [
    { name: 'Google', icon: FaGoogle, color: 'text-red-500' },
    { name: 'Microsoft', icon: FaMicrosoft, color: 'text-blue-500' },
    { name: 'Amazon', icon: FaAmazon, color: 'text-orange-500' },
    { name: 'Meta', icon: FaFacebook, color: 'text-blue-600' },
    { name: 'Apple', icon: FaApple, color: 'text-gray-800' },
    { name: 'Netflix', icon: FaVideo, color: 'text-red-600' },
    { name: 'Stripe', icon: FaCreditCard, color: 'text-purple-600' },
    { name: 'Shopify', icon: FaShoppingCart, color: 'text-green-600' }
  ];

  const filteredCompanies = companies;



  // Featured courses data
  const featuredCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      rating: 4.7,
      reviews: 273840,
      students: 850000,
      price: 84.99,
      originalPrice: 199.99,
      image: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg',
      category: 'development',
      level: 'Beginner',
      duration: '65 hours',
      bestseller: true,
      updated: 'Recently updated'
    },
    {
      id: 2,
      title: 'Machine Learning A-Z™: Python & R',
      instructor: 'Kirill Eremenko',
      rating: 4.5,
      reviews: 178542,
      students: 720000,
      price: 89.99,
      originalPrice: 199.99,
      image: 'https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg',
      category: 'data-science',
      level: 'Intermediate',
      duration: '44 hours',
      bestseller: true,
      updated: 'Updated Nov 2024'
    },
    {
      id: 3,
      title: 'UI/UX Design Specialization',
      instructor: 'Daniel Schifano',
      rating: 4.6,
      reviews: 89234,
      students: 340000,
      price: 79.99,
      originalPrice: 179.99,
      image: 'https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg',
      category: 'design',
      level: 'Beginner',
      duration: '32 hours',
      bestseller: false,
      updated: 'Updated Oct 2024'
    },
    {
      id: 4,
      title: 'AWS Certified Solutions Architect',
      instructor: 'Stephane Maarek',
      rating: 4.8,
      reviews: 156789,
      students: 580000,
      price: 94.99,
      originalPrice: 199.99,
      image: 'https://img-c.udemycdn.com/course/240x135/362070_d819_2.jpg',
      category: 'cloud',
      level: 'Advanced',
      duration: '28 hours',
      bestseller: true,
      updated: 'Updated Dec 2024'
    }
  ];



  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Google',
      content: 'CareerBox completely transformed my career. The hands-on projects and expert mentorship helped me transition from a junior developer to a senior engineer at Google in just 18 months.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      coursesTaken: 12,
      salaryIncrease: '150%'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Data Science Manager',
      company: 'Microsoft',
      content: 'The quality of instruction and real-world applications exceeded my expectations. I went from knowing nothing about data science to leading a team of 8 data scientists.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      coursesTaken: 8,
      salaryIncrease: '200%'
    },
    {
      name: 'Emily Johnson',
      role: 'Product Design Lead',
      company: 'Amazon',
      content: 'CareerBox provided the perfect blend of theory and practice. The portfolio projects I built during the courses directly helped me land my dream job at Amazon.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      coursesTaken: 6,
      salaryIncrease: '120%'
    }
  ];

  // Stats data
  const stats = [
    { number: '57M+', label: 'Students worldwide', icon: FaUsers, description: 'Learning and growing' },
    { number: '213,000+', label: 'Courses available', icon: FaGraduationCap, description: 'In 2000+ topics' },
    { number: '75+', label: 'Languages supported', icon: FaLanguage, description: 'Global accessibility' },
    { number: '773M+', label: 'Course enrollments', icon: FaRocket, description: 'And counting' }
  ];

  // Instructor spotlight data
  const instructors = [
    {
      name: 'Dr. Angela Yu',
      title: 'Lead Instructor at App Brewery',
      students: '4.2M+',
      courses: 8,
      rating: 4.7,
      reviews: '500K+',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
      expertise: ['Web Development', 'Mobile Apps', 'Python'],
      bio: 'Former lead developer at a London-based fintech startup'
    },
    {
      name: 'Jose Portilla',
      title: 'Head of Data Science',
      students: '3.8M+',
      courses: 12,
      rating: 4.6,
      reviews: '400K+',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
      expertise: ['Data Science', 'Python', 'Machine Learning'],
      bio: 'PhD in Mechanical Engineering, Data Science consultant'
    },
    {
      name: 'Maximilian Schwarzmüller',
      title: 'Professional Web Developer',
      students: '2.9M+',
      courses: 15,
      rating: 4.8,
      reviews: '350K+',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face',
      expertise: ['React', 'Vue.js', 'Angular', 'Node.js'],
      bio: 'Freelance web developer and consultant'
    }
  ];





  // Animate company counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCompanyCount(prev => prev + Math.floor(Math.random() * 5));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % Math.ceil(filteredCompanies.length / 6));
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredCompanies.length]);




  // AI Course Marketplace Data
  const aiCourses = [
    {
      id: 1,
      title: 'Advanced React & Next.js Mastery',
      instructor: 'Sarah Chen',
      rating: 4.9,
      reviews: 12847,
      students: 89234,
      price: 149,
      originalPrice: 299,
      duration: '42 hours',
      level: 'Advanced',
      category: 'development',
      skills: ['React', 'Next.js', 'TypeScript', 'GraphQL'],
      aiMatch: 96,
      careerImpact: 94,
      completionRate: 87,
      avgSalaryIncrease: 35,
      roi: 450,
      popularity: 'trending',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      skillGaps: ['Advanced Hooks', 'Performance Optimization'],
      jobMatches: ['Senior Frontend Developer', 'Full Stack Engineer'],
      featured: true
    },
    {
      id: 2,
      title: 'Machine Learning Engineering Pipeline',
      instructor: 'Dr. Alex Rodriguez',
      rating: 4.8,
      reviews: 8934,
      students: 45678,
      price: 199,
      originalPrice: 399,
      duration: '56 hours',
      level: 'Expert',
      category: 'ai-ml',
      skills: ['Python', 'TensorFlow', 'MLOps', 'Docker'],
      aiMatch: 92,
      careerImpact: 98,
      completionRate: 82,
      avgSalaryIncrease: 55,
      roi: 680,
      popularity: 'hot',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop',
      skillGaps: ['MLOps', 'Model Deployment'],
      jobMatches: ['ML Engineer', 'Data Scientist'],
      featured: false
    },
    {
      id: 3,
      title: 'UX/UI Design System Mastery',
      instructor: 'Maya Patel',
      rating: 4.7,
      reviews: 6789,
      students: 34567,
      price: 129,
      originalPrice: 249,
      duration: '38 hours',
      level: 'Intermediate',
      category: 'design',
      skills: ['Figma', 'Design Systems', 'Prototyping'],
      aiMatch: 89,
      careerImpact: 85,
      completionRate: 91,
      avgSalaryIncrease: 28,
      roi: 320,
      popularity: 'rising',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      skillGaps: ['Design Systems', 'Advanced Prototyping'],
      jobMatches: ['Senior UX Designer', 'Product Designer'],
      featured: false
    }
  ];

  const courseFilters = [
    { id: 'recommended', name: 'AI Recommended', icon: FaRobot },
    { id: 'trending', name: 'Trending', icon: FaRocket },
    { id: 'high-roi', name: 'High ROI', icon: FaChartLine }
  ];

  const getFilteredCourses = () => {
    switch (selectedCourseFilter) {
      case 'trending':
        return aiCourses.filter(course => course.popularity === 'trending' || course.popularity === 'hot');
      case 'high-roi':
        return aiCourses.filter(course => course.roi >= 400).sort((a, b) => b.roi - a.roi);
      default:
        return aiCourses.sort((a, b) => b.aiMatch - a.aiMatch);
    }
  };

  const toggleCourseComparison = (course) => {
    if (comparedCourses.find(c => c.id === course.id)) {
      setComparedCourses(comparedCourses.filter(c => c.id !== course.id));
    } else if (comparedCourses.length < 3) {
      setComparedCourses([...comparedCourses, course]);
    }
  };

  // Role Switcher Data
  const roleData = {
    student: {
      title: 'For Students',
      subtitle: 'Launch your tech career with expert guidance',
      color: 'blue',
      icon: FaGraduationCap,
      features: [
        { icon: FaUsers, title: 'Learn from Industry Experts', desc: 'Access courses from top professionals' },
        { icon: FaBriefcase, title: 'Build Portfolio Projects', desc: 'Create real-world projects for your portfolio' },
        { icon: FaUserTie, title: 'Get Career Coaching', desc: 'Personalized guidance from career mentors' },
        { icon: FaCertificate, title: 'Earn Certifications', desc: 'Industry-recognized certificates' },
        { icon: FaRocket, title: 'Join Hackathons', desc: 'Compete in coding competitions' },
        { icon: FaHandshake, title: 'Get Job Placement', desc: 'Direct connections to hiring companies' }
      ],
      stats: { users: '2.5M+', success: '89%', avg_salary: '$75K' },
      cta: 'Start Learning Free'
    },
    trainer: {
      title: 'For Trainers',
      subtitle: 'Share your expertise and build your teaching business',
      color: 'green',
      icon: FaChalkboardTeacher,
      features: [
        { icon: FaVideo, title: 'Create and Sell Courses', desc: 'Build comprehensive online courses' },
        { icon: FaCalendarAlt, title: 'Host Live Workshops', desc: 'Conduct interactive live sessions' },
        { icon: FaUsers, title: 'Mentor Students', desc: 'Guide learners on their journey' },
        { icon: FaChartLine, title: 'Earn Revenue', desc: 'Monetize your expertise effectively' },
        { icon: FaAward, title: 'Build Reputation', desc: 'Establish yourself as an industry expert' },
        { icon: FaLaptopCode, title: 'Access Teaching Tools', desc: 'Professional course creation tools' }
      ],
      stats: { trainers: '50K+', earnings: '$125K', rating: '4.8/5' },
      cta: 'Become a Trainer'
    },
    company: {
      title: 'For Companies',
      subtitle: 'Scale your team with verified talent and training',
      color: 'purple',
      icon: FaBuilding,
      features: [
        { icon: FaSearch, title: 'Hire Verified Talent', desc: 'Access pre-screened candidates' },
        { icon: FaClipboardList, title: 'Post Projects', desc: 'Find freelancers for your projects' },
        { icon: FaTrophy, title: 'Run Competitions', desc: 'Host coding challenges and hackathons' },
        { icon: FaGraduationCap, title: 'Train Employees', desc: 'Upskill your existing workforce' },
        { icon: FaChartBar, title: 'Access Analytics', desc: 'Track team progress and performance' },
        { icon: FaHandshake, title: 'Partner with Platform', desc: 'Strategic partnership opportunities' }
      ],
      stats: { companies: '5K+', hires: '100K+', satisfaction: '94%' },
      cta: 'Partner with Us'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />



      {/* Enhanced Trusted Companies Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-100/10 to-gray-200/10 animate-pulse"></div>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
                Trusted by Industry Leaders &
                <span className="block bg-gradient-to-r bg-blue-600 bg-clip-text text-transparent">
                  Innovators Worldwide
                </span>
              </h2>
            </div>
          </div>

          {/* Company Logos Carousel */}
          <div className="relative">
            {/* Desktop: Infinite Scroll Carousel */}
            <div className="hidden md:block overflow-hidden relative">
              <div className="flex space-x-8 animate-infinite-scroll">
                {[...filteredCompanies, ...filteredCompanies, ...filteredCompanies].map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 w-48 h-32 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50">
                      <div className="flex flex-col items-center justify-center h-full">
                        <company.icon className={`text-4xl ${company.color} group-hover:scale-110 transition-all duration-300 mb-3 filter grayscale group-hover:grayscale-0`} />
                        <span className="text-gray-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">
                          {company.name}
                        </span>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Touch-Friendly Grid with Stagger Animation */}
            <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {filteredCompanies.slice(0, 6).map((company, index) => (
                <div
                  key={company.name}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-500 active:scale-95 touch-manipulation hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
                    <div className="text-center">
                      <company.icon className={`text-2xl sm:text-3xl ${company.color} mb-1 sm:mb-2 mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110`} />
                      <span className="text-gray-900 font-medium text-xs sm:text-sm block group-hover:text-blue-600 transition-colors duration-300">{company.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows (Desktop) */}
            <button 
              onClick={() => setCurrentCarouselIndex(prev => Math.max(0, prev - 1))}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentCarouselIndex(prev => (prev + 1) % Math.ceil(filteredCompanies.length / 6))}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Featured Testimonial */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center">
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 max-w-4xl mx-auto">
              <FaQuoteLeft className="text-2xl sm:text-3xl text-blue-600 mb-3 sm:mb-4 mx-auto" />
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 italic leading-relaxed px-2">
                "CareerBox has transformed how we approach talent development. The quality of candidates and the comprehensive training programs have exceeded our expectations."
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaGoogle className="text-white text-lg sm:text-xl" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-gray-900 font-semibold text-sm sm:text-base">Sarah Chen</div>
                  <div className="text-gray-600 text-xs sm:text-sm">VP of Engineering, Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>



      {/* Featured Courses Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Courses
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">Courses that help you keep up with the latest trends</p>
            </div>
            <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center whitespace-nowrap text-sm sm:text-base">
              View all <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-40 sm:h-48 object-cover" />
                  {course.bestseller && (
                    <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Bestseller
                    </span>
                  )}
                  <button className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaHeart className="text-gray-400 hover:text-red-500 text-sm" />
                  </button>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white rounded-full p-2 sm:p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <FaPlay className="text-blue-600 text-sm sm:text-base" />
                    </button>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">{course.instructor}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <span className="text-orange-500 font-bold text-xs sm:text-sm mr-1">{course.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-xs ${i < Math.floor(course.rating) ? 'text-orange-500' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs">({course.reviews.toLocaleString()})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <FaUsers className="mr-1" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base sm:text-lg font-bold text-gray-900">${course.price}</span>
                      <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* AI-Personalized Course Marketplace */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200 mb-4 sm:mb-6">
              <FaRobot className="text-blue-600 mr-2 text-sm sm:text-base" />
              <span className="text-blue-800 text-xs sm:text-sm font-medium">AI-Powered Recommendations</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Personalized Course
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              AI-curated courses with real-time metrics, skill gap analysis, and career impact predictions
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4">
              {courseFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCourseFilter(filter.id)}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
                    selectedCourseFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  <filter.icon className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            {getFilteredCourses().map((course, index) => (
              <div
                key={course.id}
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                {course.featured && (
                  <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  </div>
                )}

                <div className="absolute -top-1 sm:-top-2 right-3 sm:right-4">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                      <circle 
                        cx="32" cy="32" r="28" fill="none" 
                        stroke={course.aiMatch >= 95 ? '#10b981' : '#3b82f6'}
                        strokeWidth="4"
                        strokeDasharray={`${(course.aiMatch / 100) * 175.93} 175.93`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">{course.aiMatch}%</span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-4 sm:mb-6 mt-6 sm:mt-8">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-36 sm:h-48 object-cover rounded-xl sm:rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <button className="w-full bg-white/90 text-gray-900 font-semibold py-2 px-3 sm:px-4 rounded-lg text-sm">
                        <FaPlay className="inline mr-2" />
                        Preview Course
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center mb-3 sm:mb-4">
                    <FaStar className="text-yellow-500 mr-1 text-sm" />
                    <span className="font-semibold text-gray-900 text-sm">{course.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">({course.reviews.toLocaleString()})</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="text-sm sm:text-lg font-bold text-blue-600">{course.careerImpact}%</div>
                      <div className="text-xs text-blue-700">Impact</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-sm sm:text-lg font-bold text-green-600">{course.completionRate}%</div>
                      <div className="text-xs text-green-700">Complete</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-sm sm:text-lg font-bold text-purple-600">{course.roi}%</div>
                      <div className="text-xs text-purple-700">ROI</div>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Skill Gaps:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.skillGaps.map((skill, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">${course.price}</span>
                      <span className="text-sm sm:text-lg text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm sm:text-lg font-bold text-green-600">+{course.avgSalaryIncrease}%</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to="/courses"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-center text-xs sm:text-sm"
                    >
                      Enroll Now
                    </Link>
                    <button
                      onClick={() => toggleCourseComparison(course)}
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-xl text-xs sm:text-sm"
                    >
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Calculate Your Learning ROI
              </h3>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                See how our courses can boost your career and salary potential
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-xl text-sm sm:text-base"
              >
                <FaChartLine className="mr-2 sm:mr-3" />
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Role Switcher Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Choose Your <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Discover what AscendCareer can do for you based on your role
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 md:mb-12">
            <div className="bg-white rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg border border-gray-200 w-full max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                {Object.entries(roleData).map(([role, data]) => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base md:text-lg w-full ${
                      activeRole === role
                        ? `bg-gradient-to-r ${
                            data.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            data.color === 'green' ? 'from-green-500 to-green-600' :
                            'from-purple-500 to-purple-600'
                          } text-white shadow-lg transform scale-105`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <data.icon className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                    <span className="hidden sm:inline">{data.title}</span>
                    <span className="sm:hidden">{data.title.replace('For ', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            {Object.entries(roleData).map(([role, data]) => (
              <div
                key={role}
                className={`transition-all duration-500 ease-in-out ${
                  activeRole === role
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-0 transform translate-x-full absolute inset-0'
                }`}
              >
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${
                    data.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    data.color === 'green' ? 'from-green-500 to-green-600' :
                    'from-purple-500 to-purple-600'
                  } text-white p-4 sm:p-6 md:p-8 lg:p-12`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="text-center md:text-left mb-6 md:mb-0">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{data.title}</h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">{data.subtitle}</p>
                      </div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <data.icon className="text-2xl sm:text-3xl md:text-4xl text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
                      {Object.entries(data.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{value}</div>
                          <div className="text-xs sm:text-sm opacity-80 capitalize">
                            {key.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {data.features.map((feature, index) => (
                        <div
                          key={index}
                          className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${
                            data.color === 'blue' ? 'from-blue-100 to-blue-200' :
                            data.color === 'green' ? 'from-green-100 to-green-200' :
                            'from-purple-100 to-purple-200'
                          } rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className={`text-lg sm:text-xl ${
                              data.color === 'blue' ? 'text-blue-600' :
                              data.color === 'green' ? 'text-green-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-8 sm:mt-10 md:mt-12">
                      <Link
                        to={role === 'student' ? '/signup' : role === 'trainer' ? '/become-trainer' : '/enterprise'}
                        className={`inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r ${
                          data.color === 'blue' ? 'from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500' :
                          data.color === 'green' ? 'from-green-500 to-green-600 hover:from-green-400 hover:to-green-500' :
                          'from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500'
                        } text-white font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto`}
                      >
                        <FaRocket className="mr-2 sm:mr-3" />
                        {data.cta}
                        <FaArrowRight className="ml-2 sm:ml-3" />
                      </Link>
                      
                      <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 px-4">
                        {role === 'student' ? 'No credit card required • Start learning today' :
                         role === 'trainer' ? 'Join 50,000+ successful trainers • Earn up to $125K/year' :
                         'Trusted by 5,000+ companies • 94% satisfaction rate'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Spotlight */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Learn from <span className="text-blue-600">Industry Experts</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">World-class instructors with real-world experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <img 
                    src={instructor.avatar} 
                    alt={instructor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 border-4 border-blue-100"
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{instructor.name}</h3>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">{instructor.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{instructor.students}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{instructor.courses}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Courses</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <FaStar className="text-orange-500 text-sm" />
                  <span className="ml-1 font-bold text-sm sm:text-base">{instructor.rating}</span>
                  <span className="ml-2 text-gray-500 text-xs sm:text-sm">({instructor.reviews} reviews)</span>
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                    {instructor.expertise.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm text-center mb-4 sm:mb-6 px-2">{instructor.bio}</p>
                
                <Link 
                  to="/trainers"
                  className="w-full inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
              Transforming Lives <span className="text-blue-300">Globally</span>
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg px-4">Join millions of learners advancing their careers with CareerBox</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white px-2">
                <stat.icon className="text-2xl sm:text-3xl md:text-4xl mx-auto mb-2 sm:mb-3 md:mb-4 text-blue-300" />
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium mb-1 text-xs sm:text-sm md:text-base">{stat.label}</div>
                <div className="text-blue-200 text-xs sm:text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Success <span className="text-blue-600">Stories</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Real career transformations from our community</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
                <div className="md:col-span-2 order-2 md:order-1">
                  <FaQuoteLeft className="text-2xl sm:text-3xl md:text-4xl text-blue-300 mb-4 sm:mb-6 mx-auto md:mx-0" />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center md:text-left">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex flex-col sm:flex-row items-center mb-3 sm:mb-4 text-center sm:text-left">
                    <img 
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-3 sm:mb-0 sm:mr-4 border-3 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base">{testimonials[currentTestimonial].role}</p>
                      <p className="text-blue-600 font-medium text-xs sm:text-sm md:text-base">{testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm sm:text-base md:text-lg" />
                    ))}
                  </div>
                </div>
                
                <div className="text-center md:text-left order-1 md:order-2">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Career Impact</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Courses Completed:</span>
                        <span className="font-bold text-blue-600">{testimonials[currentTestimonial].coursesTaken}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Salary Increase:</span>
                        <span className="font-bold text-green-600">+{testimonials[currentTestimonial].salaryIncrease}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Time to Success:</span>
                        <span className="font-bold text-purple-600">18 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-blue-600 w-6 sm:w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join millions of learners and start building the skills that will advance your career today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12">
            <Link 
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Start Learning Today <FaArrowRight className="ml-2" />
            </Link>
            
            <Link 
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
            >
              <FaPlay className="mr-2" />
              Explore Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-gray-600">
            <div className="flex flex-col items-center">
              <FaCheck className="text-green-500 text-xl sm:text-2xl mb-2" />
              <span className="font-medium text-sm sm:text-base">Free to get started</span>
              <span className="text-xs sm:text-sm">No credit card required</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCertificate className="text-blue-500 text-xl sm:text-2xl mb-2" />
              <span className="font-medium text-sm sm:text-base">Industry certificates</span>
              <span className="text-xs sm:text-sm">Recognized by employers</span>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-purple-500 text-xl sm:text-2xl mb-2" />
              <span className="font-medium text-sm sm:text-base">Expert support</span>
              <span className="text-xs sm:text-sm">24/7 community help</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;