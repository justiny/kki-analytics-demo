import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchServerData(query: string, start: any) {
  try {
    const response = await fetch(`${query}?start=${start}`);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    try {
      const data = await response.json();
      return data;
    } catch (jsonError) {
      // Error handling for JSON parsing
      console.error('JSON parsing error:', jsonError);
      throw new Error('Error parsing JSON response');
    }
  } catch (networkError: any) {
    // Error handling for network issues
    console.error('Network error:', networkError.message);
    throw networkError; // Re-throwing the error to be handled by the caller
  }
}

export function useServerData(
  query: string,
  selectedDate: any,
  processFn: (data: any) => any
) {
  const { data, ...rest } = useQuery({
    queryKey: ['api-server', selectedDate],
    queryFn: () => fetchServerData(query, selectedDate),
  });

  const processedData = useMemo(() => {
    if (data) {
      return processFn(data);
    }
    return [];
  }, [data, processFn]);

  return { data: processedData, ...rest };
}
