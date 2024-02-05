'use client';
import { useState, useEffect } from 'react';
import { patientTitle } from '@helpers/utils/Globals';
import { processSessionsServer } from '@utils/sessions/processSessionsServer';
import { SessionTable } from '@components/sessions/SessionTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function SessionsServerPage() {
  const siteName = patientTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));
  const { isLoading, error, data } = useClientData(
    // '/api/mock/server/engagement',
    '/api/server/engagement',
    selectedDate,
    (fetchedData) => processSessionsServer(fetchedData, siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${patientTitle} | Sessions - Server`;
    document.title = documentTitle;
  }, []);

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (!data) return null;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title={`KKI ${patientTitle}`}
          subTitle='Sessions Data'
          type='Server'
          description='All sessions data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={data}
          fileName='patient-sessions-server-data.csv'
          classes='border-gray-300 border rounded-full px-2 py-2 hover:border-gray-400'
        />
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>

      {isLoading || data.length === 0 ? (
        <div className='flex justify-center flex-col items-center'>
          <ArrowPathIcon className='animate-spin h-5 w-5' />
          <div className='text-xs mt-4'>Loading table data...</div>
        </div>
      ) : (
        Object.entries(data).map(([sessionId, sessionData]: any) => {
          if (!sessionData.data) return null;

          return (
            <div key={sessionId} className='relative mb-[80px]'>
              <div>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='text-xs'>
                    <span className='font-bold'>User ID - </span>
                    <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                      {(sessionData.data[1] && sessionData.data[1].userId) ||
                        sessionData.data[0].userId ||
                        'No User ID'}
                    </span>
                  </h3>
                </div>
                <div className='flex'>
                  <h3 className='text-sm'>
                    <span className='font-bold'>Session ID - </span>
                    <span className='mb-2 text-black'>
                      {sessionData.sessionId}
                    </span>
                  </h3>
                </div>
              </div>
              <SessionTable sessionData={sessionData} />
            </div>
          );
        })
      )}
    </div>
  );
}
