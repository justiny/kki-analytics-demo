'use client';
import { useState } from 'react';
import { militaryTitle } from '@helpers/utils/Globals';
import { processClicksServer } from '@utils/clicks/processClicksServer';
import { ClickTable } from '@components/clicks/ClickTable';
import { useServerData } from '@hooks/useServerData';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function ClicksServerPage() {
  const siteName = militaryTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(1));

  const { isLoading, error, data } = useServerData(
    selectedDate,
    (fetchedData) => processClicksServer(fetchedData, siteName)
  );

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (error) return 'An error has occurred: ' + error.message;

  const tableData = data ? Object.values(data) : [];

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title={`KKI ${militaryTitle}`}
          subTitle='Clicks Data'
          type='Server'
          description='All clicks data for all KKI Patient users.'
        />
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <DownloadCsvButton
            data={tableData}
            fileName='clicks-server-data.csv'
            classes='border-gray-300 border rounded-full px-2 py-2 hover:border-gray-400'
          />
        </div>
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>
      {isLoading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5' />
      ) : (
        <ClickTable clickData={tableData} />
      )}
    </div>
  );
}
