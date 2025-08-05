import React from 'react'
import { FaClock, FaHeart, FaMapMarkerAlt, FaUser } from 'react-icons/fa'

const FeaturedStories = ({ featuredBlogs }) => {
    return (
        <>
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
                                className={`group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${index === 1 ? 'md:scale-105 md:-mt-8' : ''
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
        </>
    )
}

export default FeaturedStories