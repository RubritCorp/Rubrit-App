//components
import Hero from "./Hero";
import CategoryCarousel from "./CategoryCarousel";
import NearProfesionals from "./NearProfesionals";
import RubritPros from "./RubritPros";
const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <CategoryCarousel />
      <NearProfesionals />
      <RubritPros />
    </>
  );
};

export default LandingPage;
