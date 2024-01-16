'use client';
import { useQuery } from '@tanstack/react-query';
import { processSessionsServer } from '@utils/sessions/processSessionsServer';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import SessionList from './SessionList';

async function fetchPatientData() {
  const response = await fetch('/api/server');
  // const response = await fetch('/api/mock/server');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return processSessionsServer(data);
}

export default function PatientSessionsServer() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['api-server'],
    queryFn: fetchPatientData,
  });

  if (isLoading) return <ArrowPathIcon className='animate-spin h-5 w-5' />;

  if (!data) return null;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title='KKI Patient'
          subTitle='Sessions Data'
          type='Server'
          description='All sessions data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={data}
          fileName='session-server-data.csv'
          classes='absolute right-20 top-10 border rounded-full px-2 py-2 hover:border-gray-300'
        />
      </div>
      <SessionList data={data} />
    </div>
  );
}
