import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const HomeRoot = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar: fixed/sticky at the top */}
      <header className="w-full sticky top-0 z-50 shadow-md">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeRoot;
