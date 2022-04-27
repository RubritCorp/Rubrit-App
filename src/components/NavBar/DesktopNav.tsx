//from chakra
import {
  Box,
  Text,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { ICategories, useCategories } from "Provider/CategoriesProvider";
import { useRouter } from "next/router";

export default function DesktopNav() {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { categories } = useCategories();
  const { pathname } = useRouter();

  const selectedPath = (path: string) => {
    const cases = {
      ["/services"]: "Servicios",
      ["/findServices"]: "Buscar Servicios",
      ["/offerServices"]: "Ofrece tus Servicios",
      ["/workbag"]: "Bolsa de Trabajo",
    };
    if (
      (path && path === "/services") ||
      path === "/findServices" ||
      path === "/offerServices" ||
      path === "/workbag"
    ) {
      return cases[path];
    }
  };

  return (
    <Stack direction={"row"} spacing={4}>
      <Box
        borderBottom={"2px solid transparent"}
        _hover={{ borderBottom: "2px solid #2EB67D" }}
        d={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <PopoverTrigger>
            <Text
              p={2}
              fontSize={{ base: "1rem", xl: "1.1rem" }}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              cursor="pointer"
              textAlign={"center"}
            >
              Servicios
            </Text>
          </PopoverTrigger>
          <PopoverContent
            border={0}
            boxShadow={"xl"}
            p={4}
            w={"20rem"}
            maxH={"400px"}
            overflowY="auto"
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
            {categories.map((m: ICategories, i: number) => (
              <Box key={i}>
                <Popover trigger={"hover"} placement={"bottom-start"}>
                  <Link passHref href={{ pathname: `/services/${m.name}` }}>
                    <a>
                      <Text
                        d={"flex"}
                        justifyContent={"space-between"}
                        borderRadius={5}
                        w={"100%"}
                        p={2}
                        fontSize={"sm"}
                        fontWeight={500}
                        _hover={{
                          textDecoration: "none",
                          color: "green.400",
                          bg: "green.50",
                        }}
                        cursor={"pointer"}
                      >
                        {m.name}
                        <ChevronRightIcon />
                      </Text>
                    </a>
                  </Link>
                </Popover>
              </Box>
            ))}
          </PopoverContent>
        </Popover>
      </Box>
      <Box
        borderBottom={
          selectedPath(`${pathname}`) === "Buscar Servicios"
            ? "2px solid #2EB67D"
            : "2px solid transparent"
        }
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <Link href={"/findServices"} passHref>
            <a>
              <Text
                p={2}
                fontSize={{ base: "1rem", xl: "1.1rem" }}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                cursor="pointer"
                textAlign={"center"}
              >
                Buscar Servicios
              </Text>
            </a>
          </Link>
        </Popover>
      </Box>
      <Box
        borderBottom={
          selectedPath(`${pathname}`) === "Ofrece tus Servicios"
            ? "2px solid #2EB67D"
            : "2px solid transparent"
        }
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <Link href={"/offerServices"} passHref>
            <a>
              <Text
                p={2}
                fontSize={{ base: "1rem", xl: "1.1rem" }}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                cursor="pointer"
                textAlign={"center"}
              >
                Ofrece tus Servicios
              </Text>
            </a>
          </Link>
        </Popover>
      </Box>
      <Box
        borderBottom={
          selectedPath(`${pathname}`) === "Bolsa de Trabajo"
            ? "2px solid #2EB67D"
            : "2px solid transparent"
        }
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <Link href={"/workbag"} passHref>
            <a>
              <Text
                p={2}
                fontSize={{ base: "1rem", xl: "1.1rem" }}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                cursor="pointer"
                textAlign={"center"}
              >
                Bolsa de Trabajo
              </Text>
            </a>
          </Link>
        </Popover>
      </Box>
    </Stack>
  );
}
