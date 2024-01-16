'use client';
import { useQuery } from '@tanstack/react-query';
import { processSessions } from '@utils/sessions/processSessions';
import { SessionTable } from '@components/sessions/SessionTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import moment from 'moment-timezone';

async function fetchPatientData() {
  const response = await fetch('/api/client');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return processSessions(data);
}

export default function PatientSessionsClient() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['api-client'],
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
          type='Client'
          description='All sessions data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={data}
          fileName='session-server-data.csv'
          classes='absolute right-20 top-10 border rounded-full px-2 py-2 hover:border-gray-300'
        />
      </div>

      {Object.entries(data).map(([sessionId, sessionData]: any) => {
        if (!sessionData.data) return null;
        // TODO: MAY REMOVE FOR TZ
        const formattedEventTime = sessionData?.data?.[0]
          ? moment(sessionData.data[0].pageBegin)
              .tz('America/New_York')
              .format('MM/DD/YY, hh:mm A')
          : null;

        return (
          <div key={sessionId} className='relative mb-12'>
            <div className='flex justify-between items-center'>
              <h3 className='text-xs'>
                <span className='font-bold'>Session ID - </span>
                <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                  {sessionId}
                </span>
              </h3>
              <h3 className='flex flex-col text-xs mb-4'>
                <span className='mb-2 text-blue-800'>
                  {sessionData.data[0].userId}
                </span>
                {formattedEventTime}
              </h3>
            </div>
            <SessionTable sessionData={sessionData} />
          </div>
        );
      })}
    </div>
  );
}
