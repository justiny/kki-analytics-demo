'use client';
import { useState, useEffect } from 'react';
import { patientTitle } from '@/app/hooks/utils/Globals';
import { processVideos } from '@/app/hooks/utils/videos/processVideos';
import { VideoTable } from '@components/videos/VideoTable';
import { TimePlayedNotice } from '@/app/hooks/utils/TimePlayedNotice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import calculateStartDate from '@/app/hooks/utils/CalculateStartDate';
import { useClientData } from '@hooks/useClientData';
import DateDropdown from '@components/DateDropdown';

export default function VideosClientPage() {
  const siteName = patientTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));
  const { isLoading, error, data } = useClientData(
    '/api/videos/client',
    selectedDate,
    (fetchedData) => processVideos(fetchedData, siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${patientTitle} | Videos`;
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
          title={`KKI ${patientTitle}`}
          subTitle='Video Data'
          type='Client'
          description='All video data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-client-video-data.csv'
          classes='border rounded-full px-2 py-2 hover:border-gray-300'
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
          <VideoTable videoData={tableData} />
          <TimePlayedNotice />
        </div>
      ) : (
        <div className='text-center text-gray-500'>
          No data found for the selected date range.
        </div>
      )}
    </div>
  );
}
