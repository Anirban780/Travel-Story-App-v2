import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { MdExplore, MdLocationOn } from 'react-icons/md'


const Stories = ({allBlogs, visibleBlogs, loadMoreBlogs}) => {
  return (
    <>
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
    </>
  )
}

export default Stories