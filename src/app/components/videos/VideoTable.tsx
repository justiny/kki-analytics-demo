'use client';
import React from 'react';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export const VideoTable = ({ videoData }: { videoData: any }) => {
  const columns: any[] = [
    {
      accessorKey: 'videoTitle',
      header: () => 'Video Title',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'pageName',
      header: () => 'Page Name',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'userId',
      header: () => 'UserId',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'dateTime',
      header: () => 'Date/Time',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'timePlayed',
      header: () => 'Time Played',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'videoDuration',
      header: () => 'Video Duration',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: 'percentagePlayed',
      header: () => 'Percentage Played',
      cell: (info: any) => info.getValue(),
    },
  ];

  // Convert the videoData object to an array for the table
  const tableData = React.useMemo(() => Object.values(videoData), [videoData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pageIndex: 0, pageSize: 10 } as any,
  });

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
