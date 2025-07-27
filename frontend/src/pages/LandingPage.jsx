import React, { useState, useEffect } from 'react';
import { FaHeart, FaUser, FaClock, FaMapMarkerAlt, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { MdExplore, MdTravelExplore, MdLocationOn } from 'react-icons/md';

const TravelLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  // Sample blog data - replace with your actual data
  const featuredBlogs = [
    {
      id: 1,
      title: "Sunset Paradise in Santorini",
      excerpt: "Discovering the magical blue domes and breathtaking sunsets of this Greek island paradise...",
      author: "Sarah Johnson",
      date: "2 days ago",
      readTime: "5 min read",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 234,
      isFeatured: true
    },
    {
      id: 2,
      title: "Hidden Gems of Kyoto",
      excerpt: "Exploring ancient temples and traditional gardens in Japan's cultural heart...",
      author: "Mike Chen",
      date: "1 week ago",
      readTime: "8 min read",
      location: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 189,
      isFeatured: true
    },
    {
      id: 3,
      title: "Northern Lights Adventure",
      excerpt: "Chasing the aurora borealis across the frozen landscapes of Iceland...",
      author: "Emma Nordic",
      date: "3 days ago",
      readTime: "6 min read",
      location: "Iceland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 456,
      isFeatured: true
    }
  ];

  const allBlogs = [
    ...featuredBlogs,
    {
      id: 4,
      title: "Bali Rice Terraces Wonder",
      excerpt: "Walking through the stunning emerald rice paddies of Jatiluwih...",
      author: "David Wilson",
      date: "5 days ago",
      readTime: "4 min read",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 167
    },
    {
      id: 5,
      title: "Moroccan Desert Safari",
      excerpt: "Camel trekking through the golden dunes of the Sahara Desert...",
      author: "Aisha Mansouri",
      date: "1 week ago",
      readTime: "7 min read",
      location: "Merzouga, Morocco",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73d85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 298
    },
    {
      id: 6,
      title: "Swiss Alpine Adventure",
      excerpt: "Hiking through pristine mountain trails and crystal-clear lakes...",
      author: "Lucas Alpine",
      date: "2 weeks ago",
      readTime: "9 min read",
      location: "Zermatt, Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 342
    }
  ];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Discover Your Next Adventure",
      subtitle: "Share your travel stories with the world",
      cta: "Start Your Journey"
    },
    {
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Capture Every Moment",
      subtitle: "Turn memories into inspiring stories",
      cta: "Create Your Story"
    },
    {
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Connect with Fellow Travelers",
      subtitle: "Join a community of adventure seekers",
      cta: "Join Community"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => Math.min(prev + 6, allBlogs.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <MdTravelExplore className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                TravelStory
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#stories" className="text-slate-700 hover:text-cyan-600 transition-colors">Stories</a>
              <a href="#explore" className="text-slate-700 hover:text-cyan-600 transition-colors">Explore</a>
              <a href="#community" className="text-slate-700 hover:text-cyan-600 transition-colors">Community</a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            </div>
          ))}
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
                {heroSlides[currentSlide].cta}
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Decorative Wave */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-current text-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      {/* Featured Stories Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Featured Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover amazing adventures and breathtaking destinations through the eyes of fellow travelers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${
                  index === 1 ? 'md:scale-105 md:-mt-8' : ''
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <FaHeart className="text-red-500 text-sm" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {blog.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-600 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-cyan-600">
                        <FaMapMarkerAlt className="text-sm" />
                        <span className="text-sm font-medium">{blog.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <FaHeart className="text-sm" />
                        <span className="text-sm">{blog.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Stories Section */}
      <section id="stories" className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50 relative">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Latest Adventures
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get inspired by the latest travel stories from our community of explorers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.slice(0, visibleBlogs).map((blog) => (
              <div
                key={blog.id}
                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 text-sm line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-cyan-600">
                        <MdLocationOn className="text-sm" />
                        <span className="text-sm font-medium">{blog.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaHeart className="text-sm text-slate-400" />
                        <span className="text-sm text-slate-500">{blog.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleBlogs < allBlogs.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreBlogs}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
              >
                Load More Stories
                <MdExplore className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              What Travelers Say
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of happy travelers sharing their stories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                text: "TravelStory helped me document my amazing journey through Europe. The platform is intuitive and the community is incredibly supportive!",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                name: "Marco Rodriguez",
                location: "Barcelona, Spain",
                text: "I love how easy it is to share my travel experiences and connect with fellow adventurers. This platform has become essential for my travels.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                name: "Yuki Tanaka",
                location: "Tokyo, Japan",
                text: "The stories I've read here have inspired countless adventures. It's amazing to see the world through other travelers' experiences.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <FaQuoteLeft className="text-3xl text-cyan-400 mb-4" />
                <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 relative overflow-hidden">
        
        
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of travelers and start documenting your adventures today. 
            Your next great story is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              Start Writing
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MdTravelExplore className="text-white" />
                </div>
                <h3 className="text-xl font-bold">TravelStory</h3>
              </div>
              <p className="text-slate-400">
                Share your travel experiences and connect with fellow adventurers around the world.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Featured Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Latest Adventures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Popular Destinations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Join Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 TravelStory. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default TravelLandingPage;