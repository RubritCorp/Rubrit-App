import { useColorMode, Switch, Box, Button } from "@chakra-ui/react";
import { Moon, Sun } from "phosphor-react";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box>
      {/* <Button
        variant={"ghost"}
        size="md"
        color="transparent"
        onClick={toggleColorMode}
      >
        <Box
          display={colorMode === "light" ? "none" : ""}
        >
          <Sun size={20} color="#e9c46a" weight="fill" />
        </Box>
        <Box
          display={colorMode === "dark" ? "none" : ""}
        >
          <Moon size={20} color="#292E1E" weight="fill" />
        </Box>
      </Button> */}
      <Switch
        position={"relative"}
        size="lg"
        colorScheme="whiteAlpha"
        isChecked={isDark}
        onChange={toggleColorMode}
      >
        <Box
          display={colorMode === "light" ? "none" : ""}
          position={"absolute"}
          top="15%"
          left="5%"
        >
          <Sun size={20} color="#e9c46a" weight="fill" />
        </Box>
        <Box
          display={colorMode === "dark" ? "none" : ""}
          position={"absolute"}
          top="15%"
          right="15%"
        >
          <Moon size={20} color="#292E1E" weight="fill" />
        </Box>
      </Switch>
    </Box>
  );
};

export default DarkModeSwitch;
