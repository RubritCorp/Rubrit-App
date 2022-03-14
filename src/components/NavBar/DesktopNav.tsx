//from chakra
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategories, useCategories } from "Provider/CategoriesProvider";

export default function DesktopNav() {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { categories } = useCategories();

  return (
    <Stack direction={"row"} spacing={4}>
      <Box
        borderBottom={"2px solid transparent"}
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <PopoverTrigger>
            <Text
              p={2}
              fontSize={{ base: "xs", xl: "sm" }}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              cursor="pointer"
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
                  </Link>
                </Popover>
              </Box>
            ))}
          </PopoverContent>
        </Popover>
      </Box>
      <Box
        borderBottom={"2px solid transparent"}
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <Link href={"/findServices"} passHref>
            <Text
              p={2}
              fontSize={{ base: "xs", xl: "sm" }}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              cursor="pointer"
            >
              Buscar Servicios
            </Text>
          </Link>
        </Popover>
      </Box>
      <Box
        borderBottom={"2px solid transparent"}
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <Link href={"/offerServices"} passHref>
            <Text
              p={2}
              fontSize={{ base: "xs", xl: "sm" }}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              cursor="pointer"
            >
              Ofrece tus Servicios
            </Text>
          </Link>
        </Popover>
      </Box>
      <Box
        borderBottom={"2px solid transparent"}
        _hover={{ borderBottom: "2px solid #2EB67D" }}
      >
        <Popover trigger="hover" placement={"bottom-start"}>
          <Link href={"/workbag"} passHref>
            <Text
              p={2}
              fontSize={{ base: "xs", xl: "sm" }}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
              cursor="pointer"
            >
              Bolsa de Trabajo
            </Text>
          </Link>
        </Popover>
      </Box>
    </Stack>
  );
}
