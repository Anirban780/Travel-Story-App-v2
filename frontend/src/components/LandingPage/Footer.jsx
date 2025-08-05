import React from 'react'
import { MdTravelExplore } from 'react-icons/md'

const Footer = () => {
    return (
        <>
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

        </>
    )
}

export default Footer