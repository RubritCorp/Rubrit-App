import axios from 'axios';

export const search = async () => {
  try {
    const apiResponse = await axios.get('/api/public/users?city=Cordoba Capital, Cordoba, Argentina&lat=-31.4198303&lng=-64.1903709&searchRange=100');
    return { success: true, data: apiResponse.data}
  } catch (err) {
    return { success: false, data: err}
  }
};