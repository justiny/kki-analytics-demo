'use client';
import { useQuery } from '@tanstack/react-query';
import { processClicksServer } from '@utils/clicks/processClicksServer';
import { ClickTable } from '@components/clicks/ClickTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';

async function fetchPatientData() {
  const response = await fetch('/api/server');
  // const response = await fetch('/api/mock/server');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return processClicksServer(data);
}

export default function PatientClicksServer() {
  const { isPending, error, data } = useQuery({
    queryKey: ['api-client'],
    queryFn: fetchPatientData,
  });

  if (isPending) return <ArrowPathIcon className='animate-spin h-5 w-5' />;

  if (error) return 'An error has occurred: ' + error.message;

  const tableData = Object.values(data);

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title='KKI Patient'
          subTitle='Clicks Data'
          type='Server'
          description='All clicks data for all KKI Patient users.'
        />
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <DownloadCsvButton
            data={tableData}
            fileName='clicks-server-data.csv'
            classes='absolute right-20 top-10 border rounded-full px-2 py-2 hover:border-gray-300'
          />
        </div>
      </div>
      <ClickTable clickData={tableData} />
    </div>
  );
}
