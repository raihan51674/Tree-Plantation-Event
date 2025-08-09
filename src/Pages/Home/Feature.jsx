import { FaGlobeAmericas, FaHandsHelping, FaLeaf, FaSeedling, FaTree, FaWater, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Sustainable Planting",
    desc: "Our scientifically-backed methods ensure 95% survival rate for all planted trees.",
    gradient: "from-[#2E7D32] via-[#388E3C] to-[#43A047]",
    stats: "95% Survival Rate"
  },
  {
    icon: <FaSeedling className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Air Purification",
    desc: "Each tree absorbs 48 lbs of CO2 annually, improving air quality for communities.",
    gradient: "from-[#4FC3F7] via-[#29B6F6] to-[#0288D1]",
    stats: "48 lbs CO2/Tree/Year"
  },
  {
    icon: <FaHandsHelping className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Community Engagement",
    desc: "Over 10,000 volunteers trained in proper tree care and maintenance techniques.",
    gradient: "from-[#2E7D32] via-[#388E3C] to-[#43A047]",
    stats: "10K+ Volunteers"
  },
  {
    icon: <FaGlobeAmericas className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Biodiversity",
    desc: "We plant 50+ native species to support local ecosystems and wildlife habitats.",
    gradient: "from-[#4FC3F7] via-[#29B6F6] to-[#0288D1]",
    stats: "50+ Native Species"
  },
  {
    icon: <FaTree className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Urban Cooling",
    desc: "Trees reduce surrounding temperatures by up to 10°F in urban heat islands.",
    gradient: "from-[#2E7D32] via-[#388E3C] to-[#43A047]",
    stats: "10°F Cooling"
  },
  {
    icon: <FaWater className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Water Conservation",
    desc: "Our planting techniques reduce water runoff by 30% compared to conventional methods.",
    gradient: "from-[#4FC3F7] via-[#29B6F6] to-[#0288D1]",
    stats: "30% Less Runoff"
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-white drop-shadow-md" />,
    title: "Economic Impact",
    desc: "Every $1 invested in urban trees returns $5 in environmental and economic benefits.",
    gradient: "from-[#2E7D32] via-[#388E3C] to-[#43A047]",
    stats: "5:1 ROI"
  },
];

const FeatureSection = () => {
  return (
    <section className="relative overflow-hidden py-20   dark:from-[#1B5E20] dark:to-[#004D40]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-[#2E7D32]/10 rounded-full blur-3xl animate-floatSlow animation-delay-2000" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#4FC3F7]/15 rounded-full blur-3xl animate-floatSlow animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 px-6 py-2 bg-[#2E7D32] text-white text-sm font-semibold rounded-full shadow-lg">
            <FaLeaf className="mr-2" /> Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E7D32] dark:text-[#81C784] mb-4">
            Transforming Landscapes, <br />
            <span className="text-[#4FC3F7] dark:text-[#4FC3F7]">One Tree at a Time</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#1B5E20] dark:text-[#C8E6C9]">
            Discover how our tree plantation initiatives create measurable environmental and social benefits worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.slice(0, 4).map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>

        {/* Expanded Features (shown on larger screens) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mt-8">
          {features.slice(4).map((feature, idx) => (
            <FeatureCard key={idx + 4} feature={feature} />
          ))}
        </div>

        {/* CTA */}
        {/* <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-semibold rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]">
            Explore Our Programs
          </button>
        </div> */}
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

const FeatureCard = ({ feature }) => {
  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-[#E8F5E9]/90 dark:from-[#1B5E20]/90 dark:to-[#004D40]/90 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-[#2E7D32]/20 dark:border-[#81C784]/20" />
      <div className="relative h-full bg-white/80 dark:bg-[#1B5E20]/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col overflow-hidden border border-[#2E7D32]/10 dark:border-[#81C784]/10 transition-all duration-300 group-hover:border-[#4FC3F7]/50">
        {/* Gradient bar */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`} />
        
        {/* Icon */}
        <div className={`mb-4 w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-md`}>
          {feature.icon}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-[#2E7D32] dark:text-white mb-2 group-hover:text-[#4FC3F7] transition-colors">
          {feature.title}
        </h3>
        <p className="text-[#1B5E20] dark:text-[#C8E6C9] mb-4 flex-grow">
          {feature.desc}
        </p>
        
        {/* Stat badge */}
        <div className="mt-auto">
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#2E7D32]/10 dark:bg-[#81C784]/10 text-[#2E7D32] dark:text-[#C8E6C9] rounded-full">
            {feature.stats}
          </span>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/0 to-[#2E7D32]/0 group-hover:from-[#4FC3F7]/5 group-hover:to-[#2E7D32]/5 transition-all duration-300" />
      </div>
    </div>
  );
};

export default FeatureSection;