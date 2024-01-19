'use client';
import { useState } from 'react';
import { consumerTitle } from '@helpers/utils/Globals';
import { processVideos } from '@utils/videos/processVideos';
import { VideoTable } from '@components/videos/VideoTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import { useClientData } from '@hooks/useClientData';
import DateDropdown from '@components/DateDropdown';

export default function VideosClientPage() {
  const siteName = consumerTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));
  const { isLoading, error, data } = useClientData(
    selectedDate,
    (fetchedData) => processVideos(fetchedData, siteName)
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
          title={`KKI ${consumerTitle}`}
          subTitle='Video Data'
          type='Client'
          description='All video data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-clicks-data.csv'
          classes='border rounded-full px-2 py-2 hover:border-gray-300'
        />
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>
      {isLoading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5' />
      ) : (
        <VideoTable videoData={tableData} />
      )}
    </div>
  );
}