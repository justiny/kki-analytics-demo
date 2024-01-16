import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function formatDate(date: any) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}T00`;
}

function useServerDateRange() {
  const [dateRange, setDateRange] = useState('Yesterday');

  function getDateRange(option: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day
    let startDate = new Date(today);
    let endDate = new Date(today);

    switch (option) {
      case 'Yesterday':
        startDate.setDate(today.getDate() - 1);
        endDate.setDate(today.getDate() - 1);
        break;
      case 'Last Week':
        startDate.setDate(today.getDate() - 7);
        endDate.setDate(today.getDate() - 7);
        break;
      case 'Last Month':
        startDate.setMonth(today.getMonth() - 1);
        endDate.setMonth(today.getMonth() - 1);
        break;
      case 'Last Year':
        startDate.setFullYear(today.getFullYear() - 1);
        endDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate.setDate(today.getDate() - 1);
        endDate.setDate(today.getDate() - 1);
    }

    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  }

  const { startDate, endDate } = getDateRange(dateRange);

  // console.log('startDate', startDate);
  // console.log('endDate', endDate);

  const fetchPatientData = async ({ queryKey }: any) => {
    const [_, startDate, endDate] = queryKey;

    const response = await fetch(
      `/api/server?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['api-server', startDate, endDate],
    queryFn: fetchPatientData,
  });

  return { data, error, isLoading, setDateRange, dateRange };
}

export default useServerDateRange;
