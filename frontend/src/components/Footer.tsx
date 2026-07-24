import { Mail, PhoneCall } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">Ecommerce</h2>
          <p className="mt-4 text-sm leading-6 text-gray-400">
            Discover quality products at great prices. Shop confidently with a
            modern, secure, and seamless shopping experience.
          </p>
        </div>

        {/* Shop */}
        <ul className="space-y-3 text-sm">
          <li>
            <Link to="/products" className="transition hover:text-white">
              All Products
            </Link>
          </li>

          <li>
            <Link to="/products" className="transition hover:text-white">
              New Arrivals
            </Link>
          </li>

          <li>
            <Link to="/products" className="transition hover:text-white">
              Best Sellers
            </Link>
          </li>

          <li>
            <Link to="/products" className="transition hover:text-white">
              Deals
            </Link>
          </li>
        </ul>

        {/* Support */}
        <ul className="space-y-3 text-sm">
          <li>
            <Link to="/#" className="transition hover:text-white">
              Contact Us
            </Link>
          </li>

          <li>
            <Link to="/#" className="transition hover:text-white">
              FAQs
            </Link>
          </li>

          <li>
            <Link to="/#" className="transition hover:text-white">
              Shipping
            </Link>
          </li>

          <li>
            <Link to="/#" className="transition hover:text-white">
              Returns
            </Link>
          </li>
        </ul>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Get in Touch
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              support@ecommerce.com
            </div>

            <div className="flex items-center gap-2">
              <PhoneCall size={18} />
              +977-1234567890
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              to="/"
              className="rounded-full bg-gray-800 p-2 transition hover:bg-blue-600 hover:text-white"
            >
              <FaFacebook size={18} />
            </Link>

            <Link
              to="/"
              className="rounded-full bg-gray-800 p-2 transition hover:bg-pink-600 hover:text-white"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              to="/"
              className="rounded-full bg-gray-800 p-2 transition hover:bg-sky-500 hover:text-white"
            >
              <FaTwitter size={18} />
            </Link>

            <Link
              to="/"
              className="rounded-full bg-gray-800 p-2 transition hover:bg-white hover:text-black"
            >
              <FaGithub size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Ecommerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
