//components
import Hero from "./Hero";
import CategoryCarousel from "./CategoryCarousel";
import NearProfesionals from "./NearProfesionals";
import RubritPros from "./RubritPros";
import Begin from "./Begin";
import Services from "./Services";
import { Box, useColorModeValue } from "@chakra-ui/react";
const LandingPage: React.FC = () => {
  return (
    <Box>
      <Hero />
      <CategoryCarousel />
      <RubritPros />
      <NearProfesionals />
      <Begin /> 
    </Box>
  );
};

export default LandingPage;
