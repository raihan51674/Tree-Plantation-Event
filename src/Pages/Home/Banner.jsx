import { useEffect, useState } from "react";
import { FaLeaf } from "react-icons/fa";

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

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full min-h-[60vh] md:h-[70vh] overflow-hidden font-sans">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 -z-10"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
          role="img"
          aria-label="Tree plantation background"
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/60 to-green-700/60 backdrop-blur-[6px] dark:from-green-950/80 dark:via-black/80 dark:to-green-900/80"></div>
        </div>
      ))}

      {/* Animated Floating Leaves */}
      <FaLeaf className="absolute top-10 left-10 text-green-400 text-3xl md:text-5xl z-20 animate-[leafFloat1_6s_ease-in-out_infinite] dark:text-green-300" />
      <FaLeaf className="absolute bottom-10 right-10 text-green-300 text-4xl md:text-6xl z-20 animate-[leafFloat2_7s_ease-in-out_infinite] dark:text-green-200" />
      <FaLeaf className="absolute top-1/2 left-1/4 text-green-200 text-sm xs:text-base sm:text-xl md:text-3xl z-20 animate-[leafFloat3_8s_ease-in-out_infinite] dark:text-green-100" />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-2 xs:px-3 sm:px-4">
        <div className="bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-2xl xs:rounded-3xl p-3 xs:p-5 sm:p-6 md:p-10 min-h-[140px] xs:min-h-[180px] sm:min-h-[220px] md:min-h-[280px] shadow-2xl max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl w-full transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-6xl font-extrabold text-white dark:text-green-100 mb-2 xs:mb-3 sm:mb-4 md:mb-7 leading-tight tracking-tight drop-shadow-lg">
            {slides[current].heading}
            <br className="hidden md:block" />
            <span className="text-green-300 dark:text-green-400 drop-shadow-md">
              {slides[current].subheading}
            </span>
          </h1>
          <p className="text-gray-100 dark:text-gray-200 text-xs xs:text-sm sm:text-base md:text-xl mb-3 xs:mb-4 sm:mb-7 md:mb-8 font-medium tracking-wide">
            {slides[current].text}
          </p>
          <button
            className="px-4 py-2 xs:px-5 xs:py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800 dark:from-green-700 dark:via-green-800 dark:to-green-900 dark:hover:from-green-800 dark:hover:to-green-950 transition-all text-white font-bold rounded-full shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 text-xs xs:text-sm sm:text-base md:text-lg"
            aria-label="Join the tree plantation movement"
          >
            Join the Movement
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 xs:bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 xs:gap-3 z-40">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full border-2 border-green-400 dark:border-green-600 transition-all duration-300 ${
              idx === current
                ? "bg-green-400 dark:bg-green-600 scale-110 xs:scale-125 shadow-lg"
                : "bg-white/30 dark:bg-black/30 hover:bg-green-200 dark:hover:bg-green-700"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 xs:left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-black/30 hover:bg-green-600/80 dark:hover:bg-green-800/80 text-green-800 dark:text-green-200 hover:text-white dark:hover:text-green-100 p-2 xs:p-2.5 sm:p-3 rounded-full z-40 shadow-lg transition-all duration-300 border border-green-400 dark:border-green-600"
        aria-label="Previous Slide"
      >
        <svg
          width="18"
          height="18"
          className="sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 xs:right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-black/30 hover:bg-green-600/80 dark:hover:bg-green-800/80 text-green-800 dark:text-green-200 hover:text-white dark:hover:text-green-100 p-2 xs:p-2.5 sm:p-3 rounded-full z-40 shadow-lg transition-all duration-300 border border-green-400 dark:border-green-600"
        aria-label="Next Slide"
      >
        <svg
          width="18"
          height="18"
          className="sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      {/* Custom leaf float animations */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Banner;
