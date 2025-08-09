import { useEffect, useState } from "react";
import { FaLeaf, FaTree, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import CountUp from "react-countup";

const slides = [
  {
    image: "https://i.ibb.co/1Yfgm5qn/Adobe-Stock-644213335-Preview.jpg",
    heading: "🌱 Plant Trees",
    subheading: "Protect the Future",
    text: "Join hands with us in planting trees for a greener, cleaner, and more sustainable world.",
  },
  {
    image: "https://i.ibb.co/pBv5WSXY/Adobe-Stock-798427047-Preview.jpg",
    heading: "🌿 Green Earth",
    subheading: "Starts With You",
    text: "Your small step of planting a tree can make a big difference in fighting climate change.",
  },
  {
    image: "https://i.ibb.co/pB399P6T/Adobe-Stock-189744389-Preview.jpg",
    heading: "🌍 Eco Warriors",
    subheading: "Together We Grow",
    text: "Be part of a movement that creates a lasting impact on our environment and communities.",
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Trees Planted", icon: <FaTree className="text-3xl" /> },
  { value: 500, suffix: "+", label: "Volunteers", icon: <FaUsers className="text-3xl" /> },
  { value: 50, suffix: "+", label: "Events", icon: <FaCalendarAlt className="text-3xl" /> },
  { value: 25, suffix: "+", label: "Locations", icon: <FaMapMarkerAlt className="text-3xl" /> },
];

const BannerWithInfo = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="bg-gradient-to-b -my-5  dark:from-[#1B5E20] dark:to-[#004D40] overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Left Info Panel */}
          <div className="lg:w-2/5 w-full flex flex-col justify-center text-center lg:text-left">
            <Link to="/upcomingEvents">
              <span className="inline-block px-4 py-2 bg-[#2E7D32] text-white rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-md select-none">
                Join Our Green Initiative
              </span>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2E7D32] dark:text-[#81C784] leading-tight mb-4">
              Tree Plantation
              <br />
              <span className="text-[#4FC3F7] dark:text-[#4FC3F7]">Event Management</span>
            </h1>
            <p className="text-[#1B5E20] dark:text-[#C8E6C9] text-base sm:text-lg md:text-xl leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              Manage and participate in impactful tree plantation events easily. Join our community to help green the planet — one tree at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
              <Link
                to="/upcomingEvents"
                className="px-6 sm:px-8 py-2 sm:py-3 text-white font-semibold bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#2E7D32] rounded-full shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]"
                aria-label="Join the tree plantation movement"
              >
                Join the Movement
              </Link>
            </div>
          </div>

          {/* Right Slider Panel */}
          <div className="lg:w-3/5 w-full relative rounded-3xl shadow-2xl overflow-hidden select-none max-h-[80vh] md:max-h-[90vh]">
            {/* Sliding container */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)`, minHeight: "300px" }}
            >
              {slides.map(({ image, heading, subheading, text }, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full relative h-[60vh] sm:h-[65vh] md:h-[70vh] bg-cover bg-center rounded-3xl"
                  style={{ backgroundImage: `url('${image}')` }}
                  role="img"
                  aria-label={`${heading} background`}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2E7D32]/70 via-black/60 to-[#1B5E20]/60 backdrop-blur-sm dark:from-[#1B5E20]/80 dark:via-black/80 dark:to-[#2E7D32]/80"></div>

                  {/* Floating leaves */}
                  <FaLeaf className="absolute top-10 left-10 text-[#4FC3F7] text-4xl sm:text-5xl md:text-6xl z-20 animate-[leafFloat1_6s_ease-in-out_infinite]" />
                  <FaLeaf className="absolute bottom-10 right-10 text-[#81C784] text-5xl sm:text-6xl md:text-7xl z-20 animate-[leafFloat2_7s_ease-in-out_infinite]" />
                  <FaLeaf className="absolute top-1/2 left-1/4 text-[#A5D6A7] text-base sm:text-xl md:text-4xl z-20 animate-[leafFloat3_8s_ease-in-out_infinite]" />

                  {/* Slide content */}
                  <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-20">
                    <div className="bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/20 rounded-3xl p-6 md:p-8 max-w-3xl shadow-lg transition-transform duration-500 hover:scale-[1.03]">
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white dark:text-[#E8F5E9] mb-3 md:mb-4 tracking-tight drop-shadow-lg">
                        {heading}
                        <br className="hidden md:block" />
                        <span className="text-[#4FC3F7] dark:text-[#4FC3F7] drop-shadow-md">{subheading}</span>
                      </h2>
                      <p className="text-gray-100 dark:text-gray-200 text-sm sm:text-base md:text-lg mb-4 md:mb-6 font-medium tracking-wide max-w-xl mx-auto">
                        {text}
                      </p>
                      <Link
                        to="/upcomingEvents"
                        className="px-5 py-2 md:px-8 md:py-3 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#2E7D32] dark:from-[#2E7D32] dark:to-[#1B5E20] dark:hover:from-[#1B5E20] dark:hover:to-[#2E7D32] transition-all text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]"
                        aria-label="Join the tree plantation movement"
                      >
                        Join the Movement
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-40">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#4FC3F7] dark:border-[#4FC3F7] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] ${
                    idx === current
                      ? "bg-[#4FC3F7] dark:bg-[#4FC3F7] scale-125 shadow-lg"
                      : "bg-white/40 dark:bg-black/40 hover:bg-[#4FC3F7]/60 dark:hover:bg-[#4FC3F7]/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 bg-white/40 dark:bg-black/40 hover:bg-[#2E7D32] dark:hover:bg-[#1B5E20] text-[#2E7D32] dark:text-[#81C784] hover:text-white dark:hover:text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 border border-[#4FC3F7] dark:border-[#4FC3F7] focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]"
              aria-label="Previous Slide"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 bg-white/40 dark:bg-black/40 hover:bg-[#2E7D32] dark:hover:bg-[#1B5E20] text-[#2E7D32] dark:text-[#81C784] hover:text-white dark:hover:text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 border border-[#4FC3F7] dark:border-[#4FC3F7] focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]"
              aria-label="Next Slide"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-transform hover:scale-105 border border-[#2E7D32]/20 dark:border-[#81C784]/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-[#2E7D32] dark:text-[#4FC3F7] mb-3 select-none">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-[#2E7D32] dark:text-white mb-2">
                  <CountUp end={stat.value} duration={2} separator="," />
                  {stat.suffix}
                </h3>
                <p className="text-[#1B5E20] dark:text-[#C8E6C9] font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leaf float animations */}
        <style>{`
          @keyframes leafFloat1 {
            0%, 100% { transform: translateY(0) rotate(-10deg);}
            50% { transform: translateY(-30px) rotate(10deg);}
          }
          @keyframes leafFloat2 {
            0%, 100% { transform: translateY(0) rotate(8deg);}
            50% { transform: translateY(25px) rotate(-8deg);}
          }
          @keyframes leafFloat3 {
            0%, 100% { transform: translateY(0) rotate(0deg);}
            50% { transform: translateY(-20px) rotate(20deg);}
          }
        `}</style>
      </section>
    </div>
  );
};

export default BannerWithInfo;
