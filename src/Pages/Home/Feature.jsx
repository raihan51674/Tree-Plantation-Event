import { FaGlobeAmericas, FaHandsHelping, FaLeaf, FaSeedling } from 'react-icons/fa';

const features = [
	{
		icon: <FaLeaf className="w-8 h-8 text-green-700" />,
		title: 'Eco Friendly',
		desc: 'Promoting sustainable tree planting to protect, restore nature’s balance.',
	},
	{
		icon: <FaSeedling className="w-8 h-8 text-green-700" />,
		title: 'Fresh Air',
		desc: 'Trees purify the air by absorbing pollutants and releasing oxygen for healthier living.',
	},
	{
		icon: <FaHandsHelping className="w-8 h-8 text-green-700" />,
		title: 'Community Driven',
		desc: 'Join hands with local communities to plant and care for trees together.',
	},
	{
		icon: <FaGlobeAmericas className="w-8 h-8 text-green-700" />,
		title: 'Global Impact',
		desc: 'Every tree planted helps fight climate change and supports biodiversity worldwide.',
	},
];

const Feature = () => {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-20
			bg-gradient-to-br from-green-50/80 via-white/60 to-green-100/80
			dark:from-green-900/80 dark:via-gray-900/60 dark:to-green-950/80
			rounded-2xl sm:rounded-3xl shadow-2xl dark:shadow-green-900/40
			backdrop-blur-md border border-green-100 dark:border-green-900
			relative overflow-hidden"
		>
			{/* Decorative blurred gradient shapes */}
			<div className="absolute -top-16 -left-16 w-40 h-40 sm:w-72 sm:h-72
				bg-gradient-to-br from-green-300 via-green-100 to-white
				dark:from-green-800 dark:via-green-900 dark:to-green-950
				rounded-full opacity-30 blur-3xl pointer-events-none"
			/>
			<div className="absolute -bottom-10 -right-10 w-56 h-56 sm:w-96 sm:h-96
				bg-gradient-to-tr from-green-200 via-green-50 to-white
				dark:from-green-900 dark:via-green-800 dark:to-green-950
				rounded-full opacity-20 blur-3xl pointer-events-none"
			/>
			<div className="text-center mb-10 sm:mb-16 relative z-10">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-black
					text-green-800 dark:text-green-200 flex items-center justify-center gap-2 sm:gap-4 tracking-tight drop-shadow-lg"
				>
					<span className="inline-flex items-center justify-center rounded-full
						bg-gradient-to-tr from-green-400 to-green-700
						dark:from-green-700 dark:to-green-900
						p-2 sm:p-3 shadow-lg animate-bounce"
					>
						<FaLeaf className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
					</span>
					<span className="bg-clip-text text-transparent
						bg-gradient-to-r from-green-700 via-green-500 to-green-700
						dark:from-green-200 dark:via-green-400 dark:to-green-200"
					>
						Why Tree Plantation Matters
					</span>
				</h2>
				<p className="mt-3 sm:mt-5 max-w-xl sm:max-w-2xl mx-auto
					text-green-800 dark:text-green-200 text-base sm:text-lg font-medium leading-relaxed"
				>
					Explore the key benefits of planting trees for the environment and
					communities.
				</p>
			</div>

			<div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
				{features.map(({ icon, title, desc }, idx) => (
					<div
						key={idx}
						className="bg-white/70 dark:bg-green-950/70 border border-green-100 dark:border-green-900
							rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center
							shadow-xl dark:shadow-green-900/40 hover:shadow-2xl dark:hover:shadow-green-800/60
							transition-all duration-300 cursor-pointer backdrop-blur-lg hover:-translate-y-2 group"
						style={{ boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10)' }}
					>
						<div className="mb-4 sm:mb-6">
							<span className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full
								bg-gradient-to-br from-green-200 via-green-400 to-green-600
								dark:from-green-800 dark:via-green-700 dark:to-green-900
								shadow-lg group-hover:scale-110 transition-transform duration-300"
							>
								{icon}
							</span>
						</div>
						<h3 className="text-lg sm:text-2xl font-bold text-green-900 dark:text-green-100 mb-1 sm:mb-2 tracking-tight group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">
							{title}
						</h3>
						<p className="text-green-800/80 dark:text-green-200/80 leading-relaxed font-medium text-sm sm:text-base">
							{desc}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Feature;
