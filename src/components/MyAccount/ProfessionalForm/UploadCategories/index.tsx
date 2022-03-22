//from chakra
import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Switch,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
//from modules
import Image from "next/image";
//types
import { Session } from "next-auth/core/types";
//helper
import useHelper from "./useHelper";
import { ICategories } from "Provider/CategoriesProvider";

type DrawerProps = {
  onClose(): void;
  isOpen: boolean;
  session: Session;
  setUserCategories(value: any): void;
  categories: ICategories[];
};

const UpdateCategories: React.FC<DrawerProps> = ({
  onClose,
  isOpen,
  session,
  setUserCategories,
  categories,
}: DrawerProps) => {
  const {
    drawerLoading,
    selectedCategories,
    handleChangeCategories,
    handleSubmitCategories,
  } = useHelper({
    session,
    categories,
    setUserCategories,
    onClose,
  });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Categorias</DrawerHeader>

        <DrawerBody>
          <Accordion allowToggle mt={3}>
            {categories.map((m: any, i: number) => (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton p={3}>
                    <Flex key={i} alignItems={"center"}>
                      <ChevronDownIcon color={"green"} mr={2} />
                      <Image
                        src={m.icon}
                        width={"35px"}
                        height={"35px"}
                        alt={`cat-icon-${m.name}`}
                      />
                      <Text fontSize={{ base: "md", lg: "lg" }} ml={2}>
                        {m.name}
                      </Text>
                    </Flex>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {m.subcategories.map((s: any, i: number) => (
                    <Flex key={i} alignItems={"center"} ml={2} p={1}>
                      <Switch
                        value={`${s._id},${m._id}`}
                        onChange={handleChangeCategories}
                        isChecked={selectedCategories[`${m._id}`][`${s._id}`]}
                      />
                      <Text fontSize={{ base: "md", lg: "md" }} ml={2}>
                        {s.name}
                      </Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmitCategories}
            isLoading={drawerLoading}
          >
            Modificar Categorias
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UpdateCategories;
