'use client';
import { useState } from 'react';
import { militaryTitle } from '@helpers/utils/Globals';
import { processSessions } from '@utils/sessions/processSessions';
import { SessionTable } from '@components/sessions/SessionTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';
import moment from 'moment-timezone';

export default function SessionsClientPage() {
  const siteName = militaryTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));
  const { isLoading, error, data } = useClientData(
    selectedDate,
    (fetchedData) => processSessions(fetchedData, siteName)
  );

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (!data) return null;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center mb-20'>
        <TableHeader
          title={`KKI ${militaryTitle}`}
          subTitle='Sessions Data'
          type='Client'
          description='All sessions data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={data}
          fileName='session-server-data.csv'
          classes='border-gray-300 border rounded-full px-2 py-2 hover:border-gray-400'
        />
        <DateDropdown handleDateSelection={handleDateSelection} />
      </div>

      {isLoading ? (
        <ArrowPathIcon className='animate-spin h-5 w-5' />
      ) : (
        Object.entries(data).map(([sessionId, sessionData]: any) => {
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
        })
      )}
    </div>
  );
}
