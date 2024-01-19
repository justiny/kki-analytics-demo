import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchServerData(start: any) {
  const response = await fetch(`/api/server?start=${start}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('🐸 data on useServerData', data);

  return data;
}

export function useServerData(
  selectedDate: any,
  processFn: (data: any) => any
) {
  const { data, ...rest } = useQuery({
    queryKey: ['api-server', selectedDate],
    queryFn: () => fetchServerData(selectedDate),
  });

  console.log('🐸 pre-processed data server: ', data);

  const processedData = useMemo(() => {
    if (data) {
      return processFn(data);
    }
    return [];
  }, [data, processFn]);

  console.log('🐸 processed data server: ', processedData);

  return { data: processedData, ...rest };
}
