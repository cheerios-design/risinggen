import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-white/5 backdrop-blur-sm border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 160.91 146.14"
                  fill="currentColor"
                >
                  <path d="M58.11,112.6l-8.71,8.71a10.52,10.52,0,0,0,.14,15,10.75,10.75,0,0,0,15-.39l13.42-13.42L64.36,112.18A4.77,4.77,0,0,0,58.11,112.6Z" />
                  <path d="M50.38,24.84,65.1,39.55,80,54.42,96.1,70.56,106.43,57a4.76,4.76,0,0,0-.42-6.26L94.84,39.55l15.69-15.69a10.51,10.51,0,0,0,0-14.87h0A10.51,10.51,0,0,0,95.66,9L80,24.68,65.25,10A10.52,10.52,0,1,0,50.38,24.84Z" />
                  <path d="M111.5,122.28,94.84,105.62,113,87.46l16.66,16.66a10.52,10.52,0,0,0,14.88-14.87L127.87,72.58l15.69-15.69A10.51,10.51,0,1,0,128.69,42L113,57.71,98.13,72.58,80,90.74,61.81,72.58,77.94,56.45,64.36,46.12a4.76,4.76,0,0,0-6.25.42L46.94,57.71,32.06,72.58,16.37,88.28a10.53,10.53,0,0,0,0,14.87h0a10.53,10.53,0,0,0,14.87,0l15.7-15.69L65.1,105.61,80,120.49l16.66,16.66a10.51,10.51,0,0,0,14.87,0h0A10.52,10.52,0,0,0,111.5,122.28Z" />
                  <path d="M40,50.72,32.22,43A10.51,10.51,0,0,0,17.35,57.87L30,70.56,40.37,57A4.78,4.78,0,0,0,40,50.72Z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg">RisingGen</div>
                <div className="text-white/60 text-sm">Europe</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Drawing Europe's young adults to the Savior and their covenants
              through faith, community, and service.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <div className="space-y-2">
              <Link
                to="/community"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Join Us
              </Link>
              <Link
                to="/events"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Events
              </Link>
              <Link
                to="/about"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                About
              </Link>
              <Link
                to="/community"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Support
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <div className="space-y-2">
              <Link
                to="/content"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Content
              </Link>
              <Link
                to="/service"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Service
              </Link>
              <Link
                to="/about"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Leadership
              </Link>
              <Link
                to="/contact"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                YouTube
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white text-sm block transition-colors"
              >
                Newsletter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/60 text-sm">
            © 2025 RisingGen Europe. Built with ❤️ for European YSA Communities.
          </p>
          <p className="text-white/60 text-sm italic mt-2 md:mt-0">
            "Draw Europe's young adults to the Savior and their covenants"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
