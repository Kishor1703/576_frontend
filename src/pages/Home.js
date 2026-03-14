import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
// import PricingDynamic from '../components/PricingDynamic'; // use this if pricing is managed via admin
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Portfolio />
    <Pricing />
    <About />
    <Contact />
    <Footer />
  </>
);

export default Home;
