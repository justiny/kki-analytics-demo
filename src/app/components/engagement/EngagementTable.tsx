'use client';
import React from 'react';
import TableControls from '../table/TableControls';
import { TableHead } from '../table/TableHead';
import { TableBody } from '../table/TableBody';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const EngagementTable = ({ clickData }: any) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('pageName', { header: () => 'Page Name' }),
    columnHelper.accessor('userId', { header: () => 'User' }),
    columnHelper.accessor('eventTime', { header: () => 'Date/Time' }),
    columnHelper.accessor('pageEngagement', {
      header: () => 'Engagement Time*',
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

  // Convert the clickData object to an array for the table
  const tableData = React.useMemo(() => {
    // Filter out entries without a pageName
    return clickData
      ? Object.values(clickData).filter((data: any) => data.pageName)
      : [];
  }, [clickData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pageIndex: 0, pageSize: 10 } as any,
  } as any);

  return (
    <>
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
