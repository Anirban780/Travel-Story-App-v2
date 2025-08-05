import React, { useState, useEffect } from 'react';
import Footer from '../components/LandingPage/Footer';
import Testimonials from '../components/LandingPage/Testimonials';
import Stories from '../components/LandingPage/Stories';
import FeaturedStories from '../components/LandingPage/FeaturedStories';
import HeroSection from '../components/LandingPage/HeroSection';
import Navbar from '../components/LandingPage/Navbar';

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
  }, [heroSlides.length]);

  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => Math.min(prev + 6, allBlogs.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        heroSlides={heroSlides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide} />

      {/* Decorative Wave */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-current text-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      {/* Featured Stories Section */}
      <FeaturedStories featuredBlogs={featuredBlogs} />

      {/* All Stories Section */}
      <Stories
        allBlogs={allBlogs}
        visibleBlogs={visibleBlogs}
        loadMoreBlogs={loadMoreBlogs} />

      {/* Testimonials Section */}
      <Testimonials />

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
      <Footer />
    </div>

  );
}

export default TravelLandingPage;