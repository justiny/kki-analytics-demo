'use client';
import { useQuery } from '@tanstack/react-query';
import { processVideos } from '@utils/videos/processVideos';
import { VideoTable } from '@components/videos/VideoTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';

async function fetchPatientData() {
  const response = await fetch('/api/client');
  // const response = await fetch('/api/mock/client/videos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return processVideos(data);
}

export default function PatientPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['api-client'],
    queryFn: fetchPatientData,
  });

  if (isLoading) return <ArrowPathIcon className='animate-spin h-5 w-5' />;

  if (error) return 'An error has occurred: ' + error.message;

  const tableData = data ? Object.values(data) : [];

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title='KKI Patient'
          subTitle='Video Data'
          type='Client'
          description='All video data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={tableData}
          fileName='patient-clicks-data.csv'
          classes='border rounded-full px-2 py-2 hover:border-gray-300'
        />
      </div>
      <VideoTable videoData={tableData} />
    </div>
  );
}
