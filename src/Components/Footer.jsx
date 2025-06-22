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
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <span className="text-green-400">🌳</span> TreePlantation
          </h2>
          <p className="text-green-200">
            Dedicated to making the earth greener, one tree at a time. Join us
            in protecting nature and promoting sustainability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-green-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-green-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-green-400 transition">
                Events
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-green-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
          <ul className="space-y-3 text-green-200">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-green-400" />
              <span>123 Green Street, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-400" />
              <a href="tel:+8801234567890" className="hover:text-green-400">
                +880 1234 567 890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-green-400" />
              <a
                href="mailto:info@treeplantation.com"
                className="hover:text-green-400"
              >
                info@treeplantation.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Media */}
        <div>
          <h3 className="font-semibold text-xl mb-4">Subscribe to Newsletter</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="p-3 rounded text-green-900"
              required
            />
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 transition text-green-900 font-semibold py-3 rounded"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-8 flex space-x-5 text-green-400 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-200 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-green-200 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-green-200 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-200 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-green-800 text-green-300 text-center py-4 mt-10 text-sm">
        &copy; {new Date().getFullYear()} TreePlantation. All rights reserved. |
        Designed with by Md. Raihan Islam
      </div>
    </footer>
  );
};

export default Footer;
