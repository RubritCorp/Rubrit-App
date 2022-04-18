import {
  Box,
  Flex,
  Icon,
  Text,
  FlexProps,
  Select,
  Stack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePlacesWidget } from "react-google-autocomplete";
import { MapPin, Star } from "phosphor-react";

interface NavItemProps extends FlexProps {
  icon: any;
  children: any;
  text: string;
}

const NavItem = ({ icon, text, children, ...rest }: NavItemProps) => {
  return (
    <Stack p="2" mx="2">
      <Text>{text}</Text>
      <Flex align="center" borderRadius="lg" role="group" {...rest}>
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Stack>
  );
};

const SideBar: React.FC<{
  defaultLocation: any;
  filters: any;
  setFilters: any;
}> = ({ defaultLocation, filters, setFilters }) => {
  const { ref }: any = usePlacesWidget({
    apiKey: "AIzaSyDlRwG9CITQZ2vO0tJrw-GRzuoCfKYjBzM",
    options: {
      types: ["(cities)"],
    },
    onPlaceSelected: (place: any) => {
      if (place?.formatted_address) {
        let location = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setFilters({ ...filters, location: location });
      }
    },
  });

  return (
    <Box bg={useColorModeValue("white", "gray.800")}>
      <Text>Filtar por</Text>
      <NavItem key="location" icon={MapPin} text="Ubicación">
        <Input
          placeholder="Lugar"
          size="sm"
          ref={ref}
          defaultValue={filters.location?.address}
          onChange={(e: any) =>
            e.target.value == ""
              ? setFilters({ ...filters, location: null })
              : null
          }
        />
        <Select>
          <option>categoria</option>
        </Select>
        <Select>
          <option>fecha</option>
        </Select>
      </NavItem>
    </Box>
  );
};

export default SideBar;
