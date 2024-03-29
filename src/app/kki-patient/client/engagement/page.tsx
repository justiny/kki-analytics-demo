'use client';
import { useState, useEffect } from 'react';
import { patientTitle } from '@/app/hooks/utils/Globals';
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
  const siteName = patientTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(1));

  const { isLoading, error, data } = useClientData(
    '/api/client',
    selectedDate,
    (fetchedData) => processEvents(fetchedData, 'Client', siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${patientTitle} | Engagement`;
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
    <div className='px-4 sm:px-6 lg:px-10'>
      <div className='sm:flex sm:items-center mb-20 justify-between w-full'>
        <TableHeader
          title={`KKI ${patientTitle}`}
          subTitle='Engagement Data'
          type='Client'
          description='All engagement data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-engagement-client-data.csv'
          classes='border-gray-300 border rounded-full px-2 py-2 hover:border-gray-400 mt-10 sm:mt-0'
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
