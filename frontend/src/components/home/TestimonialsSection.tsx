const TestimonialsSection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          What Our Community Says
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-white/80 mb-4">
              "RisingGen has completely transformed my spiritual journey and
              connected me with amazing friends across Europe."
            </p>
            <div className="text-white font-semibold">Emma K., Germany</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-white/80 mb-4">
              "The events are life-changing and the community support is
              incredible. I've grown so much!"
            </p>
            <div className="text-white font-semibold">Marco R., Italy</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-white/80 mb-4">
              "Through RisingGen, I found my purpose and made lifelong
              connections with fellow young adults."
            </p>
            <div className="text-white font-semibold">Sophie L., France</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
