import axios from "axios";
import { ICategory } from "models/Category/ICategory";
import { ISubcategory } from "models/Subcategory/ISubcategory";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface ICategories {
  name: ICategory["name"];
  picture: ICategory["picture"];
  icon: ICategory["icon"];
  description: ICategory["description"];
  _id: ICategory["_id"];
  subcategories: ISubcategory[];
}

type categoriesContextType = {
  categories: ICategories[];
};

const categoriesContextDefaultValues: categoriesContextType = {
  categories: [],
};

const CategoriesContext = createContext<categoriesContextType>(
  categoriesContextDefaultValues
);

export function useCategories() {
  return useContext(CategoriesContext);
}

type Props = {
  children: ReactNode;
};

export function CategoriesProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategories[]>([]);

  const fillData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/categories");
      setCategories(data.categories);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error();
    }
  };

  useEffect(() => {
    if (categories.length < 1) {
      fillData();
    }
  }, [categories]);

  const value = {
    categories,
    loading,
  };
  return (
    <>
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    </>
  );
}
