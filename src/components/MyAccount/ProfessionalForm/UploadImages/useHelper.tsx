//types
import { Session } from "next-auth/core/types";
import { toast, useToast } from "@chakra-ui/react";
import envConfig from "../../../../../next-env-config";
//from modules
import { useRef, useState } from "react";
import axios from "axios";

type Props = {
  images: string[];
  typeImages: string;
  setImages(value: string[]): void;
  onClose(): void;
};

const useHelper = ({ images, typeImages, setImages, onClose }: Props) => {
  const toast = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([...images]);
  const [unselectedImages, setUnselectedImages] = useState<string[]>([]);

  //pagination states
  const [numberPage, setNumberPage] = useState<number>(0);
  const [numberPageUnselected, setNumberPageUnselected] = useState<number>(0);

  const handleUnselectImage = (e: React.FormEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setUploadedImages(uploadedImages.filter((f) => f !== value));
    setUnselectedImages([...unselectedImages, value]);
  };

  const handleReSelectImage = (e: React.FormEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setUnselectedImages(unselectedImages.filter((f) => f !== value));
    setUploadedImages([value, ...uploadedImages]);
  };

  const onChangeUploadImages = (pic: FileList) => {
    if (!pic) {
      toast({
        title: "Seleccione una imagen",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pic) {
      let blob: string[] = [];

      for (let e in pic) {
        if (typeof pic[e] === "object") {
          let name = URL.createObjectURL(pic[e]);

          blob = [name, ...blob];
        }
      }

      setUploadedImages([...blob, ...uploadedImages]);
      setNumberPage(0);
      inputFileRef.current && (inputFileRef.current.value = "");
    } else {
      toast({
        title: "Seleccione una imagen valida",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleSubmit = () => {
    setImages([...uploadedImages]);
    setUnselectedImages([]);
    onClose();
  };

  return {
    loading,
    numberPage,
    inputFileRef,
    uploadedImages,
    unselectedImages,
    numberPageUnselected,
    setNumberPageUnselected,
    onChangeUploadImages,
    handleReSelectImage,
    handleUnselectImage,
    setUnselectedImages,
    setUploadedImages,
    setNumberPage,
    handleSubmit,
  };
};

export default useHelper;
