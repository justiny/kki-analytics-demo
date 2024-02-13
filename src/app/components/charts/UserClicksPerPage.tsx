import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController
);

type UserDataItem = {
  userId: string;
  pageName: string;
  clickTotal: number;
};

type UserClicksProps = {
  data: UserDataItem[] | unknown[];
};

const UserClicksPerPage: React.FC<UserClicksProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Extract unique user IDs and page names
        const userIds = Array.from(
          new Set(data.map((item: any) => item.userId))
        );
        const pageNames = Array.from(
          new Set(data.map((item: any) => item.pageName))
        );

        // Create a dataset for each page
        const datasets = pageNames.map((pageName: any) => ({
          label: pageName,
          data: userIds.map(
            (userId: any) =>
              (
                data.find(
                  (item: any) =>
                    item.userId === userId && item.pageName === pageName
                ) as UserDataItem
              )?.clickTotal || 0
          ),
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.5)`, // Assign random colors for each dataset
        }));

        const myChart = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: userIds,
            datasets: datasets,
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'User Clicks per Page',
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true, // Optional: Set to true if you prefer stacked bars per user
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        return () => {
          myChart.destroy();
        };
      }
    }
  }, [data]);

  return <canvas ref={chartRef} width='400' height='400'></canvas>;
};

export default UserClicksPerPage;
