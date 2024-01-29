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

export const SessionTable = ({ sessionData }: any) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('pageName', { header: () => 'Page Name' }),
    columnHelper.accessor('userId', { header: () => 'User' }),
    columnHelper.accessor('eventTime', { header: () => 'Date/Time' }),
    columnHelper.accessor('pageEngagement', {
      header: () => 'Engagement Time',
      cell: (info) => `${(info.getValue() / 1000).toFixed(2)}`,
    }),
    columnHelper.accessor('totalDuration', {
      header: () => 'Time on Page',
      cell: (info) => `${(info.getValue() / 1000).toFixed(2)}`,
    }),
    columnHelper.accessor('pageReferrer', {
      header: () => 'Referral Source',
    }),
    // columnHelper.accessor('sessionTotal', {
    //   header: () => 'Session',
    // }),
    columnHelper.accessor('clickTotal', {
      header: () => 'Click Events Total',
    }),
    columnHelper.accessor('hyperlinkClicks', {
      header: () => 'Hyperlink Clicks',
    }),
    columnHelper.accessor('navigationClicks', {
      header: () => 'Navigation Clicks',
    }),
    columnHelper.accessor('accordionClicks', {
      header: () => 'Accordion Clicks',
    }),
    columnHelper.accessor('videoClicks', {
      header: () => 'Video Clicks',
    }),
    columnHelper.accessor('otherClicks', {
      header: () => 'Other Clicks',
    }),
  ];

  const tableData = React.useMemo(() => {
    return sessionData.data
      .filter((item: any) => item.pageName) // Filter out items without a pageName, may revisit this
      .map((item: any) => ({
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
      <div className='mt-[20px] flow-root'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle'>
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
