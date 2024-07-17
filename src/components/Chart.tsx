import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import chartApi from "../api/chartApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Hàm chuyển đổi Unix timestamp thành định dạng thời gian dễ đọc
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Chuyển đổi từ giây sang mili giây
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

// Dữ liệu ban đầu
const rawData = [
  [1720665900, 57829.1042, 1, 18.6213],
  [1720666200, 57846.9141, 1, 18.6369],
  // Các phần tử khác
];

// Chuẩn bị dữ liệu cho biểu đồ
const labels = rawData.map((item) => formatTimestamp(item[0]));
const dataPoints = rawData.map((item) => item[1]);

const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Bitcoin Price (USD)",
      data: dataPoints,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bitcoin Price Over Time",
    },
  },
};

const ChartComponent: React.FC = () => {
  const [chart, setChart] = useState<{
    data: number[] | null;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: false, error: null });
  useEffect(() => {
    const fetchDataChart = async () => {
      try {
        const data = await chartApi.getChart("bitcoin", "24h");
        console.log(data);
        setChart({
          data: data || null,
          isLoading: false,
          error: chart ? null : "No data",
        });
      } catch (error) {
        console.error("Failed to fetch chart:", error);
      }
    };

    fetchDataChart();
  }, []);

  return (
    <div className="w-full">
      <Line data={data} options={options} />
      <p className="text-gray-500 text-sm mt-4">
        Page last updated: 2024-07-10 17:48 (UTC+0)
      </p>
    </div>
  );
};

export default ChartComponent;
