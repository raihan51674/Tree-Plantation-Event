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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-green-700 mb-12 text-center tracking-wide drop-shadow-md">
        Our Tree Plantation Gallery
      </h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map(({ src, alt, caption }, idx) => (
          <div
            key={idx}
            className="relative rounded-lg shadow-xl overflow-hidden group cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
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
              className="w-full h-64 object-cover"
              onLoad={() => setIsLoading(false)}
            />
            {/* Gradient overlay with caption on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-80 transition-opacity flex items-end p-4">
              <p className="text-white font-semibold text-lg drop-shadow-lg">{caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImgIndex(null)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-caption"
        >
          <div
            className="relative max-w-5xl w-full rounded-lg overflow-hidden shadow-2xl bg-green-900 bg-opacity-90"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-800 bg-opacity-70">
                <svg
                  className="animate-spin h-10 w-10 text-green-400"
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
              className="w-full max-h-[80vh] object-contain select-none"
              onLoad={() => setIsLoading(false)}
              draggable={false}
            />
            <p
              id="modal-caption"
              className="text-white p-6 text-center text-2xl font-semibold tracking-wide drop-shadow-md"
            >
              {selectedImg.caption}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImgIndex(null)}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-green-400 transition"
              aria-label="Close gallery modal"
            >
              &times;
            </button>

            {/* Prev/Next Buttons */}
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-green-400 transition"
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-green-400 transition"
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
