
import api from "./axiosConfig";

const getLicense = async (visitor_id) => {
  try {
    const response = await api.post(`/licenses/validate`, { visitor_id });
    return response
  } catch (error) {
    console.error("Error fetching license:", error);
    throw error;
  }
};

const createLicense = async ({ payment_method_id, visitor_id }) => {
  try {
    const response = await api.post("/licenses/create", { payment_method_id, visitor_id });
    return response;
  } catch (error) {
    console.error("Error creating license:", error);
    throw error?.response?.data?.msg || error;
  }
};

export {
  getLicense,
  createLicense
};
