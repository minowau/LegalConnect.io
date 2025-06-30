import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MessageCircle, 
  Mic, 
  Scale, 
  Clock, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Brain,
  Globe,
  Award,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Quote
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

const HomePage: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI analyzes your case details and matches you with the perfect lawyer in seconds.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mic,
      title: 'Voice Recognition',
      description: 'Simply speak your legal concerns. Our voice AI understands context and nuance.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Instant Connections',
      description: 'Connect with qualified lawyers immediately. No waiting, no delays, just results.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Verified Experts',
      description: 'Every lawyer is thoroughly vetted, licensed, and has proven track records.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Cases Resolved', icon: CheckCircle },
    { number: '2,500+', label: 'Expert Lawyers', icon: Users },
    { number: '99.2%', label: 'Success Rate', icon: TrendingUp },
    { number: '24/7', label: 'AI Support', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'LegalConnect AI found me the perfect corporate lawyer in under 2 minutes. The voice AI understood my complex business needs immediately.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Chen',
      role: 'Accident Victim',
      content: 'After my car accident, I was overwhelmed. The AI guided me through everything and connected me with an amazing personal injury lawyer.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Homeowner',
      content: 'The real estate legal issues seemed impossible until LegalConnect AI matched me with a specialist who resolved everything quickly.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent-400/20 to-secondary-400/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="h-4 w-4 text-accent-400" />
                <span className="text-sm font-medium">Powered by Advanced AI</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-accent-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent animate-gradient bg-300%">
                  Legal Services
                </span>
                <span className="block text-4xl lg:text-5xl font-light text-gray-200">
                  is Here
                </span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                Experience revolutionary AI that understands your legal needs, speaks your language, 
                and connects you with the perfect lawyer in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAssistantOpen(true)}
                  className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mic className="h-5 w-5 group-hover:animate-pulse" />
                  <span className="font-semibold">Start with Voice AI</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <Link
                  to="/lawyers"
                  className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <span className="font-semibold">Browse Lawyers</span>
                  <Users className="h-5 w-5" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-secondary-400" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-accent-400" />
                  <span>Licensed Lawyers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary-400" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* AI Interface Mockup */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-secondary-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Assistant Active</span>
                  <div className="ml-auto bg-secondary-400/20 rounded-full px-3 py-1 text-xs">
                    Live
                  </div>
                </div>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <Mic className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">You</span>
                    </div>
                    <p className="text-sm">"I need help with a personal injury case from a car accident..."</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="bg-gradient-to-r from-accent-500/20 to-secondary-500/20 rounded-2xl p-4 backdrop-blur-sm border border-accent-400/30"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-accent-400 to-secondary-400 rounded-full flex items-center justify-center">
                        <Brain className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">AI Assistant</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary-400" />
                        <span>Analyzed your case details</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary-400" />
                        <span>Found 12 personal injury specialists</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-secondary-400" />
                        <span>Top match: 98% compatibility</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-accent-400 to-secondary-400 rounded-full opacity-60"
                ></motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real people
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Revolutionary Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We've reimagined how legal services work. Our AI doesn't just match you with lawyers—it understands your story.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories of Success
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real results, real impact
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-12 text-center relative"
            >
              <Quote className="h-12 w-12 text-primary-300 mx-auto mb-6" />
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed font-light">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-primary-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Your Legal Solution
              <span className="block text-accent-300">Awaits</span>
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Don't let legal challenges overwhelm you. Join thousands who have found their perfect legal match through our revolutionary AI platform.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAssistantOpen(true)}
                className="group bg-accent-500 text-white px-10 py-4 rounded-xl hover:bg-accent-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <Mic className="h-5 w-5 group-hover:animate-pulse" />
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <Link
                to="/lawyers"
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg border border-white/20 flex items-center justify-center space-x-2"
              >
                <span>Browse Experts</span>
                <Users className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating AI Assistant Button */}
      {!isAssistantOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full shadow-2xl hover:shadow-accent-500/25 transition-all duration-300 flex items-center justify-center z-50 animate-glow"
        >
          <MessageCircle className="h-7 w-7" />
        </motion.button>
      )}

      {/* AI Assistant */}
      <AIAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
};

export default HomePage;