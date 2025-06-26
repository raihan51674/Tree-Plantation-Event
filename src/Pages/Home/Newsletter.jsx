import { FaLeaf } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section
      className="relative min-h-[260px] flex items-center justify-center py-10 px-2 sm:px-4 md:px-0"
      style={{
        backgroundImage: `url('https://i.ibb.co/chTR7Bm8/Adobe-Stock-517470038-Preview.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-green-700/60 backdrop-blur-sm dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-700/60"></div>

      <div className="relative z-10 w-full max-w-xl mx-auto text-center rounded-xl bg-white/30 backdrop-blur-lg shadow-xl border border-white/30 p-6 sm:p-8 md:p-10 flex flex-col items-center dark:bg-gray-900/40 dark:border-gray-700/40">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600/90 shadow-lg mb-4 animate-bounce-slow dark:bg-green-700/90">
          <FaLeaf className="text-white text-2xl" />
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-lg tracking-tight dark:text-green-100">
          Join Our Green Movement
        </h2>
        <p className="mb-5 text-base sm:text-lg font-light text-white/90 drop-shadow-sm dark:text-green-100/90">
          Subscribe for updates on tree plantation drives, eco tips, and events.
        </p>

        <form className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-grow rounded-full px-4 py-2 text-green-900 font-medium placeholder-green-700 bg-white/90 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 transition-all shadow dark:bg-gray-800/80 dark:text-green-100 dark:placeholder-green-300 dark:border-gray-600"
          />
          <button
            type="submit"
            className="rounded-full px-6 py-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold shadow transition-all duration-200 transform hover:scale-105 dark:from-green-700 dark:via-green-800 dark:to-green-900 dark:hover:from-green-800 dark:hover:to-green-950"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-5 text-xs sm:text-sm text-white/80 italic dark:text-green-100/70">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
