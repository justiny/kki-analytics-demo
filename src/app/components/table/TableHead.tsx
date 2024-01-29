import { flexRender } from '@tanstack/react-table';
import { Key } from 'react';

export const TableHead = ({ table }: any) => {
  return (
    <>
      <thead>
        {table
          .getHeaderGroups()
          .map(
            (headerGroup: { id: Key | null | undefined; headers: any[] }) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope='col'
                    className='pb-4 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6 lg:pl-8 min-w-[160px] first-of-type:pl-0'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            )
          )}
      </thead>
    </>
  );
};
