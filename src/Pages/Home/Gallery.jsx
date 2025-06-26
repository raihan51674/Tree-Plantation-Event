import { useEffect, useState } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    alt: "Tree Plantation 1",
    caption: "Community Tree Plantation Day",
  },
  {
    src: "https://i.ibb.co/qYhp5B4t/Adobe-Stock-1176063871-Preview.jpg",
    alt: "Tree Plantation 2",
    caption: "Volunteers planting saplings",
  },
  {
    src: "https://i.ibb.co/qYJm84GK/Adobe-Stock-313096915-Preview.jpg",
    alt: "Tree Plantation 3",
    caption: "Green forest growth",
  },
  {
    src: "https://i.ibb.co/b5KmsK48/Adobe-Stock-583582518-Preview.jpg",
    alt: "Tree Plantation 4",
    caption: "Beautiful young tree",
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    alt: "Tree Plantation 5",
    caption: "Plantation site after rain",
  },
  {
    src: "https://i.ibb.co/HfXF0JYd/Adobe-Stock-714346813-Preview.jpg",
    alt: "Tree Plantation 6",
    caption: "Hands holding small sapling",
  },
];

const Gallery = () => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedImg = selectedImgIndex !== null ? images[selectedImgIndex] : null;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImgIndex(null);
      }
      if (e.key === "ArrowRight" && selectedImgIndex !== null) {
        goNext();
      }
      if (e.key === "ArrowLeft" && selectedImgIndex !== null) {
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImgIndex]);

  // Navigate to next image
  const goNext = () => {
    setSelectedImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  };

  // Navigate to previous image
  const goPrev = () => {
    setSelectedImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsLoading(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-950 dark:to-green-950 min-h-screen transition-colors duration-300">
      <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-lime-500 to-green-400 dark:from-green-200 dark:via-lime-400 dark:to-green-500 mb-16 text-center tracking-wider drop-shadow-lg">
        Our Tree Plantation Gallery
      </h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {images.map(({ src, alt, caption }, idx) => (
          <div
            key={idx}
            className="relative rounded-3xl shadow-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-green-200 hover:z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border border-green-100 dark:border-green-900"
            onClick={() => setSelectedImgIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={`Open image: ${caption}`}
            onKeyPress={(e) => {
              if (e.key === "Enter") setSelectedImgIndex(idx);
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-[2px]"
              onLoad={() => setIsLoading(false)}
            />
            {/* Glass overlay with caption on hover */}
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-green-900/80 via-transparent to-transparent dark:from-green-950/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full bg-white/30 dark:bg-gray-900/40 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg">
                <p className="text-green-900 dark:text-green-200 font-bold text-lg tracking-wide text-center drop-shadow-md">{caption}</p>
              </div>
            </div>
            {/* Floating leaf icon */}
            <span className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 text-green-400 dark:text-green-300 text-2xl drop-shadow-lg">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C7.03 2 2.73 6.11 2.05 11.02c-.09.67.46 1.26 1.13 1.26h.01c.6 0 1.09-.45 1.16-1.04C4.94 7.14 8.13 4 12 4s7.06 3.14 7.65 7.24c.07.59.56 1.04 1.16 1.04h.01c.67 0 1.22-.59 1.13-1.26C21.27 6.11 16.97 2 12 2z"
                  fill="currentColor"
                />
                <path
                  d="M12 6c-3.31 0-6 2.69-6 6 0 4.97 6 10 6 10s6-5.03 6-10c0-3.31-2.69-6-6-6zm0 13.13C10.14 16.98 6 12.98 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6c0 .98-4.14 4.98-6 7.13z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 bg-gradient-to-br from-green-900/90 via-black/80 to-green-800/90 dark:from-gray-950/95 dark:via-black/90 dark:to-green-950/95 backdrop-blur-[6px] transition-all duration-300"
          onClick={() => setSelectedImgIndex(null)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-caption"
        >
          <div
            className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-white/20 dark:bg-gray-900/40 backdrop-blur-2xl border border-green-200 dark:border-green-900 ring-4 ring-green-300/30 dark:ring-green-900/40"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-800/60 dark:bg-green-950/80 z-10">
                <svg
                  className="animate-spin h-12 w-12 text-green-400 dark:text-green-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-label="Loading spinner"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            )}
            <img
              src={selectedImg.src}
              alt={selectedImg.alt}
              className="w-full max-h-[40vh] xs:max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain select-none transition-all duration-500 rounded-t-3xl shadow-xl"
              onLoad={() => setIsLoading(false)}
              draggable={false}
              style={{ boxShadow: "0 8px 32px 0 rgba(34,197,94,0.25)" }}
            />
            <p
              id="modal-caption"
              className="text-green-900 dark:text-green-100 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md px-8 py-4 text-center text-2xl font-bold tracking-wider drop-shadow-lg rounded-b-3xl"
            >
              {selectedImg.caption}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImgIndex(null)}
              className="absolute top-4 right-4 text-green-900 dark:text-green-100 bg-white/70 dark:bg-gray-900/70 hover:bg-green-400/80 dark:hover:bg-green-700/80 hover:text-white rounded-full p-2 text-3xl font-black shadow-lg transition-all duration-300"
              aria-label="Close gallery modal"
            >
              &times;
            </button>

            {/* Prev/Next Buttons */}
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-green-900 dark:text-green-100 bg-white/70 dark:bg-gray-900/70 hover:bg-green-400/80 dark:hover:bg-green-700/80 hover:text-white rounded-full p-2 text-3xl font-black shadow-lg transition-all duration-300"
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-green-900 dark:text-green-100 bg-white/70 dark:bg-gray-900/70 hover:bg-green-400/80 dark:hover:bg-green-700/80 hover:text-white rounded-full p-2 text-3xl font-black shadow-lg transition-all duration-300"
              aria-label="Next image"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
