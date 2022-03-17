//chakra
import { useToast } from "@chakra-ui/react";
import { Point, Area } from "react-easy-crop/types";
import { getCroppedImg } from "./cropperUtils";
//from modules
import { useState, useCallback } from "react";
import axios from "axios";
import { Session } from "next-auth/core/types";
import envConfig from "../../../../next-env-config";

interface Props {
  user: Session;
  onCloseUpdateImage(): void;
  image: string;
}

const useHelper = ({ user, onCloseUpdateImage, image }: Props) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = useCallback((_, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      setCroppedImage(croppedImage);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, croppedAreaPixels, rotation]);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const editProfilePic = async () => {
    try {
      setLoading(true);
      const croppedImage: any = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      const newImage = await fetch(croppedImage)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], `${user.name} ProfilePic`, {
              type: "image/png",
            })
        );

      const formData = new FormData();
      formData.append("file", newImage);
      formData.append("path", `users/${user.email}`);
      formData.append("title", `${user.name}-profile-pic`);

      const { data } = await axios.post(
        `${envConfig?.apiUrl}/aws/upload-file`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      );

      await axios.put("/api/user", { email: user.email, image: data.url });

      setLoading(false);
      reloadSession();
      onCloseUpdateImage();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: "Error al cargar la foto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    loading,
    crop,
    zoom,
    croppedImage,
    setCrop,
    setCroppedImage,
    setRotation,
    setZoom,
    onCropComplete,
    showCroppedImage,
    editProfilePic,
  };
};

export default useHelper;
