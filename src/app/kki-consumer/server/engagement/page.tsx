'use client';
import { useState, useEffect } from 'react';
import { consumerTitle } from '@/app/hooks/utils/Globals';
import { processEvents } from '@/app/hooks/utils/engagement/processEvents';
import { UserEngagementNotice } from '@/app/hooks/utils/UserEngagementNotice';
import { EngagementTable } from '@components/engagement/EngagementTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@/app/hooks/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function EngagementPage() {
  const siteName = consumerTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(1));

  const { isLoading, error, data } = useClientData(
    '/api/server',
    selectedDate,
    (fetchedData) => processEvents(fetchedData, 'Server', siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${consumerTitle} | Engagement - Server`;
    document.title = documentTitle;
  }, []);

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (error) return 'An error has occurred: ' + error.message;

  let tableData: any[] = data ? Object.values(data) : [];
  tableData.sort(
    (a: any, b: any) =>
      Number(new Date(a.eventTime)) - Number(new Date(b.eventTime))
  );

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title={`KKI ${consumerTitle}`}
          subTitle='Engagement Data'
          type='Server'
          description='All engagement data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-engagement-server-data.csv'
          classes='rounded-full px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        />
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>
      {isLoading ? (
        <div className='flex justify-center flex-col items-center'>
          <ArrowPathIcon className='animate-spin h-5 w-5' />
          <div className='text-xs mt-4'>Loading table data...</div>
        </div>
      ) : tableData.length > 0 ? (
        <div className='relative'>
          <EngagementTable clickData={tableData} />
          <UserEngagementNotice />
        </div>
      ) : (
        <div className='text-center text-gray-500'>
          No data found for the selected date range.
        </div>
      )}
    </div>
  );
}
