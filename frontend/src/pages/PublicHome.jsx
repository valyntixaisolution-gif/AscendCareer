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
  FaCreditCard, FaShoppingCart, FaTimes, FaExternalLinkAlt, FaMapMarkerAlt
} from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import '../styles/quiz-animations.css';

const PublicHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentCourseSlide, setCurrentCourseSlide] = useState(0);
  
  // AI Career Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizProgress, setQuizProgress] = useState(0);
  const [weeklyTakers, setWeeklyTakers] = useState(1247);
  
  // Trusted Companies State
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('all');
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyCount, setCompanyCount] = useState(14000);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // AI Career Navigator State
  const [aiPathfinderActive, setAiPathfinderActive] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [timeline, setTimeline] = useState('6');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPaths, setAiPaths] = useState([]);
  const [selectedPathFilter, setSelectedPathFilter] = useState('recommended');
  const [showPathComparison, setShowPathComparison] = useState(false);
  const [comparedPaths, setComparedPaths] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Company logos data
  const companies = [
    { 
      name: 'Google', 
      icon: FaGoogle, 
      color: 'text-red-500',
      category: 'tech-giant',
      size: 'enterprise',
      partnerSince: '2020',
      employees: '156,000+',
      hires: '2,847',
      description: 'Leading technology company focusing on AI and cloud solutions',
      testimonial: 'CareerBox has been instrumental in upskilling our engineering teams.',
      skills: ['Cloud Computing', 'AI/ML', 'Software Engineering']
    },
    { 
      name: 'Microsoft', 
      icon: FaMicrosoft, 
      color: 'text-blue-500',
      category: 'tech-giant',
      size: 'enterprise',
      partnerSince: '2019',
      employees: '221,000+',
      hires: '3,156',
      description: 'Global technology leader in productivity and cloud services',
      testimonial: 'The quality of talent from CareerBox consistently exceeds our expectations.',
      skills: ['Azure', 'DevOps', 'Full Stack Development']
    },
    { 
      name: 'Amazon', 
      icon: FaAmazon, 
      color: 'text-orange-500',
      category: 'tech-giant',
      size: 'enterprise',
      partnerSince: '2021',
      employees: '1,500,000+',
      hires: '4,923',
      description: 'E-commerce and cloud computing giant',
      testimonial: 'CareerBox graduates integrate seamlessly into our fast-paced environment.',
      skills: ['AWS', 'Data Science', 'Machine Learning']
    },
    { 
      name: 'Meta', 
      icon: FaFacebook, 
      color: 'text-blue-600',
      category: 'tech-giant',
      size: 'enterprise',
      partnerSince: '2020',
      employees: '87,000+',
      hires: '1,834',
      description: 'Social technology company building the metaverse',
      testimonial: 'The innovative thinking from CareerBox alumni drives our product development.',
      skills: ['React', 'VR/AR', 'Mobile Development']
    },
    { 
      name: 'Apple', 
      icon: FaApple, 
      color: 'text-gray-800',
      category: 'tech-giant',
      size: 'enterprise',
      partnerSince: '2022',
      employees: '164,000+',
      hires: '987',
      description: 'Technology company known for innovative consumer electronics',
      testimonial: 'CareerBox professionals bring exceptional attention to detail and innovation.',
      skills: ['iOS Development', 'UI/UX Design', 'Hardware Engineering']
    },
    { 
      name: 'Netflix', 
      icon: FaVideo, 
      color: 'text-red-600',
      category: 'startup',
      size: 'enterprise',
      partnerSince: '2021',
      employees: '12,800+',
      hires: '567',
      description: 'Streaming entertainment service with global reach',
      testimonial: 'The data science expertise from CareerBox has enhanced our recommendation algorithms.',
      skills: ['Data Engineering', 'Content Strategy', 'Streaming Technology']
    },
    {
      name: 'Stripe',
      icon: FaCreditCard,
      color: 'text-purple-600',
      category: 'startup',
      size: 'medium',
      partnerSince: '2023',
      employees: '4,000+',
      hires: '234',
      description: 'Financial infrastructure platform for internet businesses',
      testimonial: 'CareerBox developers understand the complexity of financial systems.',
      skills: ['FinTech', 'API Development', 'Security']
    },
    {
      name: 'Shopify',
      icon: FaShoppingCart,
      color: 'text-green-600',
      category: 'startup',
      size: 'medium',
      partnerSince: '2022',
      employees: '10,000+',
      hires: '445',
      description: 'Commerce platform enabling businesses worldwide',
      testimonial: 'The e-commerce expertise from CareerBox has accelerated our merchant success.',
      skills: ['E-commerce', 'Ruby on Rails', 'Product Management']
    }
  ];

  const companyFilters = [
    { id: 'all', name: 'All Companies', count: companies.length },
    { id: 'tech-giant', name: 'Tech Giants', count: companies.filter(c => c.category === 'tech-giant').length },
    { id: 'startup', name: 'Startups', count: companies.filter(c => c.category === 'startup').length },
    { id: 'enterprise', name: 'Enterprise', count: companies.filter(c => c.size === 'enterprise').length }
  ];

  const filteredCompanies = selectedCompanyFilter === 'all' 
    ? companies 
    : companies.filter(company => 
        company.category === selectedCompanyFilter || company.size === selectedCompanyFilter
      );

  // Categories data
  const categories = [
    { id: 'all', name: 'All Categories', icon: FaGlobe, count: '2000+' },
    { id: 'development', name: 'Development', icon: FaCode, count: '500+' },
    { id: 'design', name: 'Design', icon: FaPalette, count: '300+' },
    { id: 'business', name: 'Business', icon: FaBriefcase, count: '400+' },
    { id: 'data-science', name: 'Data Science', icon: FaDatabase, count: '250+' },
    { id: 'mobile', name: 'Mobile', icon: FaMobile, count: '200+' },
    { id: 'cloud', name: 'Cloud Computing', icon: FaCloud, count: '180+' },
    { id: 'ai', name: 'AI & ML', icon: FaRobot, count: '150+' },
    { id: 'marketing', name: 'Marketing', icon: FaBullseye, count: '120+' }
  ];

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

  // Learning paths data
  const learningPaths = [
    {
      id: 1,
      title: 'Full Stack Developer',
      description: 'Master front-end and back-end development with AI-optimized curriculum',
      courses: 8,
      duration: '6 months',
      level: 'Beginner to Advanced',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      icon: FaCode,
      color: 'blue',
      aiMatch: 95,
      marketDemand: 'high',
      salaryRange: '$75,000 - $130,000',
      successRate: 89,
      jobGrowth: '+22%',
      prerequisites: ['Basic programming knowledge'],
      learningStyle: ['hands-on', 'project-based'],
      timeCommitment: '15-20 hours/week',
      difficulty: 'intermediate',
      trending: true
    },
    {
      id: 2,
      title: 'Data Scientist',
      description: 'Learn data analysis, ML, and AI techniques with real-world applications',
      courses: 6,
      duration: '4 months',
      level: 'Intermediate',
      skills: ['Python', 'Pandas', 'Machine Learning', 'SQL', 'Tableau'],
      icon: FaChartLine,
      color: 'green',
      aiMatch: 88,
      marketDemand: 'very-high',
      salaryRange: '$95,000 - $150,000',
      successRate: 92,
      jobGrowth: '+35%',
      prerequisites: ['Statistics', 'Basic Python'],
      learningStyle: ['analytical', 'research-based'],
      timeCommitment: '20-25 hours/week',
      difficulty: 'advanced',
      trending: true
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      description: 'Create beautiful and functional user experiences with design thinking',
      courses: 5,
      duration: '3 months',
      level: 'Beginner',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
      icon: FaPalette,
      color: 'purple',
      aiMatch: 92,
      marketDemand: 'high',
      salaryRange: '$70,000 - $120,000',
      successRate: 85,
      jobGrowth: '+13%',
      prerequisites: ['Creative mindset', 'Basic design principles'],
      learningStyle: ['visual', 'creative'],
      timeCommitment: '12-18 hours/week',
      difficulty: 'beginner',
      trending: false
    },
    {
      id: 4,
      title: 'Cloud Architect',
      description: 'Design and implement scalable cloud solutions with enterprise focus',
      courses: 7,
      duration: '5 months',
      level: 'Advanced',
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps'],
      icon: FaCloud,
      color: 'orange',
      aiMatch: 78,
      marketDemand: 'very-high',
      salaryRange: '$110,000 - $180,000',
      successRate: 87,
      jobGrowth: '+28%',
      prerequisites: ['System administration', 'Networking basics'],
      learningStyle: ['technical', 'hands-on'],
      timeCommitment: '25-30 hours/week',
      difficulty: 'advanced',
      trending: true
    },
    {
      id: 5,
      title: 'AI/ML Engineer',
      description: 'Build intelligent systems and machine learning models',
      courses: 9,
      duration: '7 months',
      level: 'Advanced',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'MLOps'],
      icon: FaRobot,
      color: 'indigo',
      aiMatch: 85,
      marketDemand: 'very-high',
      salaryRange: '$120,000 - $200,000',
      successRate: 91,
      jobGrowth: '+40%',
      prerequisites: ['Advanced Python', 'Mathematics', 'Statistics'],
      learningStyle: ['research-based', 'experimental'],
      timeCommitment: '30+ hours/week',
      difficulty: 'expert',
      trending: true
    },
    {
      id: 6,
      title: 'Cybersecurity Specialist',
      description: 'Protect digital assets and secure enterprise systems',
      courses: 6,
      duration: '4 months',
      level: 'Intermediate',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance'],
      icon: FaShieldAlt,
      color: 'red',
      aiMatch: 82,
      marketDemand: 'high',
      salaryRange: '$85,000 - $140,000',
      successRate: 88,
      jobGrowth: '+31%',
      prerequisites: ['Networking fundamentals', 'System administration'],
      learningStyle: ['problem-solving', 'analytical'],
      timeCommitment: '18-22 hours/week',
      difficulty: 'intermediate',
      trending: true
    }
  ];

  const pathFilters = [
    { id: 'recommended', name: 'AI Recommended', icon: FaRobot },
    { id: 'trending', name: 'Trending', icon: FaRocket },
    { id: 'high-demand', name: 'High Demand', icon: FaChartLine },
    { id: 'beginner', name: 'Beginner Friendly', icon: FaGraduationCap },
    { id: 'advanced', name: 'Advanced', icon: FaAward }
  ];

  const getFilteredPaths = () => {
    switch (selectedPathFilter) {
      case 'trending':
        return learningPaths.filter(path => path.trending);
      case 'high-demand':
        return learningPaths.filter(path => path.marketDemand === 'very-high');
      case 'beginner':
        return learningPaths.filter(path => path.difficulty === 'beginner' || path.difficulty === 'intermediate');
      case 'advanced':
        return learningPaths.filter(path => path.difficulty === 'advanced' || path.difficulty === 'expert');
      default:
        return learningPaths.sort((a, b) => b.aiMatch - a.aiMatch);
    }
  };

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

  const filteredCourses = selectedCategory === 'all' 
    ? featuredCourses 
    : featuredCourses.filter(course => course.category === selectedCategory);

  // AI Career Quiz Data
  const quizQuestions = [
    {
      id: 1,
      question: "What type of work environment energizes you most?",
      options: [
        { id: 'a', text: 'Collaborative team projects', icon: FaUsers, career: 'frontend' },
        { id: 'b', text: 'Independent problem-solving', icon: FaLaptopCode, career: 'backend' },
        { id: 'c', text: 'Creative design challenges', icon: FaPalette, career: 'design' },
        { id: 'd', text: 'Data analysis & insights', icon: FaChartBar, career: 'data' }
      ]
    },
    {
      id: 2,
      question: "Which technology area excites you most?",
      options: [
        { id: 'a', text: 'Artificial Intelligence & ML', icon: FaRobot, career: 'ai' },
        { id: 'b', text: 'Cloud & Infrastructure', icon: FaCloud, career: 'cloud' },
        { id: 'c', text: 'Mobile App Development', icon: FaMobile, career: 'mobile' },
        { id: 'd', text: 'Web Development', icon: FaCode, career: 'web' }
      ]
    },
    {
      id: 3,
      question: "What's your preferred learning style?",
      options: [
        { id: 'a', text: 'Hands-on coding projects', icon: FaLaptopCode, career: 'developer' },
        { id: 'b', text: 'Visual design & prototyping', icon: FaPalette, career: 'designer' },
        { id: 'c', text: 'Data analysis & research', icon: FaDatabase, career: 'analyst' },
        { id: 'd', text: 'Strategic planning & management', icon: FaBriefcase, career: 'manager' }
      ]
    },
    {
      id: 4,
      question: "Which career outcome appeals to you most?",
      options: [
        { id: 'a', text: 'Building innovative products', icon: FaRocket, career: 'product' },
        { id: 'b', text: 'Leading technical teams', icon: FaUsers, career: 'lead' },
        { id: 'c', text: 'Solving complex problems', icon: FaLightbulb, career: 'engineer' },
        { id: 'd', text: 'Creating beautiful experiences', icon: FaHeart, career: 'ux' }
      ]
    },
    {
      id: 5,
      question: "What's your ideal work-life balance?",
      options: [
        { id: 'a', text: 'Flexible remote work', icon: FaGlobe, career: 'remote' },
        { id: 'b', text: 'Startup environment', icon: FaRocket, career: 'startup' },
        { id: 'c', text: 'Corporate stability', icon: FaBuilding, career: 'corporate' },
        { id: 'd', text: 'Freelance independence', icon: FaUserTie, career: 'freelance' }
      ]
    }
  ];

  const careerResults = {
    'Full Stack Developer': {
      match: 95,
      salary: '$85,000 - $130,000',
      growth: '+22% by 2030',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      description: 'Build end-to-end web applications with modern technologies',
      icon: FaCode,
      color: 'blue'
    },
    'Data Scientist': {
      match: 88,
      salary: '$95,000 - $150,000',
      growth: '+35% by 2030',
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
      description: 'Extract insights from data to drive business decisions',
      icon: FaChartLine,
      color: 'green'
    },
    'UX/UI Designer': {
      match: 92,
      salary: '$70,000 - $120,000',
      growth: '+13% by 2030',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      description: 'Create intuitive and beautiful user experiences',
      icon: FaPalette,
      color: 'purple'
    }
  };

  // Quiz Functions
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setQuizAnswers({});
    setQuizProgress(0);
  };

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...quizAnswers, [questionId]: answer };
    setQuizAnswers(newAnswers);
    
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    setQuizProgress(progress);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Quiz completed, start analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const handleKeyPress = (event, questionId, answer) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleAnswer(questionId, answer);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setQuizAnswers({});
    setIsAnalyzing(false);
    setShowResults(false);
    setQuizProgress(0);
  };

  // Animate weekly takers counter
  useEffect(() => {
    const interval = setInterval(() => {
      setWeeklyTakers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  // Company modal functions
  const openCompanyModal = (company) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  const closeCompanyModal = () => {
    setShowCompanyModal(false);
    setSelectedCompany(null);
  };

  // AI Pathfinder functions
  const generateAIPaths = async () => {
    if (!currentRole || !targetRole) return;
    
    setAiGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const matchedPaths = learningPaths
        .map(path => ({
          ...path,
          aiMatch: Math.max(60, Math.floor(Math.random() * 40) + 60),
          personalizedDuration: adjustTimelineForUser(path.duration, timeline),
          customizedSkills: path.skills.slice(0, 4)
        }))
        .sort((a, b) => b.aiMatch - a.aiMatch)
        .slice(0, 3);
      
      setAiPaths(matchedPaths);
      setAiGenerating(false);
    }, 2500);
  };

  const adjustTimelineForUser = (baseDuration, userTimeline) => {
    const baseMonths = parseInt(baseDuration);
    const userMonths = parseInt(userTimeline);
    const ratio = userMonths / 6; // 6 months as baseline
    return `${Math.max(2, Math.round(baseMonths * ratio))} months`;
  };

  const togglePathComparison = (path) => {
    if (comparedPaths.find(p => p.id === path.id)) {
      setComparedPaths(comparedPaths.filter(p => p.id !== path.id));
    } else if (comparedPaths.length < 3) {
      setComparedPaths([...comparedPaths, path]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* AI Career Quiz Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!quizStarted && !showResults ? (
            // Quiz Introduction
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
                <FaRobot className="text-cyan-400 mr-2" />
                <span className="text-cyan-300 text-sm font-medium">AI-Powered Career Analysis</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Discover Your Perfect
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Tech Career in 60 Seconds
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Our advanced AI analyzes your preferences, skills, and goals to recommend the perfect tech career path with personalized learning roadmaps and salary insights.
              </p>

              {/* Quick Stats Showcase */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaLightbulb className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Personalized Learning Path</h3>
                  <p className="text-gray-300">Custom roadmap based on your career goals and current skills</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Salary Insights</h3>
                  <p className="text-gray-300">Real market data for your recommended career path</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaBullseye className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Job Match Score</h3>
                  <p className="text-gray-300">AI-calculated compatibility with top tech roles</p>
                </div>
              </div>

              {/* Start Quiz CTA */}
              <div className="space-y-6">
                <button
                  onClick={startQuiz}
                  className="group relative inline-flex items-center px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg md:text-xl rounded-xl md:rounded-2xl hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 active:shadow-cyan-500/40 transform hover:-translate-y-1 active:translate-y-0 touch-manipulation"
                  aria-label="Start AI Career Quiz - Takes 2 minutes"
                >
                  <FaRocket className="mr-2 md:mr-3 text-lg md:text-xl group-hover:animate-bounce" />
                  <span className="hidden sm:inline">Start AI Career Quiz</span>
                  <span className="sm:hidden">Start Quiz</span>
                  <FaArrowRight className="ml-2 md:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                </button>
                
                <div className="flex items-center justify-center space-x-4 text-gray-400">
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>2 minutes</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <div className="flex items-center">
                    <FaUsers className="mr-2" />
                    <span>{weeklyTakers.toLocaleString()} took this week</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <div className="flex items-center">
                    <FaShieldAlt className="mr-2" />
                    <span>100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          ) : quizStarted && !isAnalyzing && !showResults ? (
            // Quiz Interface
            <div className="max-w-4xl mx-auto" role="main" aria-live="polite">
              {/* Progress Bar */}
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                  <span className="text-cyan-300 font-medium text-sm md:text-base">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span className="text-cyan-300 font-medium text-sm md:text-base">{Math.round(quizProgress)}% Complete</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 md:h-3 backdrop-blur-sm overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${quizProgress}%` }}
                    role="progressbar"
                    aria-valuenow={Math.round(quizProgress)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`Quiz progress: ${Math.round(quizProgress)}% complete`}
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 mb-8">
                <h3 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center leading-tight">
                  {quizQuestions[currentQuestion]?.question}
                </h3>
                
                <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                  {quizQuestions[currentQuestion]?.options.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option)}
                      onKeyDown={(e) => handleKeyPress(e, quizQuestions[currentQuestion].id, option)}
                      className={`group relative p-4 md:p-6 bg-white/5 hover:bg-white/15 active:bg-white/20 border border-white/20 hover:border-cyan-400/50 active:border-cyan-400/70 focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-xl md:rounded-2xl transition-all duration-300 text-left transform hover:-translate-y-1 active:scale-95 focus:-translate-y-1 hover:shadow-xl focus:shadow-xl touch-manipulation quiz-option-${index + 1}`}
                      tabIndex={0}
                      role="button"
                      aria-label={`Option ${index + 1}: ${option.text}`}
                    >
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg md:rounded-xl group-hover:from-cyan-500/40 group-hover:to-blue-600/40 group-active:from-cyan-500/60 group-active:to-blue-600/60 group-focus:from-cyan-500/40 group-focus:to-blue-600/40 transition-all duration-300 flex-shrink-0">
                          <option.icon className="text-lg md:text-xl text-cyan-400" />
                        </div>
                        <span className="text-white font-medium text-base md:text-lg group-hover:text-cyan-300 group-focus:text-cyan-300 transition-colors duration-300 leading-snug">
                          {option.text}
                        </span>
                        <div className="ml-auto text-xs text-gray-400 opacity-0 group-focus:opacity-100 transition-opacity duration-300">
                          Press Enter
                        </div>
                      </div>
                      
                      {/* Mobile tap feedback */}
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Selection indicator */}
                      <div className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 border-2 border-white/30 rounded-full group-hover:border-cyan-400/50 group-focus:border-cyan-400/50 transition-colors duration-300">
                        <div className="w-full h-full bg-cyan-400 rounded-full scale-0 group-active:scale-75 transition-transform duration-150"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              {currentQuestion > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg transition-colors duration-300 touch-manipulation"
                    aria-label="Go to previous question"
                  >
                    <FaChevronLeft className="mr-2" />
                    <span className="hidden sm:inline">Previous Question</span>
                    <span className="sm:hidden">Previous</span>
                  </button>
                </div>
              )}
            </div>
          ) : isAnalyzing ? (
            // AI Analysis Animation
            <div className="max-w-2xl mx-auto text-center" role="status" aria-live="polite">
              <div className="relative mb-8">
                {/* Animated AI Brain */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse"></div>
                  <div className="absolute inset-1 md:inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
                  <div className="absolute inset-2 md:inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse animation-delay-2000"></div>
                  <FaRobot className="absolute inset-0 m-auto text-2xl md:text-4xl text-white z-10" />
                </div>
                
                {/* Particle Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 md:w-2 md:h-2 bg-cyan-400 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">AI Analyzing Your Responses</h3>
              <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base px-4">Processing your preferences and matching with 10,000+ career profiles...</p>
              
              <div className="space-y-3 md:space-y-4 text-left max-w-sm md:max-w-md mx-auto px-4">
                {[
                  'Analyzing personality traits...',
                  'Matching skills and interests...',
                  'Calculating salary projections...',
                  'Generating learning roadmap...'
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300 text-sm md:text-base">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse flex-shrink-0" style={{ animationDelay: `${index * 500}ms` }}></div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              
              {/* Loading progress indicator */}
              <div className="mt-6 md:mt-8">
                <div className="w-full max-w-xs mx-auto bg-white/20 rounded-full h-1 md:h-2 backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          ) : showResults ? (
            // Results Display
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-flex items-center px-3 md:px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-4 md:mb-6 backdrop-blur-sm">
                  <FaCheck className="text-green-400 mr-2" />
                  <span className="text-green-300 text-xs md:text-sm font-medium">Analysis Complete</span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-4">Your Perfect Career Match</h3>
                <p className="text-gray-300 text-base md:text-lg px-4">Based on your responses, here's your personalized career recommendation</p>
              </div>

              {/* Career Recommendation Cards */}
              <div className="grid gap-6 md:gap-8 lg:grid-cols-3 mb-8 md:mb-12 px-4">
                {Object.entries(careerResults).map(([career, data], index) => (
                  <div
                    key={career}
                    className={`relative bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border transition-all duration-500 transform hover:-translate-y-2 ${
                      index === 0 
                        ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 md:scale-105' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {index === 0 && (
                      <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold">
                          Best Match
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-4 md:mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-${data.color}-500 to-${data.color}-600 rounded-xl md:rounded-2xl mb-3 md:mb-4`}>
                        <data.icon className="text-2xl md:text-3xl text-white" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{career}</h4>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">{data.description}</p>
                    </div>
                    
                    {/* Match Score */}
                    <div className="mb-4 md:mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm md:text-base">Match Score</span>
                        <span className="text-cyan-400 font-bold text-sm md:text-base">{data.match}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${data.match}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Career Details */}
                    <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="text-gray-300">Salary Range:</span>
                        <span className="text-green-400 font-semibold">{data.salary}</span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="text-gray-300">Job Growth:</span>
                        <span className="text-blue-400 font-semibold">{data.growth}</span>
                      </div>
                    </div>
                    
                    {/* Skills */}
                    <div className="mb-4 md:mb-6">
                      <h5 className="text-white font-semibold mb-2 md:mb-3 text-sm md:text-base">Key Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 md:px-3 py-1 bg-white/20 text-cyan-300 rounded-full text-xs md:text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {index === 0 && (
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 md:py-3 rounded-lg md:rounded-xl hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 transition-all duration-300 text-sm md:text-base touch-manipulation">
                        View Full Roadmap
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="text-center space-y-4 px-4">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg md:rounded-xl hover:from-cyan-400 hover:to-blue-500 active:from-cyan-600 active:to-blue-700 transition-all duration-300 shadow-xl text-sm md:text-base touch-manipulation"
                  >
                    <FaRocket className="mr-2 md:mr-3" />
                    <span className="hidden sm:inline">Start Learning Journey</span>
                    <span className="sm:hidden">Start Learning</span>
                  </Link>
                  
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 text-white font-semibold rounded-lg md:rounded-xl hover:bg-white/10 active:bg-white/20 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-sm md:text-base touch-manipulation"
                  >
                    <FaArrowRight className="mr-2 md:mr-3 transform rotate-180" />
                    Retake Quiz
                  </button>
                </div>
                
                <p className="text-gray-400 text-xs md:text-sm">
                  Want to share your results? 
                  <button className="text-cyan-400 hover:text-cyan-300 focus:text-cyan-300 ml-1 underline focus:outline-none">
                    Download PDF Report
                  </button>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Enhanced Trusted Companies Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
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
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Trusted by Industry Leaders &
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Innovators Worldwide
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join {companyCount.toLocaleString()}+ companies who trust our platform for talent development
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">{companyCount.toLocaleString()}+</div>
                <div className="text-gray-300 text-sm md:text-base">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">98%</div>
                <div className="text-gray-300 text-sm md:text-base">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">150+</div>
                <div className="text-gray-300 text-sm md:text-base">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm md:text-base">Global Support</div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              {companyFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCompanyFilter(filter.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                    selectedCompanyFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                  }`}
                >
                  {filter.name}
                  <span className="ml-2 text-xs opacity-75">({filter.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Company Logos Carousel */}
          <div className="relative">
            {/* Desktop: Infinite Scroll Carousel */}
            <div className="hidden md:block overflow-hidden">
              <div className="flex space-x-8 animate-scroll">
                {[...filteredCompanies, ...filteredCompanies].map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    onClick={() => openCompanyModal(company)}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25 w-48 h-32">
                      {/* Partner Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                        Since {company.partnerSince}
                      </div>
                      
                      <div className="flex flex-col items-center justify-center h-full">
                        <company.icon className={`text-4xl ${company.color} group-hover:scale-110 transition-all duration-300 mb-3 filter grayscale group-hover:grayscale-0`} />
                        <span className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
                          {company.name}
                        </span>
                        <span className="text-gray-400 text-xs mt-1">
                          {company.employees} employees
                        </span>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Touch-Friendly Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {filteredCompanies.slice(0, 6).map((company, index) => (
                <div
                  key={company.name}
                  onClick={() => openCompanyModal(company)}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-blue-400/50 transition-all duration-300 active:scale-95 touch-manipulation">
                    <div className="text-center">
                      <company.icon className={`text-3xl ${company.color} mb-2 mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-300`} />
                      <span className="text-white font-medium text-sm block">{company.name}</span>
                      <span className="text-gray-400 text-xs">{company.hires} hires</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows (Desktop) */}
            <button 
              onClick={() => setCurrentCarouselIndex(prev => Math.max(0, prev - 1))}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentCarouselIndex(prev => (prev + 1) % Math.ceil(filteredCompanies.length / 6))}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Featured Testimonial */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 max-w-4xl mx-auto">
              <FaQuoteLeft className="text-3xl text-blue-400 mb-4 mx-auto" />
              <p className="text-lg md:text-xl text-gray-200 mb-6 italic leading-relaxed">
                "CareerBox has transformed how we approach talent development. The quality of candidates and the comprehensive training programs have exceeded our expectations."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaGoogle className="text-white text-xl" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-gray-400 text-sm">VP of Engineering, Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Detail Modal */}
        {showCompanyModal && selectedCompany && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeCompanyModal}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <selectedCompany.icon className={`text-4xl ${selectedCompany.color}`} />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedCompany.name}</h3>
                    <p className="text-gray-300">{selectedCompany.description}</p>
                  </div>
                </div>
                <button 
                  onClick={closeCompanyModal}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Partnership Since:</span>
                    <span className="text-blue-400 font-semibold">{selectedCompany.partnerSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Employees:</span>
                    <span className="text-green-400 font-semibold">{selectedCompany.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hires Through Platform:</span>
                    <span className="text-purple-400 font-semibold">{selectedCompany.hires}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Key Skills They Hire:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <FaQuoteLeft className="text-blue-400 mb-2" />
                <p className="text-gray-200 italic">"{selectedCompany.testimonial}"</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/jobs"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 text-center"
                >
                  <FaExternalLinkAlt className="inline mr-2" />
                  View Open Positions
                </Link>
                <button className="flex-1 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Our <span className="text-blue-600">Course Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover world-class courses across diverse fields and advance your career with industry-relevant skills
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative bg-white rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 transform hover:-translate-y-2 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-blue-200'
                    : 'border-transparent hover:border-blue-200'
                }`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-2xl mb-3 sm:mb-6 transition-all duration-300 group-hover:scale-110 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-600'
                  }`}>
                    <category.icon className="text-xl sm:text-3xl" />
                  </div>
                  
                  <h3 className={`text-sm sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
                    selectedCategory === category.id ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {category.name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2 sm:mb-4">
                    <span className={`text-lg sm:text-2xl font-bold ${
                      selectedCategory === category.id ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {category.count}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">courses</span>
                  </div>
                  
                  <div className={`inline-flex items-center text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'text-blue-600' 
                      : 'text-gray-500 group-hover:text-blue-600'
                  }`}>
                    Explore courses
                    <FaArrowRight className="ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <category.icon className="text-4xl text-blue-500" />
                </div>
                
                {selectedCategory === category.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-xs" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* View All Categories Button */}
          <div className="text-center mt-12">
            <Link 
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaGlobe className="mr-3" />
              View All 2000+ Courses
              <FaArrowRight className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Courses
              </h2>
              <p className="text-gray-600">Courses that help you keep up with the latest trends</p>
            </div>
            <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center whitespace-nowrap">
              View all <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  {course.bestseller && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Bestseller
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaHeart className="text-gray-400 hover:text-red-500" />
                  </button>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <FaPlay className="text-blue-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <span className="text-orange-500 font-bold text-sm mr-1">{course.rating}</span>
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
                      <span className="text-lg font-bold text-gray-900">${course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
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

      {/* AI-Powered Career Navigator Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 mb-6">
              <FaRobot className="text-blue-600 mr-2" />
              <span className="text-blue-800 text-sm font-medium">AI-Powered Intelligence</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Career Navigator
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Intelligent learning paths that adapt to your goals, skills, and market demands using advanced AI algorithms
            </p>

            {/* AI Pathfinder Widget */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FaRobot className="text-white text-lg" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Try AI Pathfinder</h3>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Role</label>
                    <input
                      type="text"
                      value={currentRole}
                      onChange={(e) => setCurrentRole(e.target.value)}
                      placeholder="e.g., Marketing Coordinator"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g., Data Scientist"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/70"
                    >
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">1 year</option>
                      <option value="24">2 years</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={generateAIPaths}
                  disabled={!currentRole || !targetRole || aiGenerating}
                  className="w-full md:w-auto mx-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {aiGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      AI Generating Paths...
                    </>
                  ) : (
                    <>
                      <FaRocket className="mr-3" />
                      Generate My AI Path
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Path Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {pathFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedPathFilter(filter.id)}
                className={`flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                  selectedPathFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                <filter.icon className="mr-2" />
                {filter.name}
              </button>
            ))}
          </div>

          {/* AI Generated Paths or Default Paths */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(aiPaths.length > 0 ? aiPaths : getFilteredPaths()).map((path, index) => (
              <div
                key={path.id}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* AI Match Score Ring */}
                <div className="absolute -top-4 -right-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                      <circle 
                        cx="32" cy="32" r="28" fill="none" 
                        stroke={path.aiMatch >= 90 ? '#10b981' : path.aiMatch >= 80 ? '#3b82f6' : '#f59e0b'}
                        strokeWidth="4"
                        strokeDasharray={`${(path.aiMatch / 100) * 175.93} 175.93`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">{path.aiMatch}%</span>
                    </div>
                  </div>
                </div>

                {/* Trending Badge */}
                {path.trending && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <FaRocket className="mr-1" />
                      Trending
                    </div>
                  </div>
                )}

                {/* Market Demand Indicator */}
                <div className="absolute top-4 right-20">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    path.marketDemand === 'very-high' ? 'bg-green-100 text-green-800' :
                    path.marketDemand === 'high' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {path.marketDemand === 'very-high' ? '🔥 Very High' :
                     path.marketDemand === 'high' ? '📈 High' : '📊 Medium'} Demand
                  </div>
                </div>

                <div className="mt-8">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${path.color}-500 to-${path.color}-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <path.icon className="text-2xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {path.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{path.description}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-gray-900">{path.personalizedDuration || path.duration}</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-green-600">{path.salaryRange.split(' - ')[1]}</div>
                      <div className="text-xs text-gray-600">Max Salary</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-blue-600">{path.successRate}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-lg font-bold text-purple-600">{path.jobGrowth}</div>
                      <div className="text-xs text-gray-600">Job Growth</div>
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(path.customizedSkills || path.skills.slice(0, 4)).map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                      {path.skills.length > 4 && (
                        <span className="text-xs text-gray-500 px-2 py-1">+{path.skills.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/courses"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-center text-sm"
                    >
                      Start Learning
                    </Link>
                    <button
                      onClick={() => togglePathComparison(path)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
                        comparedPaths.find(p => p.id === path.id)
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {comparedPaths.find(p => p.id === path.id) ? 'Remove' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Path Comparison Panel */}
          {comparedPaths.length > 0 && (
            <div className="mt-16">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Path Comparison</h3>
                  <button
                    onClick={() => setComparedPaths([])}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {comparedPaths.map((path) => (
                    <div key={path.id} className="border border-gray-200 rounded-2xl p-4">
                      <div className="flex items-center mb-4">
                        <path.icon className={`text-2xl text-${path.color}-600 mr-3`} />
                        <h4 className="font-bold text-gray-900">{path.title}</h4>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">AI Match:</span>
                          <span className="font-semibold text-blue-600">{path.aiMatch}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold">{path.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate:</span>
                          <span className="font-semibold text-green-600">{path.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Job Growth:</span>
                          <span className="font-semibold text-purple-600">{path.jobGrowth}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-start">
                    <FaRobot className="text-blue-600 text-xl mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">AI Recommendation</h4>
                      <p className="text-blue-800 text-sm">
                        Based on your comparison, <strong>{comparedPaths[0]?.title}</strong> offers the best combination of 
                        market demand, salary potential, and success rate for your career transition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your AI-Guided Journey?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of learners who've transformed their careers with our intelligent platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  <FaRocket className="mr-3" />
                  Start Free Trial
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <FaEye className="mr-3" />
                  Explore All Paths
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Spotlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Learn from <span className="text-blue-600">Industry Experts</span>
            </h2>
            <p className="text-xl text-gray-600">World-class instructors with real-world experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white rounded-2xl p-2 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <img 
                    src={instructor.avatar} 
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                  <p className="text-blue-600 font-medium">{instructor.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{instructor.students}</div>
                    <div className="text-sm text-gray-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{instructor.courses}</div>
                    <div className="text-sm text-gray-500">Courses</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <FaStar className="text-orange-500" />
                  <span className="ml-1 font-bold">{instructor.rating}</span>
                  <span className="ml-2 text-gray-500">({instructor.reviews} reviews)</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {instructor.expertise.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm text-center mb-6">{instructor.bio}</p>
                
                <Link 
                  to="/trainers"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transforming Lives <span className="text-blue-300">Globally</span>
            </h2>
            <p className="text-blue-100 text-lg">Join millions of learners advancing their careers with CareerBox</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="text-4xl mx-auto mb-4 text-blue-300" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium mb-1">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="text-blue-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600">Real career transformations from our community</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <FaQuoteLeft className="text-4xl text-blue-300 mb-6" />
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full mr-4 border-3 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                      <p className="text-blue-600 font-medium">{testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-4">Career Impact</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Courses Completed:</span>
                        <span className="font-bold text-blue-600">{testimonials[currentTestimonial].coursesTaken}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary Increase:</span>
                        <span className="font-bold text-green-600">+{testimonials[currentTestimonial].salaryIncrease}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time to Success:</span>
                        <span className="font-bold text-purple-600">18 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join millions of learners and start building the skills that will advance your career today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Learning Today <FaArrowRight className="ml-2" />
            </Link>
            
            <Link 
              to="/courses"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <FaPlay className="mr-2" />
              Explore Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
            <div className="flex flex-col items-center">
              <FaCheck className="text-green-500 text-2xl mb-2" />
              <span className="font-medium">Free to get started</span>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCertificate className="text-blue-500 text-2xl mb-2" />
              <span className="font-medium">Industry certificates</span>
              <span className="text-sm">Recognized by employers</span>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-purple-500 text-2xl mb-2" />
              <span className="font-medium">Expert support</span>
              <span className="text-sm">24/7 community help</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;