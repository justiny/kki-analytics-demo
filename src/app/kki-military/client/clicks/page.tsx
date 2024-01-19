'use client';
import { useState } from 'react';
import { militaryTitle } from '@helpers/utils/Globals';
import { processClicks } from '@utils/clicks/processClicks';
import { ClickTable } from '@components/clicks/ClickTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function ClicksClientPage() {
  const siteName = militaryTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(1));

  const { isLoading, error, data } = useClientData(
    selectedDate,
    (fetchedData) => processClicks(fetchedData, siteName)
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
          type='Client'
          description='All clicks data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-clicks-data.csv'
          classes='rounded-full px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        />
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
