//types
import { Session } from "next-auth/core/types";
import { toast, useToast } from "@chakra-ui/react";
import envConfig from "../../../../../next-env-config";
//from modules
import { useRef, useState } from "react";
import axios from "axios";

type Props = {
  session: Session;
  onClose?(): void;
  typeImages: string;
};

const useHelper = ({ session, onClose, typeImages }: Props) => {
  const toast = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //images states
  const [images, setImages] = useState<string[]>([
    ...session.workerData[
      typeImages === "certification" || typeImages === "images"
        ? typeImages
        : "certification"
    ],
  ]);
  const [unselectedImages, setUnselectedImages] = useState<string[]>([]);

  //pagination states
  const [numberPage, setNumberPage] = useState<number>(0);
  const [numberPageUnselected, setNumberPageUnselected] = useState<number>(0);

  const numberOfCertificationImages = session.workerData.certification.length;

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const handleUnselectImage = (e: React.FormEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setImages(images.filter((f) => f !== value));
    setUnselectedImages([...unselectedImages, value]);
  };

  const handleReSelectImage = (e: React.FormEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setUnselectedImages(unselectedImages.filter((f) => f !== value));
    setImages([value, ...images]);
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

    if (
      pic.length +
        session.workerData.certification.length +
        session.workerData.images.length >
        20 &&
      !session.isPremium
    ) {
      toast({
        title: "¡La cantidad de imagenes subidas superan el cupo de su cuota!",
        description: `¡Lo sentimos!. Solo puedes cargar ${
          (session.workerData.certification.length +
            session.workerData.images.length -
            20) *
          -1
        } elementos, adquiere la suscripción premium para subir tantos archivos como desees!`,
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }

    if (pic) {
      let blob: string[] = [];

      for (let e in pic) {
        if (typeof pic[e] === "object") {
          let name = URL.createObjectURL(pic[e]);

          blob = [name, ...blob];
        }
      }

      setImages([...blob, ...images]);
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let blobImages: any = images.filter((f) => f.includes("blob"));
      let finalData: string[] = images.filter((f) => !f.includes("blob"));

      if (blobImages.length) {
        blobImages = blobImages.map(
          async (m: string) =>
            await fetch(m)
              .then((r) => r.blob())
              .then(
                (blobFile) =>
                  new File(
                    [blobFile],
                    `${session._id}-${Math.floor(
                      Math.random() * (1000 - 1) + 1
                    )}ceritification.png`,
                    {
                      type: "image/png",
                    }
                  )
              )
        );
        blobImages = await Promise.all(blobImages);

        let formData = new FormData();
        formData.append(
          "path",
          `users/${session!._id}/files/form/${
            typeImages === "certification" ? "certification" : "services"
          }`
        );
        formData.append(
          "title",
          `${typeImages === "certification" ? "certification" : "images"}`
        );

        for (let i = 0; i < blobImages.length; i++) {
          formData.append("files", blobImages[i] as any);
        }

        const { data } = await axios.post(
          `${envConfig?.apiUrl}/aws/upload-files`,
          formData,
          {
            headers: {
              accept: "application/json",
              "content-type": "multipart/form-data",
            },
          }
        );

        finalData = [...data.urls, ...finalData];
      }
      setLoading(false);
      await axios.put(
        typeImages === "certification"
          ? "/api/user/updateCertification"
          : "/api/user/updateServicesImages",
        {
          _id: session._id,
          images: finalData,
        }
      );
      toast({
        title:
          typeImages === "certification"
            ? "La documentación se modifico exitosamente!."
            : "Las imagenes de sus servicios se modificaron exitosamente!.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (onClose) onClose();
      setLoading(false);
      setUnselectedImages([]);
      setNumberPage(0);
      setNumberPageUnselected(0);
      reloadSession();
    } catch (err) {
      setLoading(false);
      toast({
        title:
          typeImages === "certification"
            ? "Ocurrio un error al actualizar la documentación!."
            : "Ocurrio un error al actualizar las imagenes!.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    images,
    loading,
    numberPage,
    inputFileRef,
    unselectedImages,
    numberPageUnselected,
    numberOfCertificationImages,
    setNumberPageUnselected,
    onChangeUploadImages,
    handleReSelectImage,
    handleUnselectImage,
    setUnselectedImages,
    setNumberPage,
    handleSubmit,
    setImages,
  };
};

export default useHelper;
