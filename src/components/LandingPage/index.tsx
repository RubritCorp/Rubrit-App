import Hero from "./Hero";
import CategoryCarousel from "./CategoryCarousel";
import NearProfesionals from "./NearProfesionals";

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <CategoryCarousel />
      <NearProfesionals />
    </>
    
  );
};

export default LandingPage;
