import axiosInstance from "./axiosInstance";

const chartApi = {
  getChart: async (coinId: string, period: string) => {
    try {
      const response = await axiosInstance.get(
        `/coins/${coinId}/charts?period=${period}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all fiats:", error);
      throw error;
    }
  },
};

export default chartApi;
