import { useQuery } from '@tanstack/react-query';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface UseDataPageParams<T> {
  title: string;
  subTitle?: string;
  label?: string;
  description?: string;
  process: (data: any) => T[];
  queryKey: string;
  fetchData: () => Promise<any>;
  TableComponent: React.ComponentType<{ videoData: T[] }>;
}

export function useDataPage<T>({
  title,
  subTitle,
  label,
  description,
  process,
  queryKey,
  fetchData,
  TableComponent,
}: UseDataPageParams<T>) {
  const { isPending, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  const tableData = data ? Object.values(process(data)) : [];

  const content = () => {
    if (isPending) return <ArrowPathIcon className='animate-spin h-5 w-5' />;
    if (error) return 'An error has occurred: ' + error.message;
    return <TableComponent videoData={tableData} />;
  };

  return {
    content,
    header: (
      <div className='sm:flex sm:items-center mb-20'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900 flex items-center'>
            {title}
            {subTitle && (
              <span className='border px-1 py-1 bg-gray-100 rounded text-gray-800 text-sm ml-2'>
                {subTitle}
              </span>
            )}
            {label && (
              <span className='border px-1 py-1 bg-indigo-500 rounded text-gray-100 text-sm ml-2'>
                {label}
              </span>
            )}
          </h1>
          {description && (
            <p className='mt-1 text-xs text-gray-700'>{description}</p>
          )}
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Download CSV
          </button>
        </div>
      </div>
    ),
  };
}
