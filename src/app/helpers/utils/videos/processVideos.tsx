export const processVideos = (fetchedData: any[]) => {
  const groupedVideos = fetchedData.reduce((acc, item) => {
    (acc[item.videoStartTime] = acc[item.videoStartTime] || []).push(item);
    return acc;
  }, {});

  return Object.entries(groupedVideos)
    .map(([startTime, group]: any) => {
      const lastEvent = group[group.length - 1];

      const isComplete = group.some((event: any) => event.videoComplete);

      let eventData = isComplete
        ? lastEvent
        : group.find((event: any) => event.eventType === 'Video Watched');

      // Fallback in case eventData is undefined
      if (!eventData) {
        console.warn(
          'No valid eventData found for group starting at:',
          startTime
        );
        return null;
      }

      const formatPercentage = (percentageString: any) => {
        const percentageNum = Number(percentageString);
        return isNaN(percentageNum)
          ? 'Unknown'
          : `${percentageNum.toFixed(2)}%`;
      };

      return {
        videoTitle: eventData.videoTitle || 'Unknown Title',
        pageName: eventData.videoPageName || 'Unknown Page',
        userId: eventData.userId || 'Unknown User',
        dateTime: eventData.videoStartTime
          ? new Date(eventData.videoStartTime).toLocaleString()
          : 'Unknown Date',
        timePlayed: eventData.videoPlayTime || 'Unknown Time',
        videoDuration: eventData.videoDuration || 'Unknown Duration',
        percentagePlayed: formatPercentage(eventData.videoPercentage),
      };
    })
    .filter((item) => item !== null);
};
