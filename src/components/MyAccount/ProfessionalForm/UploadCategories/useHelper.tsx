//from modules
import { ICategories } from "Provider/CategoriesProvider";
import React, { useEffect, useState } from "react";
//types
import { Session } from "next-auth/core/types";
//chakra
import { useToast } from "@chakra-ui/react";
import axios from "axios";

type Props = {
  session: Session;
  categories: ICategories[];
  setUserCategories(value: any): void;
  onClose(): void;
};

const useHelper = ({
  session,
  categories,
  setUserCategories,
  onClose,
}: Props) => {
  const toast = useToast();
  const [drawerLoading, setDrawerLoading] = useState<boolean>(false);

  let initialState: any = {};
  let cats = categories.map((m) => {
    initialState[`${m._id}`] = {};
    m.subcategories.map((s) => {
      initialState[`${m._id}`][`${s._id}`] = [
        session.workerData.items.find((f) =>
          f.subcategories.find((f) => f._id === `${s._id}`)
        ),
      ].includes(undefined)
        ? false
        : true;
    });
  });

  const [selectedCategories, setSelectedCategories] = useState(initialState);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const handleChangeCategories = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value) {
      let subcategory: string = value.split(",")[0].trim();
      let category: string = value.split(",")[1].trim();

      setSelectedCategories({
        ...selectedCategories,
        [category]: {
          ...selectedCategories[category],
          [subcategory]: !selectedCategories[category][subcategory],
        },
      });
    }
  };

  const handleSubmitCategories = async () => {
    setDrawerLoading(true);
    const categories: any = {};

    for (let e in selectedCategories) {
      for (let s in selectedCategories[e]) {
        if (selectedCategories[e][s]) {
          if (categories[e]) {
            categories[e].push(s);
          } else {
            categories[e] = [s];
          }
        }
      }
    }

    if (!session.isPremium && Object.keys(categories).length > 3) {
      setDrawerLoading(false);
      return toast({
        title: "Solo se pueden seleccionar 3 categorias",
        description:
          "¡Pasate a la versión Premium y elegí la cantidad de categorias que quieras!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

    setDrawerLoading(false);
    setUserCategories({ ...categories });
    onClose();
  };

  return {
    drawerLoading,
    selectedCategories,
    handleChangeCategories,
    handleSubmitCategories,
  };
};

export default useHelper;
