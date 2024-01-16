'use client';
import React from 'react';
import { jsonToCSV } from 'react-papaparse';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const ClickTable = ({ clickData }: any) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('userId', { header: () => 'UserId' }),
    columnHelper.accessor('clickEvents', { header: () => 'Click Events' }),
    columnHelper.accessor('navClicks', { header: () => 'Navigation Clicks' }),
    columnHelper.accessor('videoClicks', { header: () => 'Video Clicks' }),
    columnHelper.accessor('accordionClicks', {
      header: () => 'Accordion Clicks',
    }),
    columnHelper.accessor('tutorialClicks', {
      header: () => 'Tutorial Quick Link Clicks',
    }),
  ];

  // Convert the clickData object to an array for the table
  const tableData = React.useMemo(() => {
    return clickData ? Object.values(clickData) : [];
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
      <table style={{ marginBottom: 10 }} className='analytics-table'>
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

      {/* Pagination controls */}
      <div className='table-controls' style={{ marginBottom: 40 }}>
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
