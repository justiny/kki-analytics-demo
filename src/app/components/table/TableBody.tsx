import { flexRender } from '@tanstack/react-table';
import { Key } from 'react';
export const TableBody = ({ table }: any) => {
  return (
    <tbody className='divide-y divide-gray-200 bg-white'>
      {table
        .getRowModel()
        .rows.map(
          (row: {
            id: Key | null | undefined;
            getVisibleCells: () => any[];
          }) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6 lg:pl-8 first-of-type:pl-0'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
        )}
    </tbody>
  );
};
