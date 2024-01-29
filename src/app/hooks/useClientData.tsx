import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchClientData(query: string, start: any) {
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

export function useClientData(
  query: string,
  selectedDate: any,
  processFn: (data: any) => any
) {
  const queryFn = async () => {
    const rawData = await fetchClientData(query, selectedDate);
    try {
      // Attempt to process the raw data
      return processFn(rawData);
    } catch (error) {
      console.error('Error processing data:', error);
      throw new Error('Failed to process data');
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['api-client', selectedDate],
    queryFn,
  });

  return { data, error, isLoading };
}
