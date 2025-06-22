
const Newsletter = () => {
  return (
    <section
      className="relative bg-green-900 bg-opacity-90 text-white py-16 px-6 md:px-20 rounded-lg shadow-lg  mx-auto my-16"
      style={{
        backgroundImage: `url('https://i.ibb.co/chTR7Bm8/Adobe-Stock-517470038-Preview.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-80 rounded-lg"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4 drop-shadow-md">
          Join Our Green Movement
        </h2>
        <p className="mb-8 text-lg font-light drop-shadow-md">
          Subscribe to our newsletter and get the latest updates on tree plantation drives, eco tips, and community events.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-auto flex-grow rounded-md px-4 py-3 text-green-900 font-medium placeholder-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition-shadow"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-6 py-3 transition-colors shadow-lg hover:shadow-xl"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-6 text-sm opacity-80 italic">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
