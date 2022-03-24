//from chakra
import {
  Box,
  Menu,
  Flex,
  Input,
  Avatar,
  Button,
  Divider,
  InputGroup,
  InputRightElement,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
//from modules
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
//components
import Layout from "components/layout";
//assets
import admin from "assets/admin.png";
import worker from "assets/worker.png";
import user from "assets/user.png";
import premium from "assets/premium.png";
import ban from "assets/ban.png";
import { DragHandleIcon, InfoIcon } from "@chakra-ui/icons";
import { IUser } from "Provider/UsersProvider";

const AdminDashboard = () => {
  const toast = useToast();
  const router = useRouter();
  const InputRef = useRef<HTMLInputElement>(null);
  const FilterRef = useRef<HTMLSelectElement>(null);
  const SortRef = useRef<HTMLSelectElement>(null);
  const { data: session } = useSession();
  const { filter, sort } = router.query;
  const [sortParam, setSortParam] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  const [adminInfo, setAdminInfo] = useState<{
    users: IUser[];
    usersNoWorker: number;
    usersWorker: number;
    usersPremium: number;
    usersBanned: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session || session.role !== "ADMIN") {
        router.push("/");
      } else {
        if (filter && sort) {
          try {
            setSortParam(`${sort}`);
            const { data } = await axios.get(
              `/api/admin?filter=${filter}&sort=${sort}`
            );

            const cases: any = {
              allUsers: () => {
                FilterRef.current!.value = `${filter}`;
              },
              isWorker: (boolean: string) => {
                if (boolean === "true") {
                  FilterRef.current!.value = `${filter}`.split(":")[0];
                } else {
                  FilterRef.current!.value = "noWorker";
                }
              },
              isPremium: (boolean: string) => {
                if (boolean === "true") {
                  FilterRef.current!.value = `${filter}`.split(":")[0];
                } else {
                  FilterRef.current!.value = "noPremium";
                }
              },
              isBanned: (boolean: string) => {
                if (boolean === "true") {
                  FilterRef.current!.value = `${filter}`.split(":")[0];
                } else {
                  FilterRef.current!.value = "noBanned";
                }
              },
              withProvider: (boolean: string) => {
                if (boolean === "true") {
                  FilterRef.current!.value = `${filter}`.split(":")[0];
                } else {
                  FilterRef.current!.value = "withoutProvider";
                }
              },
              users: (boolean: string) => {
                if (boolean === "ADMIN") {
                  FilterRef.current!.value = "admins";
                } else {
                  FilterRef.current!.value = "users";
                }
              },
            };

            if (
              `${filter}` === "allUsers" ||
              `${filter}`.split(":")[0] === "isWorker" ||
              `${filter}`.split(":")[0] === "isPremium" ||
              `${filter}`.split(":")[0] === "isBanned" ||
              `${filter}`.split(":")[0] === "withProvider" ||
              `${filter}`.split(":")[0] === "users"
            ) {
              cases[
                `${filter}`.split(":")[0]
                  ? `${filter}`.split(":")[0]
                  : `${filter}`
              ](`${filter}`.split(":")[1]);
            }

            SortRef.current!.value = `${sort}`;

            setAdminInfo({ ...data });
          } catch (err) {
            toast({
              title: "Error al recuperar lo usuarios.",
              description:
                "Ocurrio un error, intentalo de nuevo, si el error persiste no dudes en contactarnos.",
              status: "error",
              duration: 7000,
              isClosable: true,
            });
          }
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, reload, session]);

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    const cases = {
      allUsers: () => {
        router.push(`/adminDashboard?filter=allUsers&sort=${sortParam}`);
      },
      isWorker: () => {
        router.push(`/adminDashboard?filter=isWorker:true&sort=${sortParam}`);
      },
      noWorker: () => {
        router.push(`/adminDashboard?filter=isWorker:false&sort=${sortParam}`);
      },
      isPremium: () => {
        router.push(`/adminDashboard?filter=isPremium:true&sort=${sortParam}`);
      },
      noPremium: () => {
        router.push(`/adminDashboard?filter=isPremium:false&sort=${sortParam}`);
      },
      isBanned: () => {
        router.push(
          `/adminDashboard?filter=statusAccount:BANNED&sort=${sortParam}`
        );
      },
      isActive: () => {
        router.push(
          `/adminDashboard?filter=statusAccount:ACTIVE&sort=${sortParam}`
        );
      },
      withProvider: () => {
        router.push(
          `/adminDashboard?filter=withProvider:true&sort=${sortParam}`
        );
      },
      withoutProvider: () => {
        router.push(
          `/adminDashboard?filter=withProvider:false&sort=${sortParam}`
        );
      },
      admins: () => {
        router.push(`/adminDashboard?filter=role:ADMIN&sort=${sortParam}`);
      },
      users: () => {
        router.push(`/adminDashboard?filter=role:USER&sort=${sortParam}`);
      },
      alphOrd: () => {
        router.push(`/adminDashboard?filter=${filter}&sort=alphOrd`);
      },
      reverseAlphOrd: () => {
        router.push(`/adminDashboard?filter=${filter}&sort=reverseAlphOrd`);
      },
    };

    if (
      value === "allUsers" ||
      value === "isWorker" ||
      value === "noWorker" ||
      value === "isPremium" ||
      value === "noPremium" ||
      value === "withProvider" ||
      value === "withoutProvider" ||
      value === "alphOrd" ||
      value === "reverseAlphOrd" ||
      value === "isBanned" ||
      value === "isActive" ||
      value === "admins" ||
      value === "users"
    ) {
      return cases[value]();
    }
  };

  const handleChangeInputSearch = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const { value } = e.currentTarget;

    try {
      if (value.length > 0) {
        const { data } = await axios.get(
          `/api/admin?filter=${filter}&sort=${sort}&input=${value}`
        );
        setAdminInfo({ ...data });
      } else {
        const { data } = await axios.get(
          `/api/admin?filter=${filter}&sort=${sort}`
        );

        setAdminInfo({ ...data });
      }
    } catch (err) {
      toast({
        title: "Error al recuperar lo usuarios.",
        description:
          "Ocurrio un error, intentalo de nuevo, si el error persiste no dudes en contactarnos.",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleActions = async (
    userName: string,
    userId: string,
    reason: string
  ) => {
    try {
      await axios.put(`/api/admin`, {
        adminId: session?._id,
        userId,
        reason,
      });

      const resMessage = {
        BAN: () => `${userName} ha sido banead@.`,
        DESBAN: () => `${userName} ha sido desbanead@.`,
        ADMIN: () => `${userName} ha sido ascendi@ a administrador.`,
        USER: () => `${userName} ha sido degradado@ a usuario.`,
      };

      if (
        typeof reason === "string" &&
        (reason === "BAN" ||
          reason === "DESBAN" ||
          reason === "ADMIN" ||
          reason === "USER")
      ) {
        setReload(!reload);
        InputRef.current!.value = "";
        toast({
          title: resMessage[reason](),
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error al realizar la acción.",
        description:
          "Ocurrio un error, intentalo de nuevo, si el error persiste no dudes en contactarnos.",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Flex
        h={"max-content"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        mb={5}
        mt={14}
      >
        <Box
          position={"relative"}
          w={{ base: "95%", lg: "1300px" }}
          h={"95%"}
          bg={useColorModeValue("#fafafa", "#1A202C")}
          border="1px solid gray"
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
          borderTopRightRadius={5}
          borderTopLeftRadius={5}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Flex
            position={"absolute"}
            top={"-45px"}
            left={0}
            alignItems={"center"}
          >
            <Image
              src={admin}
              alt="user-image"
              width={"32px"}
              height={"32px"}
            />
            <Text fontSize={{ base: "md", md: "28px" }} ml={2} fontWeight={500}>
              Panel de Administrador
            </Text>
          </Flex>
          <Flex flexWrap={"wrap"} justifyContent={"space-evenly"} p={4}>
            <Flex
              w={{ base: "98%", md: "48%", lg: "24%" }}
              h={"6rem"}
              borderRadius={"15px"}
              backgroundColor={useColorModeValue("gray.100", "gray.700")}
              p={2}
              mb={3}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flexDirection={"column"}>
                <Text fontWeight={500} color={"gray.400"}>
                  Usuarios Contratistas
                </Text>
                <Text ml={2} fontSize={"lg"}>
                  {adminInfo?.usersNoWorker}
                </Text>
              </Flex>
              <Box
                w={"30%"}
                d={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={user}
                  alt="user-image"
                  width={"45px"}
                  height={"45px"}
                />
              </Box>
            </Flex>

            <Flex
              w={{ base: "98%", md: "48%", lg: "24%" }}
              h={"6rem"}
              borderRadius={"15px"}
              backgroundColor={useColorModeValue("gray.100", "gray.700")}
              p={2}
              mb={3}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flexDirection={"column"}>
                <Text fontWeight={500} color={"gray.400"}>
                  Usuarios Trabajadores
                </Text>
                <Text ml={2} fontSize={"lg"}>
                  {adminInfo?.usersWorker}
                </Text>
              </Flex>
              <Box
                w={"30%"}
                d={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={worker}
                  alt="user-image"
                  width={"45px"}
                  height={"45px"}
                />
              </Box>
            </Flex>

            <Flex
              w={{ base: "98%", md: "48%", lg: "24%" }}
              h={"6rem"}
              borderRadius={"15px"}
              backgroundColor={useColorModeValue("gray.100", "gray.700")}
              p={2}
              mb={3}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flexDirection={"column"}>
                <Text fontWeight={500} color={"gray.400"}>
                  Usuarios Premium
                </Text>
                <Text ml={2} fontSize={"lg"}>
                  {adminInfo?.usersPremium}
                </Text>
              </Flex>
              <Box
                w={"30%"}
                d={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={premium}
                  alt="user-image"
                  width={"45px"}
                  height={"45px"}
                />
              </Box>
            </Flex>

            <Flex
              w={{ base: "98%", md: "48%", lg: "24%" }}
              h={"6rem"}
              borderRadius={"15px"}
              backgroundColor={useColorModeValue("gray.100", "gray.700")}
              p={2}
              mb={3}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flexDirection={"column"}>
                <Text fontWeight={500} color={"gray.400"}>
                  Usuarios Baneados
                </Text>
                <Text ml={2} fontSize={"lg"}>
                  {adminInfo?.usersBanned}
                </Text>
              </Flex>
              <Box
                w={"30%"}
                d={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={ban}
                  alt="user-image"
                  width={"45px"}
                  height={"45px"}
                />
              </Box>
            </Flex>
          </Flex>
          <Flex justifyContent={"center"} p={2}>
            <Flex
              backgroundColor={useColorModeValue("gray.100", "gray.700")}
              justifyContent={"center"}
              position={"relative"}
              borderRadius={7}
              w={"97%"}
              pt={"5rem"}
            >
              <Box
                position={"absolute"}
                top={"-20px"}
                w={"97%"}
                bg={useColorModeValue("medium_green", "dark_blue_sub.400")}
                borderRadius={7}
                h={"5rem"}
                d={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                p={4}
              >
                <Text fontSize={"lg"} w={"33%"} color={"#fafafa"}>
                  Lista de Usuarios
                </Text>
                <Flex w={"33%"} justifyContent={"space-between"}>
                  <Select
                    w={"35%"}
                    borderColor={"#fafafa"}
                    placeholder={"Orden "}
                    ref={SortRef}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={"alphOrd"}>A-Z</option>
                    <option value={"reverseAlphOrd"}>Z-A</option>
                  </Select>
                  <Select
                    w={"60%"}
                    borderColor={"#fafafa"}
                    ref={FilterRef}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value={"allUsers"}>Todos los Usuarios</option>

                    <option value={"noWorker"} color="#fafafa">
                      {" "}
                      Contratistas
                    </option>
                    <option value={"isWorker"}>Trabajadores</option>
                    <option value={"isPremium"}>Usuarios Premium</option>
                    <option value={"noPremium"}>Usuarios no Premium</option>
                    <option value={"isBanned"}>Usuarios Baneados</option>
                    <option value={"isActive"}>Usuario no Baneados</option>
                    <option value={"admins"}>Usuarios Administradores</option>
                    <option value={"users"}>Usuario no Administradores</option>
                    <option value={"withProvider"}>
                      Registrados con Servidores Externos
                    </option>
                    <option value={"withoutProvider"}>
                      Registrados con Correo Electronico
                    </option>
                  </Select>
                </Flex>
                <InputGroup w={"33%"}>
                  <Input
                    borderColor={"#fafafa"}
                    color={"#fafafa"}
                    type="text"
                    ref={InputRef}
                    placeholder={"Buscar Usuarios"}
                    onChange={handleChangeInputSearch}
                  />
                  <InputRightElement position={"absolute"} zIndex={999}>
                    <Popover>
                      <PopoverTrigger>
                        <Button variant={"ghost"}>
                          <InfoIcon color={"#fafafa"} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>
                          ¿Necesitas encontrar un usuario?
                        </PopoverHeader>
                        <PopoverBody>
                          ¡Puedes buscar por nombre, correo, numero de celular y
                          mucho mas!
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Flex
                w={"97%"}
                overflow={"auto"}
                h={"38rem"}
                flexDirection={"column"}
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
                <Flex>
                  <Text
                    w={"25%"}
                    textAlign={"center"}
                    color={"gray.400"}
                    fontSize={"lg"}
                  >
                    Nombre
                  </Text>
                  <Text
                    w={"25%"}
                    textAlign={"center"}
                    color={"gray.400"}
                    fontSize={"lg"}
                  >
                    Correo
                  </Text>
                  <Text
                    w={"25%"}
                    textAlign={"center"}
                    color={"gray.400"}
                    fontSize={"lg"}
                  >
                    Número de Celular
                  </Text>
                  <Text
                    w={"15%"}
                    textAlign={"center"}
                    color={"gray.400"}
                    fontSize={"lg"}
                  >
                    Estado
                  </Text>
                  <Box w={"10%"}>{adminInfo?.users.length} resultados</Box>
                </Flex>
                <Divider mt={2} />
                {adminInfo?.users.map((m, i) => (
                  <Box key={i}>
                    <Flex
                      w={"97%"}
                      justifyContent={"space-between"}
                      position={"relative"}
                    >
                      <Flex w={"25%"} alignItems={"center"} mt={2}>
                        <Avatar src={m.profilePic} name={m.name} />
                        <Text
                          ml={2}
                          textTransform={"capitalize"}
                          overflow="hidden"
                          css={{
                            display: "-webkit-box",
                            ["WebkitBoxOrient"]: "vertical",
                            ["WebkitLineClamp"]: "1",
                          }}
                        >
                          {m.name}
                        </Text>
                      </Flex>
                      <Flex w={"25%"} alignItems={"center"} mt={2}>
                        <Text
                          ml={2}
                          textTransform={"capitalize"}
                          overflow="hidden"
                          css={{
                            display: "-webkit-box",
                            ["WebkitBoxOrient"]: "vertical",
                            ["WebkitLineClamp"]: "1",
                          }}
                        >
                          {m.email}
                        </Text>
                      </Flex>
                      <Flex
                        w={"25%"}
                        alignItems={"center"}
                        mt={2}
                        justifyContent={"center"}
                      >
                        <Text
                          ml={2}
                          textTransform={"capitalize"}
                          overflow="hidden"
                          css={{
                            display: "-webkit-box",
                            ["WebkitBoxOrient"]: "vertical",
                            ["WebkitLineClamp"]: "1",
                          }}
                        >
                          {m.phone && m.phone.diallingCode && m.phone.number
                            ? `${m.phone.diallingCode}-${m.phone.number}`
                            : "-"}
                        </Text>
                      </Flex>
                      <Flex
                        w={"15%"}
                        alignItems={"center"}
                        mt={2}
                        justifyContent={"center"}
                      >
                        <Text
                          textAlign={"center"}
                          ml={2}
                          textTransform={"capitalize"}
                          overflow="hidden"
                          css={{
                            display: "-webkit-box",
                            ["WebkitBoxOrient"]: "vertical",
                            ["WebkitLineClamp"]: "1",
                          }}
                          color={
                            m.isAuthenticated ? "medium_green" : "warning_red"
                          }
                        >
                          {m.isAuthenticated
                            ? "Cuenta Verificada"
                            : " Cuenta sin Verificar"}
                        </Text>
                      </Flex>
                      <Box ml={2} mt={2}>
                        <Menu>
                          <MenuButton as={Button} iconSpacing={0}>
                            <DragHandleIcon />
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                handleActions(
                                  m.name,
                                  m._id,
                                  m.statusAccount === "BANNED"
                                    ? "DESBAN"
                                    : "BAN"
                                )
                              }
                            >
                              {m.statusAccount === "BANNED"
                                ? "Desbanear "
                                : "Banear "}
                              a {m.name}
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                              onClick={() =>
                                router.push(`/professional/${m._id}`)
                              }
                            >
                              Visitar Perfil
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem>Ver Denuncias</MenuItem>
                            <MenuDivider />
                            <MenuItem>Enviar Correo Electronico</MenuItem>
                            <MenuDivider />
                            <MenuItem
                              onClick={() =>
                                handleActions(
                                  m.name,
                                  m._id,
                                  m.role === "USER" ? "ADMIN" : "USER"
                                )
                              }
                            >
                              {m.role === "USER"
                                ? "Ascender a Administrador"
                                : "Descender a Usuario"}
                            </MenuItem>
                            <MenuDivider />
                            {!m.isAuthenticated && (
                              <MenuItem>
                                Enviar Recordatorio de Activación de Cuenta
                              </MenuItem>
                            )}
                          </MenuList>
                        </Menu>
                      </Box>
                    </Flex>
                    <Divider mt={2} />
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
};

export default AdminDashboard;
