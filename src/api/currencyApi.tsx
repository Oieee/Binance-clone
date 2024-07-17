import axiosInstance from "./axiosInstance";

const currencyApi = {
  getAllCurrency: async () => {
    try {
      const response = await axiosInstance.get("/currencies");
      return response.data;
    } catch (error) {
      console.error("Error fetching all currency:", error);
      throw error;
    }
  },
};

export default currencyApi;
