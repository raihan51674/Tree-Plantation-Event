import Banner from "./Banner";
import Feature from "./Feature";
import Gallery from "./Gallery";
import Newsletter from "./Newsletter";
import Testomonials from "./Testomonials";

const Home = () => {
  return (
    <div className="pt-16">
      <Banner  />
      <Feature />
      <Gallery />
      <Newsletter />
      <Testomonials></Testomonials>
    </div>
  );
};

export default Home;
