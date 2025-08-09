import { FaLeaf, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] dark:from-[#1B5E20] dark:to-[#004D40]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#4FC3F7]/10 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#2E7D32]/20 rounded-full blur-3xl animate-floatSlow animation-delay-2000" />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-[#4FC3F7]/15 rounded-full blur-3xl animate-floatSlow animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-700/30">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Section */}
            <div className="hidden lg:block relative min-h-[300px] bg-gradient-to-br from-[#2E7D32] to-[#4FC3F7]">
              <div className="absolute inset-0 bg-[url('https://i.ibb.co/chTR7Bm8/Adobe-Stock-517470038-Preview.jpg')] bg-cover bg-center mix-blend-overlay opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <FaLeaf className="mx-auto text-6xl text-white mb-4 drop-shadow-lg" />
                  <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Stay Connected</h3>
                  <p className="text-white/90 font-medium drop-shadow-sm">
                    Be part of our growing community of environmental champions
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8 sm:p-10">
              {isSubscribed ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="mx-auto text-5xl text-[#2E7D32] dark:text-[#81C784] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Thank You for Subscribing!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You'll receive our next update on tree plantation initiatives.
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium rounded-full transition-colors"
                  >
                    Subscribe Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center lg:text-left mb-8">
                    <div className="inline-flex items-center justify-center lg:justify-start mb-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2E7D32] text-white shadow-lg mr-3">
                        <FaLeaf className="text-xl" />
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E7D32] dark:text-[#81C784]">
                        Green Updates Newsletter
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get monthly updates on our tree plantation projects, environmental tips, and volunteer opportunities.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className="h-4 w-4 text-[#2E7D32] focus:ring-[#4FC3F7] border-gray-300 rounded"
                      />
                      <label htmlFor="consent" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        I agree to receive emails about tree plantation initiatives
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-white font-medium bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4FC3F7] transition-all ${isLoading ? 'opacity-80' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Subscribe Now
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                    We care about your data. Read our{' '}
                    <a href="#" className="text-[#2E7D32] dark:text-[#81C784] hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Newsletter;