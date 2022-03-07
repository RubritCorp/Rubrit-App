//components
import Hero from "./Hero";
import CategoryCarousel from "./CategoryCarousel";
import NearProfesionals from "./NearProfesionals";
import RubritPros from "./RubritPros";
import Begin from "./Begin";
import Services from "./Services";
const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <CategoryCarousel />
      <RubritPros />
      <NearProfesionals />
      <Begin /> 
    </>
  );
};

export default LandingPage;
