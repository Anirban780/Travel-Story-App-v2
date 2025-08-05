import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
	return (
		<>
			<section className="py-20 bg-white relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>

				<div className="container mx-auto px-6 relative">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
							What Travelers Say
						</h2>
						<p className="text-xl text-slate-600">
							Join thousands of happy travelers sharing their
							stories
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								name: "Sarah Johnson",
								location: "New York, USA",
								text: "TravelStory helped me document my amazing journey through Europe. The platform is intuitive and the community is incredibly supportive!",
								avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
							},
							{
								name: "Marco Rodriguez",
								location: "Barcelona, Spain",
								text: "I love how easy it is to share my travel experiences and connect with fellow adventurers. This platform has become essential for my travels.",
								avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
							},
							{
								name: "Yuki Tanaka",
								location: "Tokyo, Japan",
								text: "The stories I've read here have inspired countless adventures. It's amazing to see the world through other travelers' experiences.",
								avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
							},
						].map((testimonial, index) => (
							<div
								key={index}
								className="bg-gradient-to-br from-white to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
							>
								<FaQuoteLeft className="text-3xl text-cyan-400 mb-4" />
								<p className="text-slate-700 mb-6 italic">
									"{testimonial.text}"
								</p>
								<div className="flex items-center gap-4">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full object-cover"
									/>
									<div>
										<h4 className="font-semibold text-slate-800">
											{testimonial.name}
										</h4>
										<p className="text-sm text-slate-600">
											{testimonial.location}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Testimonials;
