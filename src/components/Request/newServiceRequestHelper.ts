import axios from "axios";
import * as Yup from "yup";
import envConfig from "../../../next-env-config";

interface DataInitialValues {
  title: string;
  description: string;
  location: string;
  images: FileList | null;
}

export const initialValues: DataInitialValues = {
  title: "",
  description: "",
  location: "",
  images: null
};

export const validationSchema = Yup.object({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  location: Yup.string().required("La ubicación es requerida")
});

export const handleSubmit = async (values: DataInitialValues) => {
  const { title, description, location } = values;
  const images: FileList | null = values.images;
  // Upload images to AWS via backend
  const formData = new FormData();
  formData.append('path', 'test');
  formData.append('title', title);
  // Append files individually since FormData does not support FileList
  if (images && images.length > 0) {
    for (let i = 0 ; i < images.length ; i++) {
      formData.append('files', images[i] as any);
    }
  }
  
  try {
    let serviceRequest = { title, description, location, images: null };
    // API request for file upload
    if (images && images?.length > 0) {
      const { data } = await axios.post(`${envConfig?.apiUrl}/aws/upload-files`, formData, { headers: { 'content-type': 'multipart/form-data' } });
      serviceRequest.images = data.urls;
    }
    const apiResponse = await axios.post('/api/serviceRequest/new', serviceRequest);
    return { success: true, data: apiResponse.data}
  } catch (err) {
    return { success: false, data: err}
  }
};