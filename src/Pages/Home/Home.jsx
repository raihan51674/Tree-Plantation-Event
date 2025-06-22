import Banner from "./Banner";
import Feature from "./Feature";
import Gallery from "./Gallery";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div className="pt-16">
      <Banner  />
      <Feature />
      <Gallery />
      <Newsletter />
    </div>
  );
};

export default Home;
