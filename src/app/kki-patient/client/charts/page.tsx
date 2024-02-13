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
import AggregateUserEngagement from '@components/charts/AggregateUserEngagement';
import ClickTypesBreakdown from '@components/charts/ClickTypesBreakdown';
import UserClicksPerPage from '@components/charts/UserClicksPerPage';
import EngagementJourney from '@/app/components/charts/EngagementJourney';

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

  const tableData = data ? Object.values(data) : [];

  return (
    <div className='px-4 sm:px-6 lg:px-10'>
      {isLoading ? (
        <div className='flex justify-center flex-col items-center'>
          <ArrowPathIcon className='animate-spin h-5 w-5' />
          <div className='text-xs mt-4'>Loading table data...</div>
        </div>
      ) : tableData.length > 0 ? (
        <div className='relative'>
          <TableHeader
            title={`KKI ${patientTitle}`}
            subTitle='Engagement Charts'
            type='Client'
            description='A collection engagement data charts for all KKI Patient users.'
          />
          <AggregateUserEngagement data={tableData} />
          <hr className='my-10' />
          <ClickTypesBreakdown data={tableData} />
          <hr className='my-10' />
          <UserClicksPerPage data={tableData} />
        </div>
      ) : (
        <div className='text-center text-gray-500'>
          No data found for the selected date range.
        </div>
      )}
    </div>
  );
}
