import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-green-950 dark:bg-gradient-to-br dark:from-green-950 dark:via-green-900 dark:to-green-800 dark:text-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #34d399 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 relative z-10">
        {/* Logo & Description */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/5 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
          <h2 className="text-4xl font-extrabold mb-2 flex items-center gap-3 tracking-tight">
            <span className="text-green-600 dark:text-green-400 text-4xl">🌳</span>
            <span className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-200 bg-clip-text text-transparent">
              Plantation
            </span>
          </h2>
          <p className="text-green-900 dark:text-green-100 text-base leading-relaxed">
            Dedicated to making the earth greener, one tree at a time.
            <br />
            Join us in protecting nature and promoting sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/5 rounded-2xl shadow-lg p-4 sm:p-6">
          <h3 className="font-semibold text-2xl mb-5 text-green-600 dark:text-green-300 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#home"
                className="hover:text-green-600 dark:hover:text-green-300 transition font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-green-600 dark:hover:text-green-300 transition font-medium"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-green-600 dark:hover:text-green-300 transition font-medium"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#events"
                className="hover:text-green-600 dark:hover:text-green-300 transition font-medium"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-green-600 dark:hover:text-green-300 transition font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/5 rounded-2xl shadow-lg p-4 sm:p-6">
          <h3 className="font-semibold text-2xl mb-5 text-green-600 dark:text-green-300 tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-4 text-green-900 dark:text-green-100">
            <li className="flex items-center gap-3">
              <span className="p-2 bg-green-200 dark:bg-green-900 rounded-full">
                <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
              </span>
              <span>123 Green Street, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 bg-green-200 dark:bg-green-900 rounded-full">
                <FaPhoneAlt className="text-green-600 dark:text-green-400" />
              </span>
              <a
                href="tel:+8801234567890"
                className="hover:text-green-600 dark:hover:text-green-300 transition"
              >
                +880 1234 567 890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="p-2 bg-green-200 dark:bg-green-900 rounded-full">
                <FaEnvelope className="text-green-600 dark:text-green-400" />
              </span>
              <a
                href="mailto:info@treeplantation.com"
                className="hover:text-green-600 dark:hover:text-green-300 transition"
              >
                info@treeplantation.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Media */}
        <div className="backdrop-blur-md bg-white/60 dark:bg-white/5 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-2xl mb-5 text-green-600 dark:text-green-300 tracking-wide">
              Subscribe to Newsletter
            </h3>
            <form className="flex flex-col gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 sm:p-3 rounded-lg text-green-900 dark:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 hover:from-green-400 hover:to-green-600 dark:hover:from-green-300 dark:hover:to-green-400 transition text-green-900 font-bold py-2 sm:py-3 rounded-lg shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="mt-6 sm:mt-8 flex space-x-4 sm:space-x-5 text-green-600 dark:text-green-300 text-xl sm:text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-900 dark:hover:text-white transition hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-green-900 dark:hover:text-white transition hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-green-900 dark:hover:text-white transition hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-900 dark:hover:text-white transition hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <hr className="border-green-300 dark:border-green-700 opacity-40 my-6 sm:my-8" />
      </div>

      {/* Bottom copyright */}
      <div className="bg-green-100/80 dark:bg-green-950/80 text-green-700 dark:text-green-300 text-center py-4 sm:py-5 text-xs sm:text-sm font-medium tracking-wide relative z-10">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold text-green-600 dark:text-green-400">TreePlantation</span>. All rights
        reserved.
        <br />
        <span className="text-green-800 dark:text-green-200">
          Designed with{" "}
          <span className="text-red-500 dark:text-red-400">♥</span> by Md. Raihan Islam
        </span>
      </div>
    </footer>
  );
};

export default Footer;
