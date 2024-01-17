'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { processClicks } from '@utils/clicks/processClicks';
import { ClickTable } from '@components/clicks/ClickTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';

function formatDate(date: any) {
  return date.toISOString().split('T')[0].replace(/-/g, '') + 'T00';
}

function calculateStartDate(days: any) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
}

async function fetchPatientData(start: any) {
  console.log('fetchPatientData', start);

  const response = await fetch(`/api/client?start=${start}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return processClicks(data);
}

export default function PatientClicksClient() {
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));

  const { isLoading, error, data } = useQuery({
    queryKey: ['api-client', selectedDate],
    queryFn: () => fetchPatientData(selectedDate),
  });

  if (isLoading) return <ArrowPathIcon className='animate-spin h-5 w-5' />;

  if (error) return 'An error has occurred: ' + error.message;

  const tableData = data ? Object.values(data) : [];

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  console.log('tableData', tableData);

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title='KKI Patient'
          subTitle='Clicks Data'
          type='Client'
          description='All clicks data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-clicks-data.csv'
          classes='border rounded-full px-2 py-2 hover:border-gray-300'
        />
        <div className='ml-10 flex flex-col text-left align-start justify-start border p-5 text-xs space-y-2'>
          <button onClick={() => handleDateSelection(2)}>Yesterday</button>
          <button onClick={() => handleDateSelection(7)}>Last 7 days</button>
          <button onClick={() => handleDateSelection(30)}>Last 30 days</button>
        </div>
      </div>
      <ClickTable clickData={tableData} />
    </div>
  );
}
