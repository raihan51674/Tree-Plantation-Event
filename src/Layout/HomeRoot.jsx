import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const HomeRoot = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Wrapper with max width */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-col flex-grow">
        {/* Navbar stays at the top */}
        <Navbar />

        {/* Main content grows to fill the space */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default HomeRoot;
