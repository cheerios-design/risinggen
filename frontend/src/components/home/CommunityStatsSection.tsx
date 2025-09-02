const CommunityStatsSection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Our Growing Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">15,000+</div>
            <div className="text-white/70">Active Members</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">25+</div>
            <div className="text-white/70">Countries</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-white/70">Events This Year</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-white/70">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStatsSection;
