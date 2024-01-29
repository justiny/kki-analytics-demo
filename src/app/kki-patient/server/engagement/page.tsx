'use client';
import { useState, useEffect } from 'react';
import { patientTitle } from '@helpers/utils/Globals';
import { processEngagementServer } from '@utils/engagement/processEngagementServer';
import { EngagementTable } from '@components/engagement/EngagementTable';
import { UserEngagementNotice } from '@helpers/utils/UserEngagementNotice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function EngagementPage() {
  const siteName = patientTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(1));

  const { isLoading, error, data } = useClientData(
    '/api/mock/server/engagement',
    // '/api/server/engagement',
    selectedDate,
    (fetchedData) => processEngagementServer(fetchedData, siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${patientTitle} | Engagement - Server`;
    document.title = documentTitle;
  }, []);

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (error) return 'An error has occurred: ' + error.message;

  const tableData = data ? Object.values(data) : [];

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title={`KKI ${patientTitle}`}
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
      {isLoading || tableData.length === 0 ? (
        <div className='flex justify-center flex-col items-center'>
          <ArrowPathIcon className='animate-spin h-5 w-5' />
          <div className='text-xs mt-4'>Loading table data...</div>
        </div>
      ) : (
        <>
          <EngagementTable clickData={tableData} />
          <UserEngagementNotice />
        </>
      )}
    </div>
  );
}
