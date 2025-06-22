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
    <div className="relative w-full min-h-[60vh] md:h-[70vh] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-green-900/50 to-black/70 backdrop-blur-sm"></div>
        </div>
      ))}

      {/* Floating Leaves */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 animate-bounce-slow text-green-400 text-2xl md:text-3xl z-20">
        <FaLeaf />
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 animate-bounce-slow text-green-400 text-3xl md:text-4xl z-20">
        <FaLeaf />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-14 shadow-2xl max-w-xl w-full">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-5 leading-tight tracking-tight">
            {slides[current].heading} <br className="hidden md:block" />
            <span className="text-green-300">{slides[current].subheading}</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-lg mb-5 md:mb-6">
            {slides[current].text}
          </p>
          <button
            className="px-5 py-3 md:px-6 md:py-3 bg-green-600 hover:bg-green-700 transition-all text-white font-semibold rounded-full shadow-lg hover:scale-105"
            aria-label="Join the tree plantation movement"
          >
            Join the Movement
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-700/50 hover:bg-green-700 text-white p-2 rounded-full z-30"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-700/50 hover:bg-green-700 text-white p-2 rounded-full z-30"
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
};

export default Banner;
