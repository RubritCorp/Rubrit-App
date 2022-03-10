//from chakra
import {
  Flex,
  Text,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
//from modules
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
//components
import DarkModeSwitch from "components/DarkModeSwitch";
import { useCategories } from "Provider/CategoriesProvider";

const MobileNav = () => {
  const { pathname } = useRouter();
  const { categories } = useCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenServices, onToggle: onToggleServices } =
    useDisclosure();

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <Button
        onClick={onOpen}
        leftIcon={<HamburgerIcon />}
        variant="ghost"
        iconSpacing={0}
      />

      <Drawer {...{ isOpen, onClose }} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={"medium_green"}>
            Menu
            <Box d={{ base: "inline", md: "none" }}>
              <DarkModeSwitch />
            </Box>
          </DrawerHeader>
          <DrawerBody
            css={{
              "&::-webkit-scrollbar": {
                width: "7px",
              },
              "&::-webkit-scrollbar-track": {
                width: "15px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#38a169",
                borderRadius: "24px",
              },
            }}
          >
            <Stack spacing={4} onClick={categories && onToggleServices}>
              <Flex
                py={2}
                justify={"space-between"}
                align={"center"}
                _hover={{
                  textDecoration: "none",
                }}
                cursor={"pointer"}
              >
                <Text
                  fontWeight={600}
                  color={useColorModeValue("gray.600", "gray.200")}
                >
                  Servicios
                </Text>

                <Icon
                  as={ChevronDownIcon}
                  transition={"all .25s ease-in-out"}
                  transform={isOpenServices ? "rotate(180deg)" : ""}
                  w={6}
                  h={6}
                />
              </Flex>

              <Collapse
                in={isOpenServices}
                animateOpacity
                style={{ marginTop: "0!important" }}
              >
                <Stack
                  mb={3}
                  pl={2}
                  borderLeft={1}
                  borderStyle={"solid"}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                  align={"start"}
                >
                  {categories &&
                    categories.map((child, i) => (
                      <Link
                        key={i}
                        href={`/services?service=${child.name}`}
                        passHref
                      >
                        <>
                          <Flex
                            w={"100%"}
                            borderRadius={5}
                            p={1}
                            h={10}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            cursor={"pointer"}
                            _hover={{
                              textDecoration: "none",
                              color: "green.400",
                              bg: "#1e242e",
                            }}
                          >
                            <Flex>
                              <Image
                                src={child.icon}
                                alt={`${child.name}-icon`}
                                width={"25px"}
                                height={"25px"}
                              />
                              <Text ml={3}>{child.name}</Text>
                            </Flex>
                            <ChevronRightIcon />
                          </Flex>
                          <Divider />
                        </>
                      </Link>
                    ))}
                </Stack>
              </Collapse>
            </Stack>

            <Stack spacing={4} fontWeight={600} fontSize={"md"} marginTop={2}>
              <Link href="/findServices" passHref>
                <Text cursor={"pointer"}>Buscar Servicios</Text>
              </Link>
              <Link href="/offerServices" passHref>
                <Text cursor={"pointer"}>Ofrecer tus Servicios</Text>
              </Link>
              <Link href="/workbag" passHref>
                <Text cursor={"pointer"}>Bolsa de Trabajo</Text>
              </Link>
            </Stack>

            {pathname === "/myAccount" && (
              <Box marginTop={7} fontSize={"xl"} fontWeight={700}>
                <Text color={"medium_green"}>Panel</Text>
                <Stack
                  spacing={4}
                  fontWeight={600}
                  fontSize={"md"}
                  marginTop={6}
                >
                  <Link href="myAccount?site=accountSettings" passHref>
                    <Text cursor={"pointer"}>Ajustes De La Cuenta</Text>
                  </Link>
                  <Link href="myAccount?site=myfiles" passHref>
                    <Text cursor={"pointer"}>Ver Tus Archivos</Text>
                  </Link>
                  <Link href="myAccount?site=myRequest" passHref>
                    <Text cursor={"pointer"}>Solicitudes</Text>
                  </Link>
                  <Link href="myAccount?site=offerServices" passHref>
                    <Text cursor={"pointer"}>Ofrece Tus Servicios</Text>
                  </Link>

                  <Text>Notificaciones</Text>
                  <Link href="myAccount?site=becomePremium" passHref>
                    <Text cursor={"pointer"}>Hacerse Premium</Text>
                  </Link>
                </Stack>
              </Box>
            )}
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default MobileNav;
