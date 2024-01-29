import React from 'react';
import {
  ClockIcon,
  CursorArrowRaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
interface TableControlsProps {
  table: {
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
    getState: () => { pagination: { pageIndex: number; pageSize: number } };
    getPageCount: () => number;
    setPageSize: (size: number) => void;
  };
}

const TableControls: React.FC<TableControlsProps> = ({ table }) => (
  <div className='mt-10 flex items-center'>
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className='border border-gray-300 p-2 rounded-md mr-2 hover:border-gray-400'
    >
      <ChevronLeftIcon className='h-5 w-5 text-gray-600' />
    </button>
    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className='border border-gray-300 p-2 rounded-md mr-4 hover:border-gray-400'
    >
      <ChevronRightIcon className='h-5 w-5 text-gray-600' />
    </button>
    <span className='text-xs'>
      Page{' '}
      <strong>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </strong>
    </span>
    {table.getPageCount() > 1 && (
      <div className='relative inline-block text-left'>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className='appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 bg-white text-sm leading-5 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ml-4 cursor-pointer'
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-1 flex items-center px-2'>
          <ChevronDownIcon className='h-5 w-5 text-gray-600' />
        </div>
      </div>
    )}
  </div>
);

export default TableControls;
