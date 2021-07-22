import HeroSection from "./components/HeroSection/HeroSection";
import ShortDescriptions from "./components/ShortDescriptions/ShortDescriptions";
import Descriptions from "./components/Descriptions/Descriptions";
import Layout from "layouts/RegularLayout";

function Home() {

  return (
    <Layout>
      <HeroSection />
      <ShortDescriptions />
      <Descriptions />
    </Layout>
  );
}

export default Home;
