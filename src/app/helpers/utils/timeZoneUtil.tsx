export const timeZoneUtil = (
  eventTimeProp: string,
  timeZoneProp: string = 'America/Denver'
) => {
  // Ensure the event time string is in a valid format
  const eventTimeStr =
    eventTimeProp.split('.')[0].replace(/-/g, '/').replace('T', ' ') + ' UTC';
  const eventTimeUTC = new Date(eventTimeStr);

  if (isNaN(eventTimeUTC.getTime())) {
    console.error('Invalid eventTimeProp provided:', eventTimeProp);
    return 'Invalid Date';
  }

  const options = {
    timeZone: timeZoneProp,
    hour12: true,
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  } as any;

  return eventTimeUTC.toLocaleString('en-US', options);
};
