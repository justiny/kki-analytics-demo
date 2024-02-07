'use client';
import { useState, useEffect } from 'react';
import { militaryTitle } from '@helpers/utils/Globals';
import { processEvents } from '@utils/engagement/processEvents';
import { EngagementTable } from '@components/engagement/EngagementTable';
import { UserEngagementNotice } from '@helpers/utils/UserEngagementNotice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function EngagementPage() {
  const siteName = militaryTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(1));

  const { isLoading, error, data } = useClientData(
    '/api/client',
    selectedDate,
    (fetchedData) => processEvents(fetchedData, 'Client', siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${militaryTitle} | Engagement`;
    document.title = documentTitle;
  }, []);

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (error) return 'An error has occurred: ' + error.message;

  const tableData = data ? Object.values(data) : [];

  return (
    <div className='px-4 sm:px-6 lg:px-10'>
      <div className='sm:flex sm:items-center mb-20 justify-between w-full'>
        <TableHeader
          title={`KKI ${militaryTitle}`}
          subTitle='Engagement Data'
          type='Client'
          description='All engagement data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-engagement-client-data.csv'
          classes='border-gray-300 border rounded-full px-2 py-2 hover:border-gray-400'
        />
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>
      {isLoading || tableData.length === 0 ? (
        <div className='flex justify-center flex-col items-center'>
          <ArrowPathIcon className='animate-spin h-5 w-5' />
          <div className='text-xs mt-4'>Loading table data...</div>
        </div>
      ) : (
        <div className='relative'>
          <EngagementTable clickData={tableData} />
          <UserEngagementNotice />
        </div>
      )}
    </div>
  );
}
