import axiosInstance from "./axiosInstance";

const coinApi = {
  getCoinDetails: async (coinId: string) => {
    try {
      const response = await axiosInstance.get(`coins/${coinId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching coin details:", error);
      throw error;
    }
  },

  getAllCoins: async (page: number) => {
    try {
      const response = await axiosInstance.get("coins", { params: { page } });
      return response.data;
    } catch (error) {
      console.error("Error fetching all coins:", error);
      throw error;
    }
  },

  getCoinChart: async (coinId: string, period: string) => {
    try {
      const response = await axiosInstance.get(`coins/${coinId}/charts`, {
        params: { period },
      });
      return response;
    } catch (error) {
      console.error("Error fetching coin chart:", error);
      throw error;
    }
  },
};

export default coinApi;
