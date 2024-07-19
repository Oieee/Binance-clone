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
import { useQuery } from "@tanstack/react-query";
import coinApi from "../api/coinApi";
import { useParams } from "react-router-dom";
import loadingIcon from "../assets/loading.svg";

const listPeriod = [
  {
    display: "1D",
    value: "24h",
  },
  {
    display: "7D",
    value: "1w",
  },
  {
    display: "1M",
    value: "1m",
  },
  {
    display: "3M",
    value: "3m",
  },
  {
    display: "1Y",
    value: "1y",
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent: React.FC = () => {
  const { coinId } = useParams();
  const [period, setPeriod] = useState<string>("24h");

  const {
    data: coinChartData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chart", coinId, period],
    queryFn: () => coinApi.getCoinChart(coinId ?? "", period),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [period]);

  const dataPoints = coinChartData?.data.map((item: any) => item[1]);

  const transformLabels = () => {
    return coinChartData?.data.map((item: any) =>
      new Date(item[0] * 1000).toLocaleDateString("vi-VN")
    );
  };

  const displayUpdatedTime = () => {
    return coinChartData?.data.map((item: any) =>
      new Date(item[0] * 1000).toLocaleDateString("vi-VN")
    );
  };

  const dataSet: ChartData<"line"> = {
    labels: transformLabels(),
    datasets: [
      {
        label: coinId,
        data: dataPoints,
        backgroundColor: "rgb(255,255,0)",
        borderColor: "rgb(255,255,0)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: "top",
    //   },
    // },
  };

  const handleChangePeriod = (value: string) => {
    setPeriod(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-800px)] flex items-center justify-center">
        <img src={loadingIcon} alt="loading" className="size-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-800px)]">Error: {error.message}</div>
    );
  }

  return (
    <div className="w-full mt-4">
      <ul className="flex space-x-4 text-[#59626E] text-sm">
        {listPeriod.map((item) => (
          <li
            key={item.value}
            className={`hover:text-yellow-400 cursor-pointer ${
              period === item.value && "text-yellow-400"
            }`}
            onClick={() => handleChangePeriod(item.value)}
          >
            {item.display}
          </li>
        ))}
      </ul>

      <Line data={dataSet} options={options} />
      <p className="text-gray-500 text-sm mt-4">
        Page last updated: {displayUpdatedTime().slice(-1)[0]}
      </p>
    </div>
  );
};

export default ChartComponent;
