'use client';
import React from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableControls from '../table/TableControls';
import { TableHead } from '../table/TableHead';
import { TableBody } from '../table/TableBody';

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
      header: () => 'Time Played*',
      cell: (info: any) => info.getValue()?.toFixed(3),
    },
    {
      accessorKey: 'videoDuration',
      header: () => 'Video Duration',
      cell: (info: any) => info.getValue()?.toFixed(3),
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
