import { useState, useEffect } from "react";
import { FaLeaf, FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus } from "react-icons/fa";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    alt: "Community tree planting event",
    caption: "Annual Community Planting Day - 2023",
    location: "Central Park, New York",
    date: "April 22, 2023",
    treesPlanted: "500+"
  },
  {
    src: "https://i.ibb.co/qYhp5B4t/Adobe-Stock-1176063871-Preview.jpg",
    alt: "Volunteers planting saplings",
    caption: "Youth Volunteers in Action",
    location: "Green Valley, California",
    date: "March 15, 2023",
    treesPlanted: "1,200+"
  },
  {
    src: "https://i.ibb.co/qYJm84GK/Adobe-Stock-313096915-Preview.jpg",
    alt: "Forest restoration project",
    caption: "Forest Restoration Initiative",
    location: "Pacific Northwest",
    date: "May 5, 2023",
    treesPlanted: "5,000+"
  },
  {
    src: "https://i.ibb.co/b5KmsK48/Adobe-Stock-583582518-Preview.jpg",
    alt: "Tree care workshop",
    caption: "Tree Care & Maintenance Workshop",
    location: "Chicago Botanical Gardens",
    date: "June 10, 2023",
    treesPlanted: "300+"
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    alt: "School planting program",
    caption: "School Green Initiative Program",
    location: "Austin, Texas",
    date: "February 28, 2023",
    treesPlanted: "750+"
  },
  {
    src: "https://i.ibb.co/HfXF0JYd/Adobe-Stock-714346813-Preview.jpg",
    alt: "Corporate volunteering event",
    caption: "Corporate Volunteering Day",
    location: "Silicon Valley",
    date: "July 22, 2023",
    treesPlanted: "2,000+"
  },
  {
    src: "https://images.unsplash.com/photo-1526397751294-331021109fbd?auto=format&fit=crop&w=1200&q=80",
    alt: "Urban greening project",
    caption: "Urban Greening Initiative",
    location: "Downtown Los Angeles",
    date: "August 5, 2023",
    treesPlanted: "1,500+"
  },
  {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
    alt: "Coastal restoration project",
    caption: "Coastal Ecosystem Restoration",
    location: "Florida Coastline",
    date: "September 12, 2023",
    treesPlanted: "3,200+"
  },
  {
    src: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1200&q=80",
    alt: "Native species planting",
    caption: "Native Species Reforestation",
    location: "Rocky Mountains",
    date: "October 8, 2023",
    treesPlanted: "4,500+"
  }
];

const Gallery = () => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const filteredImages = filter === "all" 
    ? images 
    : images.filter(img => img.caption.toLowerCase().includes(filter.toLowerCase()));

  const selectedImg = selectedImgIndex !== null ? filteredImages[selectedImgIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImgIndex(null);
      if (e.key === "ArrowRight" && selectedImgIndex !== null) goNext();
      if (e.key === "ArrowLeft" && selectedImgIndex !== null) goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIndex]);

  const goNext = () => {
    setSelectedImgIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  };

  const goPrev = () => {
    setSelectedImgIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    setIsLoading(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b  dark:from-[#1B5E20] dark:to-[#004D40]">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center px-6 py-2 bg-[#2E7D32] text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
          <FaLeaf className="mr-2" /> Our Green Journey
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E7D32] dark:text-[#81C784] mb-4">
          Tree Plantation <span className="text-[#4FC3F7] dark:text-[#4FC3F7]">Gallery</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-[#1B5E20] dark:text-[#C8E6C9]">
          Explore our impactful tree planting events and witness the transformation we're creating together.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "all" ? 'bg-[#2E7D32] text-white' : 'bg-white/80 dark:bg-gray-800/80 text-[#2E7D32] dark:text-[#81C784] hover:bg-[#2E7D32]/10 dark:hover:bg-[#81C784]/10'}`}
        >
          All Events
        </button>
        <button
          onClick={() => setFilter("community")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "community" ? 'bg-[#2E7D32] text-white' : 'bg-white/80 dark:bg-gray-800/80 text-[#2E7D32] dark:text-[#81C784] hover:bg-[#2E7D32]/10 dark:hover:bg-[#81C784]/10'}`}
        >
          Community Events
        </button>
        <button
          onClick={() => setFilter("workshop")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "workshop" ? 'bg-[#2E7D32] text-white' : 'bg-white/80 dark:bg-gray-800/80 text-[#2E7D32] dark:text-[#81C784] hover:bg-[#2E7D32]/10 dark:hover:bg-[#81C784]/10'}`}
        >
          Workshops
        </button>
        <button
          onClick={() => setFilter("corporate")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "corporate" ? 'bg-[#2E7D32] text-white' : 'bg-white/80 dark:bg-gray-800/80 text-[#2E7D32] dark:text-[#81C784] hover:bg-[#2E7D32]/10 dark:hover:bg-[#81C784]/10'}`}
        >
          Corporate Events
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map(({ src, alt, caption, location, date, treesPlanted }, idx) => (
          <div
            key={idx}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => setSelectedImgIndex(idx)}
          >
            <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E7D32]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">{caption}</h3>
                <div className="flex items-center text-white/90 text-sm mb-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </div>
                <div className="flex items-center text-white/90 text-sm mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {date}
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center text-white font-medium">
                  <FaLeaf className="mr-2" />
                  {treesPlanted} Trees Planted
                </div>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                <FaSearchPlus className="text-[#2E7D32] dark:text-[#81C784]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E7D32]/95 dark:bg-gray-950/95 backdrop-blur-lg transition-opacity duration-300"
          onClick={() => setSelectedImgIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E7D32] dark:border-[#81C784]"></div>
              </div>
            )}

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImg.src}
                alt={selectedImg.alt}
                className="w-full max-h-[60vh] object-contain"
                onLoad={() => setIsLoading(false)}
              />
              
              {/* Navigation buttons */}
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 hover:bg-[#2E7D32] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-[#2E7D32] dark:text-[#81C784] hover:text-white" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 hover:bg-[#2E7D32] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300"
                aria-label="Next image"
              >
                <FaChevronRight className="text-[#2E7D32] dark:text-[#81C784] hover:text-white" />
              </button>
            </div>

            {/* Caption area */}
            <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[#2E7D32] dark:text-[#81C784]">{selectedImg.caption}</h3>
                <button
                  onClick={() => setSelectedImgIndex(null)}
                  className="text-gray-500 hover:text-[#2E7D32] dark:hover:text-[#81C784] transition-colors"
                  aria-label="Close gallery"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <div className="bg-[#2E7D32]/10 dark:bg-[#81C784]/10 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-[#2E7D32] dark:text-[#81C784]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedImg.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-[#2E7D32]/10 dark:bg-[#81C784]/10 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-[#2E7D32] dark:text-[#81C784]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedImg.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-[#2E7D32]/10 dark:bg-[#81C784]/10 p-3 rounded-full mr-4">
                    <FaLeaf className="w-6 h-6 text-[#2E7D32] dark:text-[#81C784]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Impact</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{selectedImg.treesPlanted} Trees Planted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;