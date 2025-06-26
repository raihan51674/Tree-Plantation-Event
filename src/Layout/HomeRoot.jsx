import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const HomeRoot = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main layout container with max width */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-col flex-grow">
        {/* Navbar: fixed at the top */}
        <div className='pt-4'>
          <Navbar/>
        </div>

        {/* Main content area */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer: fixed at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default HomeRoot;
