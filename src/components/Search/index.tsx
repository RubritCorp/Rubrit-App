import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  BoxProps,
  FlexProps,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
} from "@chakra-ui/react";
import { MapPin, Star } from "phosphor-react";
import { usePlacesWidget } from "react-google-autocomplete";
import { ReactNode, useEffect, useState } from "react";

// interface LinkItemProps {
//   name: string;
//   icon: any;
// }
// const LinkItems: Array<LinkItemProps> = [
//   { name: 'Home', icon: BellIcon },
//   { name: 'Trending', icon: BellIcon },
//   { name: 'Explore', icon: BellIcon },
//   { name: 'Favourites', icon: BellIcon },
//   { name: 'Settings', icon: BellIcon },
// ];

export default function SimpleSidebar({
  children,
  isOpen,
  onClose,
  filters,
  setFilters,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: any;
  filters: any;
  setFilters: any;
}) {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        filters={filters}
        setFilters={setFilters}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent zIndex={1}>
          <SidebarContent
            onClose={onClose}
            filters={filters}
            setFilters={setFilters}
          />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  filters: any;
  onClose: () => void;
  setFilters: any;
}

const SidebarContent = ({
  onClose,
  filters,
  setFilters,
  ...rest
}: SidebarProps) => {
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
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      overflow="hidden"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Filtrar por
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {/* NavItems (filters) */}
      <NavItem key="location" icon={MapPin} text="Ubicación">
        <Stack width="full">
          <Input
            placeholder="Lugar"
            ref={ref}
            size="sm"
            defaultValue={filters.location?.address}
            onChange={(e: any) =>
              e.target.value == ""
                ? setFilters({ ...filters, location: null })
                : null
            }
          />
          {filters.location ? (
            <SliderInput filters={filters} setFilters={setFilters} />
          ) : null}
        </Stack>
      </NavItem>
      <NavItem key="rating" icon={Star} text="Puntuación">
        <RangeSliderInput filters={filters} setFilters={setFilters} />
      </NavItem>
      <Box textAlign="center">
        <Button display={{ base: "inline", md: "none" }} onClick={onClose}>
          Aplicar filtros
        </Button>
      </Box>
    </Box>
  );
};

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

function SliderInput({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: any;
}) {
  const [value, setValue] = useState(filters.location?.range || 20);
  const handleChange = (value: number) => setValue(value);

  useEffect(() => {
    setFilters({ ...filters, location: { ...filters.location, range: value } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Slider
      focusThumbOnChange={false}
      value={value}
      onChange={handleChange}
      min={0}
      max={200}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb fontSize="sm" boxSize={6} color="black" title="Rango (km)">
        {value}
      </SliderThumb>
    </Slider>
  );
}

function RangeSliderInput({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: any;
}) {
  const [value, setValue] = useState([1, 5]);

  useEffect(() => {
    setFilters({ ...filters, rating: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    // eslint-disable-next-line jsx-a11y/aria-proptypes
    <RangeSlider
      aria-label={["min", "max"]}
      defaultValue={[1, 5]}
      min={1}
      max={5}
      onChange={(val) => setValue(val)}
    >
      <RangeSliderTrack bg="red.100">
        <RangeSliderFilledTrack bg="gold" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} color="black" index={0}>
        {value[0]}
      </RangeSliderThumb>
      <RangeSliderThumb boxSize={6} color="black" index={1}>
        {value[1]}
      </RangeSliderThumb>
    </RangeSlider>
  );
}
