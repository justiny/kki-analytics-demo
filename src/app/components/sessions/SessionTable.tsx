'use client';
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DownloadCsvButton } from '@components/utils/DownloadCsvButton';

export const SessionTable = ({ sessionData }: any) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('pageName', {
      header: () => 'Page Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('eventTime', {
      header: () => 'Event Time',
      cell: (info) => {
        const originalDate = new Date(info.getValue() as string);
        const formattedDate = `${
          originalDate.getMonth() + 1
        }/${originalDate.getDate()}/${originalDate
          .getFullYear()
          .toString()
          .substr(-2)} ${originalDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
        return <div style={{ minWidth: 150 }}>{formattedDate}</div>;
      },
    }),
    columnHelper.accessor('engagement', {
      header: () => 'Engagement',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pageDuration', {
      header: () => 'Total Time',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('referrer', {
      header: () => 'Referral Source',
      cell: (info) => {
        try {
          const url = new URL(info.getValue() as string);
          return url.pathname;
        } catch (error) {
          return info.getValue();
        }
      },
    }),
    columnHelper.accessor('pageCount', {
      header: () => 'Total Page Clicks',
      cell: (info) => info.getValue(),
    }),
  ];

  const tableData = React.useMemo(
    () =>
      sessionData.data.map((item: any) => ({
        ...item,
        pageCount: sessionData.pageCountMap[item.pageName],
      })),
    [sessionData]
  );

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
        fileName='session-data.csv'
        classes='absolute right-[150px] top-0 border rounded-full px-2 py-2 hover:border-gray-300'
      />
      <table className='analytics-table'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='table-controls mt-6 flex items-center'>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        {table.getPageCount() > 1 && (
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};
