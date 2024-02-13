import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the adapter to use Date objects with the TimeScale

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  LineController
);

type EngagementDataItem = {
  eventTime: string; // Assuming this is in a format parseable to a Date, e.g., 'MM/dd/yy, hh:mm a'
  pageEngagement: number;
};

type EngagementJourneyProps = {
  data: EngagementDataItem[];
};

const EngagementJourney: React.FC<EngagementJourneyProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Parse eventTime to Date objects and sort by date
        const sortedData = data
          .map((item) => ({
            eventTime: new Date(item.eventTime),
            pageEngagement: item.pageEngagement,
          }))
          .sort((a, b) => a.eventTime.getTime() - b.eventTime.getTime());

        const myChart = new ChartJS(ctx, {
          type: 'line',
          data: {
            datasets: [
              {
                label: 'Page Engagement Over Time',
                data: sortedData.map((item) => ({
                  x: item.eventTime,
                  y: item.pageEngagement,
                })),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
                tension: 0.1, // Smooths the line
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month', // Adjust based on your data's time span (could be 'hour', 'day', 'month', etc.)
                },
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Engagement',
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'User Engagement Journey Over Time',
              },
            },
            responsive: true,
            maintainAspectRatio: false,
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
      className='max-h-[400px]'
      style={{ height: '400px', width: '100%' }}
    ></canvas>
  );
};

export default EngagementJourney;
