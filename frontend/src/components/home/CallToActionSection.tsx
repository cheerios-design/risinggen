import { Link } from "react-router-dom";

const CallToActionSection = () => {
  return (
    <section className="relative py-20 bg-white/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of young adults across Europe who are strengthening
          their faith, building meaningful relationships, and making a
          difference in their communities.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/community"
            className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-glow hover:bg-blue-50 transition-all duration-300"
          >
            Join RisingGen Today
          </Link>
          <Link
            to="/about"
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
