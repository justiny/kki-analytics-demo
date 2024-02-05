'use client';
import React from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';
import TableControls from '../table/TableControls';
import { TableHead } from '../table/TableHead';
import { TableBody } from '../table/TableBody';
import { Tooltip } from '@components/utils/Tooltip';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export const SessionTable = ({ sessionData }: any) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('pageName', { header: () => 'Page Name' }),
    columnHelper.accessor('userId', { header: () => 'User' }),
    columnHelper.accessor('eventTime', { header: () => 'Date/Time' }),
    columnHelper.accessor('pageEngagement', {
      header: () => 'Engagement Time*',
    }),
    columnHelper.accessor('totalDuration', {
      header: () => 'Time on Page',
    }),
    columnHelper.accessor('pageReferrer', {
      header: () => 'Referral Source',
    }),
    columnHelper.accessor('clickTotal', {
      id: 'clickTotal',
      header: () => (
        <Tooltip title='Total Click Events on Page Visit'>
          Click Events Total{' '}
          <QuestionMarkCircleIcon className='h-4 w-4 inline-block absolute right-[-5px] top-[-5px] opacity-40' />
        </Tooltip>
      ),
    }),
    columnHelper.accessor('hyperlinkClicks', {
      id: 'hyperlinkClicks',
      header: () => (
        <Tooltip title='Clicks within Rich Text Editor'>
          Hyperlink Clicks{' '}
          <QuestionMarkCircleIcon className='h-4 w-4 inline-block absolute right-1 top-[-5px] opacity-40' />
        </Tooltip>
      ),
    }),
    columnHelper.accessor('navigationClicks', {
      id: 'navigationClicks',
      header: () => (
        <Tooltip title='Clicks on Quick Link Navigation'>
          Navigation Clicks
          <QuestionMarkCircleIcon className='h-4 w-4 inline-block absolute right-[-2px] top-[-5px] opacity-40' />
        </Tooltip>
      ),
    }),
    columnHelper.accessor('accordionClicks', {
      id: 'accordionClicks',
      header: () => (
        <Tooltip title='Clicks on Accordion titles'>
          Accordion Clicks
          <QuestionMarkCircleIcon className='h-4 w-4 inline-block absolute right-[-1px] top-[-5px] opacity-40' />
        </Tooltip>
      ),
    }),
    columnHelper.accessor('videoClicks', {
      id: 'videoClicks',
      header: () => (
        <Tooltip title='Clicks on Videos'>
          Video Clicks
          <QuestionMarkCircleIcon className='h-4 w-4 inline-block absolute right-[25px] top-[-5px] opacity-40' />
        </Tooltip>
      ),
    }),
    columnHelper.accessor('otherClicks', {
      id: 'otherClicks',
      header: () => (
        <Tooltip title='All other clicks'>
          Other Clicks
          <QuestionMarkCircleIcon className='h-4 w-4 inline-block absolute right-[25px] top-[-5px] opacity-40' />
        </Tooltip>
      ),
    }),
  ];

  const tableData = React.useMemo(() => {
    return sessionData.data.map((item: any) => ({
      ...item,
    }));
  }, [sessionData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pageIndex: 0, pageSize: 10 } as any,
  } as any);

  return (
    <>
      <DownloadCsvButton
        data={tableData}
        fileName='patient-session-data.csv'
        classes='rounded-full px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 absolute right-0 top-0'
      />
      <div className='flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle pt-[50px]'>
            <table className='min-w-full divide-y divide-gray-300'>
              <TableHead table={table} />
              <TableBody table={table} />
            </table>
          </div>
        </div>
      </div>

      <TableControls table={table} />
    </>
  );
};
