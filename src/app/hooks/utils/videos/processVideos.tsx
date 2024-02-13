export const processVideos = (fetchedData: any[], siteName: string) => {
  // Group by videoStartTime
  const groupedByStartTime = fetchedData.reduce((acc, currentValue) => {
    (acc[currentValue.videoStartTime] =
      acc[currentValue.videoStartTime] || []).push(currentValue);
    return acc;
  }, {});

  // Get the last VideoWatched event from each group
  const lastEvents = Object.values(groupedByStartTime).map((events: any) => {
    return events.sort(
      (
        a: { processedTime: string | number | Date },
        b: { processedTime: string | number | Date }
      ) =>
        new Date(b.processedTime).getTime() -
        new Date(a.processedTime).getTime()
    )[0];
  });

  // Optional: Filter videos by siteName if needed
  const filteredLastEvents = siteName
    ? lastEvents.filter((item) => item.siteName === siteName)
    : lastEvents;

  // Transform each selected event into the desired format
  return filteredLastEvents.map((eventData) => ({
    videoTitle: eventData.videoTitle || 'Unknown Title',
    pageName: eventData.videoPageName || 'Unknown Page',
    userId: eventData.userId || 'Unknown User',
    dateTime: eventData.videoStartTime
      ? new Date(eventData.videoStartTime).toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })
      : 'Unknown Date',
    timePlayed: eventData.videoPlayTime || 'Unknown Time',
    videoDuration: eventData.videoDuration || 'Unknown Duration',
    percentagePlayed: `${eventData.videoPercentage}%` || 'Unknown Percentage',
  }));
};
