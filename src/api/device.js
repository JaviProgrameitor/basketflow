import api from "./axiosConfig";

const deviceGetOrCreate = async (deviceData = {}) => {
  try {
    const response = await api.post("/device/get-create-device", deviceData);
    return response.token;
  } catch (error) {
    console.error("Error fetching device info:", error);
    throw error;
  }
};

const deviceValidateToken = async (visitor_id, token) => {
  try {
    const response = await api.post("/device/validate",
      { visitor_id }, {
        headers: {
          "x-device-token": token,
        }
      }
    );
    return response.token;
  } catch (error) {
    console.error("Error validating device token:", error);
    throw error;
  }
};

export {
  deviceGetOrCreate,
  deviceValidateToken
}
