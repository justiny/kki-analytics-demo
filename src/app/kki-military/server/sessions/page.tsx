'use client';
import { useState } from 'react';
import { militaryTitle } from '@helpers/utils/Globals';
import { processSessionsServer } from '@utils/sessions/processSessionsServer';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useServerData } from '@hooks/useServerData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';
import SessionList from './SessionList';

export default function SessionsServerPage() {
  const siteName = militaryTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));
  const { isLoading, error, data } = useServerData(
    selectedDate,
    (fetchedData) => processSessionsServer(fetchedData, siteName)
  );

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (!data) return null;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title={`KKI ${militaryTitle}`}
          subTitle='Sessions Data'
          type='Server'
          description='All sessions data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={data}
          fileName='session-server-data.csv'
          classes='border-gray-300 border rounded-full px-2 py-2 hover:border-gray-400'
        />
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>
      {isLoading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5' />
      ) : (
        <SessionList data={data} />
      )}
    </div>
  );
}
