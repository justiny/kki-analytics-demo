import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController, // Import BarController
} from 'chart.js';

// Register the required components, including BarController
ChartJS.register(
  BarController, // Register BarController
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DataItem = {
  pageName: string;
  userId: string;
  eventTime: string;
  totalDuration: number;
  pageEngagement: number;
  pageReferrer: string;
  clickTotal: number;
  hyperlinkClicks: number;
  navigationClicks: number;
  accordionClicks: number;
  videoClicks: number;
  otherClicks: number;
};

type AggregateUserEngagementProps = {
  data: DataItem[] | unknown[];
};

const AggregateUserEngagement: React.FC<AggregateUserEngagementProps> = ({
  data,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const pageNames = Array.from(
          new Set(data.map((item: any) => item.pageName))
        );
        const totalDurations = pageNames.map((name) =>
          data
            .filter((item: any) => item.pageName === name)
            .reduce((acc, curr: any) => acc + curr.totalDuration, 0)
        );

        const myChart = new ChartJS(ctx, {
          type: 'bar', // Use 'bar' type
          data: {
            labels: pageNames,
            datasets: [
              {
                label: 'Total Duration',
                data: totalDurations,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
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

  return (
    <canvas
      ref={chartRef}
      width='400'
      height='400'
      className='max-h-[600px] mt-10 max-w-full mx-auto w-full h-full'
    ></canvas>
  );
};

export default AggregateUserEngagement;
