import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <GithubIcon className="h-6 w-6" />
              <span className="font-bold">VirtualTryOn</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Revolutionizing the way you shop with AI-powered virtual try-on technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Product</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-600">
              <Link to="/about" className="hover:text-blue-600">About</Link>
              <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
              <Link to="/try-room" className="hover:text-blue-600">Try Room</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-600">
              <Link to="/contact" className="hover:text-blue-600">Contact</Link>
              <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} VirtualTryOn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}