import { FaGlobeAmericas, FaHandsHelping, FaLeaf, FaSeedling } from 'react-icons/fa';

const features = [
  {
    icon: <FaLeaf className="text-green-600 w-10 h-10" />,
    title: "Eco Friendly",
    desc: "Promoting sustainable tree planting to protect and restore nature’s balance.",
  },
  {
    icon: <FaSeedling className="text-green-600 w-10 h-10" />,
    title: "Fresh Air",
    desc: "Trees purify the air by absorbing pollutants and releasing oxygen for healthier living.",
  },
  {
    icon: <FaHandsHelping className="text-green-600 w-10 h-10" />,
    title: "Community Driven",
    desc: "Join hands with local communities to plant and care for trees together.",
  },
  {
    icon: <FaGlobeAmericas className="text-green-600 w-10 h-10" />,
    title: "Global Impact",
    desc: "Every tree planted helps fight climate change and supports biodiversity worldwide.",
  },
];

const Feature = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-green-800 flex items-center justify-center gap-3">
          <FaLeaf className="w-12 h-12 animate-bounce text-green-700" />
          Why Tree Plantation Matters
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-green-700 text-lg font-medium">
          Explore the key benefits of planting trees for the environment and communities.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="mb-6">{icon}</div>
            <h3 className="text-xl font-semibold text-green-900 mb-3">{title}</h3>
            <p className="text-green-700 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
