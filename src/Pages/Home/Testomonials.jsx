import React from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Environmental Activist",
    content: "The tree plantation event was incredibly well-organized. I've never seen such dedication to environmental causes. The team made sure every participant understood the importance of each tree we planted.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Community Leader",
    content: "As a first-time volunteer, I was impressed by how welcoming and educational the experience was. My family and I learned so much about native species and their benefits to our ecosystem.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "School Teacher",
    content: "Our students loved participating in this event! It was the perfect hands-on learning experience about sustainability. We'll definitely be joining future planting events.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Local Business Owner",
    content: "Supporting this initiative was one of the best decisions we've made. The impact on our community is visible, and our employees loved volunteering together for this cause.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b dark:from-[#0a2e1a] dark:to-[#052e16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2E7D32] dark:text-green-300">
            What People Are Saying
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from volunteers, participants, and community members about their experiences
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" 
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10">
                    <div className="flex items-start">
                      <Quote className="flex-shrink-0 h-8 w-8 text-[#4FC3F7] opacity-70" />
                      <blockquote className="ml-4">
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic">
                          "{testimonial.content}"
                        </p>
                      </blockquote>
                    </div>
                    
                    <div className="mt-8 flex items-center">
                      <div className="flex-shrink-0">
                        <img 
                          className="h-14 w-14 rounded-full object-cover border-2 border-[#2E7D32]/30 dark:border-green-400/30"
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-medium text-[#2E7D32] dark:text-green-400">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-4 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-[#2E7D32]/10 dark:hover:bg-green-900/30 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#2E7D32] dark:text-green-400" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-4 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-[#2E7D32]/10 dark:hover:bg-green-900/30 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#2E7D32] dark:text-green-400" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-colors ${index === currentIndex ? 'bg-[#2E7D32] dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Grid Layout for Larger Screens */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {testimonials.slice(0, 4).map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start">
                <Quote className="flex-shrink-0 h-6 w-6 text-[#4FC3F7] opacity-70 mt-1" />
                <blockquote className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </blockquote>
              </div>
              <div className="mt-6 flex items-center">
                <img 
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#2E7D32]/30 dark:border-green-400/30"
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <div className="font-medium text-[#2E7D32] dark:text-green-400">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;