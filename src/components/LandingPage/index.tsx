//components
import Hero from "./Hero";

const LandingPage: React.FC = () => {
  /* const { data: session, status } = useSession();
  const loading = status === "loading";
  const [user, setUser] = useState<IUser>();
  const [load, setLoad] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const sessionStatus = async () => {
      if (status === "authenticated") {
        try {
          setLoad(true);
          const { data } = await axios.post("api/user", {
            email: session?.user?.email,
            name: session?.user?.name,
            profilePic: session?.user?.image,
          });
          setUser(data.user);
          setLoad(false);
          user &&
            toast({
              title: `Bienvenido ${user.name}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
        } catch (err) {
          toast({
            title: "Error al iniciar sesión.",
            description:
              "Hubo un error al recuperar la información del usuario.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };
    sessionStatus();
  }, [status]); */

  return <Hero />;
};

export default LandingPage;
