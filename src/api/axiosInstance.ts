import axios from "axios";

const axiosIntance = axios.create({
  baseURL: "https://openapiv1.coinstats.app/",
  timeout: 5000,
  headers: {
    accept: "application/json",
    "X-API-KEY": "SUmzmTnsqgFSHvjQ2SbcPp6yYs+7PJx0Ma5dOA93chg=",
  },
});

export default axiosIntance;
