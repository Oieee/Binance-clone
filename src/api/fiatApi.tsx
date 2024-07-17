import axiosInstance from "./axiosInstance";

const fiatApi = {
  getAllFiat: async () => {
    try {
      const response = await axiosInstance.get("/fiats");
      return response.data;
    } catch (error) {
      console.error("Error fetching all fiats:", error);
      throw error;
    }
  },
};

export default fiatApi;
