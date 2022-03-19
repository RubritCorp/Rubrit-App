//from modules
import { useCategories } from "Provider/CategoriesProvider";
import React, { useEffect, useState } from "react";
//types
import { Session } from "next-auth/core/types";
//chakra
import { useToast } from "@chakra-ui/react";
import axios from "axios";

type Props = {
  session: Session;
};

const useHelper = ({ session }: Props) => {
  const { categories } = useCategories();
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

    try {
      await axios.put(`/api/user/updateCategories`, {
        _id: session._id,
        categories,
      });
      toast({
        title: "El Perfil se modifico exitosamente!.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setDrawerLoading(false);
      reloadSession();
    } catch (err) {
      setDrawerLoading(false);
      toast({
        title: "Ocurrio un error al modificar la información del Perfil.",
        description:
          "¡Intentalo de nuevo, si el error persiste no dudes en contactarnos!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    categories,
    drawerLoading,
    selectedCategories,
    handleChangeCategories,
    handleSubmitCategories,
  };
};

export default useHelper;
