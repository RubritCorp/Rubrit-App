import { ReactNode } from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { TwitterLogo, YoutubeLogo, InstagramLogo } from "phosphor-react";
import DarkModeSwitch from "components/DarkModeSwitch";
import Link from "next/link";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        backgroundColor: useColorModeValue("blackAlpha.300", "whiteAlpha.200"),
        transform: "translate(0, -4px)",
        transition: " all 250ms",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("medium_grey", "dark_green")}
      color={useColorModeValue("dark_green", "medium_grey")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Rubrit</ListHeader>
            <Link href={"/"}>Inicio</Link>
            <Link href={"#"}>Como Funciona</Link>
            <Link href={"#"}>Sobre Nosotros</Link>
            <Link href={"#"}>Registrate como Profesional</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Soporte</ListHeader>
            <Link href={"/faqs"}><a>FAQs</a></Link>
            <Link href={"/comunityPrinci"}><a>Principios de la Comunidad</a></Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legales</ListHeader>
            <Link href={"/cookiePolicy"}><a>Politica de Cookies</a></Link>
            <Link href={"/privacyPolicy"}><a>Politicas de Privacidad</a></Link>
            <Link href={"/termService"}><a>Terminos del Servicio</a></Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <DarkModeSwitch />
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("dark_green", "medium_grey")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 Rubrit. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <TwitterLogo size={32} color="#2EB67D" weight="fill" />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <YoutubeLogo size={32} color="#2EB67D" weight="fill" />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <InstagramLogo size={32} color="#2EB67D" weight="fill" />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
