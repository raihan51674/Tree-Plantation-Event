import { FaEnvelope, FaFacebookF,FaPaperPlane, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaTree, FaLeaf } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#E8F5E9] to-[#B2DFDB] dark:from-[#1B5E20] dark:to-[#004D40] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#4FC3F7]/10 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#2E7D32]/20 rounded-full blur-3xl animate-floatSlow animation-delay-2000" />
        <FaLeaf className="absolute top-1/4 left-1/4 text-[#2E7D32]/10 dark:text-[#81C784]/10 text-9xl -rotate-12" />
        <FaTree className="absolute bottom-10 right-1/4 text-[#2E7D32]/10 dark:text-[#81C784]/10 text-9xl rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#2E7D32]/20 dark:border-[#81C784]/20">
            <div className="flex items-center mb-4">
              <div className="bg-[#2E7D32] text-white p-3 rounded-xl mr-3">
                <FaTree className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-[#2E7D32] dark:text-[#81C784]">
                Green<span className="text-[#4FC3F7]">Earth</span>
              </h2>
            </div>
            <p className="text-[#1B5E20] dark:text-[#C8E6C9] mb-4">
              Committed to restoring our planet's green cover through community-driven tree plantation initiatives.
            </p>
            <div className="flex space-x-4 text-[#2E7D32] dark:text-[#81C784] text-xl">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] transition-transform hover:scale-110"
                  aria-label={`Follow us on ${Icon.toString().replace('Fa', '')}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#2E7D32]/20 dark:border-[#81C784]/20">
            <h3 className="text-xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-4 flex items-center">
              <span className="w-3 h-3 bg-[#4FC3F7] rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#" },
                { name: "About Us", href: "#about" },
                { name: "Our Projects", href: "#projects" },
                { name: "Events", href: "#events" },
                { name: "Volunteer", href: "#volunteer" },
                { name: "Contact", href: "#contact" }
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="text-[#1B5E20] dark:text-[#C8E6C9] hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#2E7D32] rounded-full mr-2"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#2E7D32]/20 dark:border-[#81C784]/20">
            <h3 className="text-xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-4 flex items-center">
              <span className="w-3 h-3 bg-[#4FC3F7] rounded-full mr-2"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-[#2E7D32]/10 dark:bg-[#81C784]/10 p-2 rounded-lg mr-3">
                  <FaMapMarkerAlt className="text-[#2E7D32] dark:text-[#81C784]" />
                </div>
                <span className="text-[#1B5E20] dark:text-[#C8E6C9]">
                  123 Green Avenue, Eco District<br />
                  Dhaka 1207, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <div className="bg-[#2E7D32]/10 dark:bg-[#81C784]/10 p-2 rounded-lg mr-3">
                  <FaPhoneAlt className="text-[#2E7D32] dark:text-[#81C784]" />
                </div>
                <a href="tel:+8801234567890" className="text-[#1B5E20] dark:text-[#C8E6C9] hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] transition-colors">
                  +880 1234 567 890
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-[#2E7D32]/10 dark:bg-[#81C784]/10 p-2 rounded-lg mr-3">
                  <FaEnvelope className="text-[#2E7D32] dark:text-[#81C784]" />
                </div>
                <a href="mailto:info@greenearth.org" className="text-[#1B5E20] dark:text-[#C8E6C9] hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] transition-colors">
                  info@greenearth.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#2E7D32]/20 dark:border-[#81C784]/20">
            <h3 className="text-xl font-bold text-[#2E7D32] dark:text-[#81C784] mb-4 flex items-center">
              <span className="w-3 h-3 bg-[#4FC3F7] rounded-full mr-2"></span>
              Newsletter
            </h3>
            <p className="text-[#1B5E20] dark:text-[#C8E6C9] mb-4">
              Subscribe to get updates on our latest plantation drives and environmental initiatives.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg border border-[#2E7D32]/30 dark:border-[#81C784]/30 focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7] transition-all dark:bg-[#1B5E20]/50 dark:text-white"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-[#2E7D32] to-[#4FC3F7] hover:from-[#4FC3F7] hover:to-[#2E7D32] text-white font-medium rounded-lg shadow transition-all flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2E7D32]/30 dark:border-[#81C784]/30 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-[#1B5E20] dark:text-[#C8E6C9] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GreenEarth Initiative. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#1B5E20] dark:text-[#C8E6C9] hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#1B5E20] dark:text-[#C8E6C9] hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#1B5E20] dark:text-[#C8E6C9] hover:text-[#4FC3F7] dark:hover:text-[#4FC3F7] text-sm transition-colors">
              Sitemap
            </a>
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
      `}</style>
    </footer>
  );
};

export default Footer;