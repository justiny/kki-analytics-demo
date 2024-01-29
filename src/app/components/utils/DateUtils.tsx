// dateUtils.js
export function getDefaultDates(requestUrl: string | URL) {
  const currentDateTime = new Date();
  const { searchParams } = new URL(requestUrl);

  // Subtract 3 days for the start date
  const newStartDate = new Date(
    currentDateTime.getTime() - 3 * 24 * 60 * 60 * 1000
  );

  const formattedStartDate =
    newStartDate.toISOString().split('T')[0].replace(/-/g, '') + 'T00';

  // Add 1 day for the end date
  const endDate = new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000);
  const formattedEndDate =
    endDate.toISOString().split('T')[0].replace(/-/g, '') + 'T00';

  // Override with query parameters if provided
  const start = searchParams.get('start') || formattedStartDate;
  const end = searchParams.get('end') || formattedEndDate;

  return { startDate: start, endDate: end };
}
