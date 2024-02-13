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

type ClickDataItem = {
  pageName: string;
  hyperlinkClicks: number;
  navigationClicks: number;
  accordionClicks: number;
  videoClicks: number;
  otherClicks: number;
};

type ClickBreakdownProps = {
  data: ClickDataItem[] | unknown[];
};

const ClickTypesBreakdown: React.FC<ClickBreakdownProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const pageNames = Array.from(
          new Set(data.map((item: any) => item.pageName))
        );

        // Create datasets for each click type
        const datasets = [
          {
            type: 'hyperlinkClicks',
            label: 'Hyperlink Clicks',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            type: 'navigationClicks',
            label: 'Navigation Clicks',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            type: 'accordionClicks',
            label: 'Accordion Clicks',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
          },
          {
            type: 'videoClicks',
            label: 'Video Clicks',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            type: 'otherClicks',
            label: 'Other Clicks',
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
          },
        ].map((clickType) => ({
          label: clickType.label,
          data: pageNames.map((name) =>
            data
              .filter((item: any) => item.pageName === name)
              .reduce((acc, curr: any) => acc + curr[clickType.type], 0)
          ),
          backgroundColor: clickType.backgroundColor,
          stack: 'Stack 0',
        }));

        const myChart = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: pageNames,
            datasets: datasets,
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Click Types Breakdown per Page',
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
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

export default ClickTypesBreakdown;
