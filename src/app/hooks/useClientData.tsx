import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchClientData(start: any) {
  const response = await fetch(`/api/client?start=${start}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('🐸 data on useClientData', data);

  return data;
}

export function useClientData(
  selectedDate: any,
  processFn: (data: any) => any
) {
  const { data, ...rest } = useQuery({
    queryKey: ['api-client', selectedDate],
    queryFn: () => fetchClientData(selectedDate),
  });

  console.log('🐸 pre-processed data client: ', data);

  const processedData = useMemo(() => {
    if (data) {
      return processFn(data);
    }
    return [];
  }, [data, processFn]);

  console.log('🐸 processed data client: ', processedData);

  return { data: processedData, ...rest };
}
