'use client';
import { useState, useEffect } from 'react';
import { consumerTitle } from '@helpers/utils/Globals';
import { processSessions } from '@utils/sessions/processSessions';
import { SessionTable } from '@components/sessions/SessionTable';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import { TableHeader } from '@components/table/TableHeader';
import { useClientData } from '@hooks/useClientData';
import calculateStartDate from '@helpers/utils/CalculateStartDate';
import DateDropdown from '@components/DateDropdown';

export default function SessionsClientPage() {
  const siteName = consumerTitle;
  const [selectedDate, setSelectedDate] = useState(calculateStartDate(2));
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage, setSessionsPerPage] = useState(5); // default 5 sessions per page
  const { isLoading, error, data } = useClientData(
    // '/api/mock/client/engagement',
    '/api/client/engagement',
    selectedDate,
    (fetchedData) => processSessions(fetchedData, siteName)
  );

  useEffect(() => {
    const documentTitle = `KKI ${consumerTitle} | Sessions`;
    document.title = documentTitle;
  }, []);

  const handleDateSelection = (days: any) => {
    setSelectedDate(calculateStartDate(days));
  };

  if (!data) return null;

  if (error) return 'An error has occurred: ' + error.message;

  // Calculate paginated data
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = Object.entries(data).slice(
    indexOfFirstSession,
    indexOfLastSession
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='px-4 sm:px-6 lg:px-10'>
      <div className='sm:flex sm:items-center mb-20 justify-between w-full'>
        <TableHeader
          title={`KKI ${consumerTitle}`}
          subTitle='Sessions Data'
          type='Client'
          description='All sessions data for all KKI Patient users.'
        />
        <DownloadCsvButton
          data={data}
          fileName='patient-sessions-client-data.csv'
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
        <>
          {currentSessions.map(([sessionId, sessionData]: any) => (
            <div key={sessionId} className='relative mb-[80px]'>
              <div>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='text-xs'>
                    <span className='font-bold'>Session ID - </span>
                    <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                      {sessionData.sessionId}
                    </span>
                  </h3>
                </div>
                <div className='flex'>
                  <h3 className='text-sm'>
                    <span className='font-bold'>User ID - </span>
                    <span className='mb-2 text-black'>
                      {sessionData.data[0]?.userId || 'No User ID'}
                    </span>
                  </h3>
                </div>
              </div>
              <SessionTable sessionData={sessionData} />
            </div>
          ))}
          <Pagination
            sessionsPerPage={sessionsPerPage}
            totalSessions={Object.entries(data).length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

// Pagination component
const Pagination = ({ sessionsPerPage, totalSessions, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSessions / sessionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex justify-center mb-20'>
        {pageNumbers.map((number) => (
          <li key={number} className='mx-1'>
            <button
              onClick={() => paginate(number)}
              className='border border-gray-300 py-2 px-4 rounded-md mr-4 hover:border-gray-400'
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
