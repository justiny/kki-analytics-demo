export const processEngagement = (fetchedData: any, siteName: string) => {
  if (!Array.isArray(fetchedData)) {
    console.error('fetchedData is not an array:', fetchedData);
    return [];
  }

  // Filter events for the specific siteName
  const filteredData = fetchedData.filter(
    (event: any) => event.siteName === siteName
  );

  // Create a map to hold the processed data
  const processedDataMap = new Map();

  // Process the filtered data
  filteredData.forEach((event: any) => {
    const { pageViewId, eventType, clickType, pageName } = event;

    // Initialize the data structure if it doesn't exist for the pageViewId
    if (!processedDataMap.has(pageViewId)) {
      processedDataMap.set(pageViewId, {
        pageName: '',
        userId: '',
        eventTime: '',
        totalDuration: 0,
        pageEngagement: 0,
        pageReferrer: '',
        sessionTotal: 0,
        clickTotal: 0,
        hyperlinkClicks: 0,
        navigationClicks: 0,
        accordionClicks: 0,
        videoClicks: 0,
        otherClicks: 0,
      });
    }

    const data = processedDataMap.get(pageViewId);

    switch (eventType) {
      case 'Page Entry - Client':
        data.pageName = event.pageName || 'Unknown Page Name';
        data.userId = event.userId || 'Unknown User';
        data.eventTime = event.eventTime || 'Unknown Time';
        data.pageReferrer = event.pageReferrer || 'Unknown Referrer';
        break;
      case 'Page Exit - Client':
        data.totalDuration += event.totalDuration; // Aggregate duration
        data.pageEngagement += event.pageEngagement; // Aggregate engagement
        break;
      case 'Click Event - Client':
        data.clickTotal += 1;
        if (clickType === 'Hyperlink Link Click') data.hyperlinkClicks += 1;
        else if (clickType === 'Quick Link Click') data.navigationClicks += 1;
        else if (clickType === 'Accordion Click') data.accordionClicks += 1;
        else if (clickType === 'Video Click') data.videoClicks += 1;
        else data.otherClicks += 1;
        break;
    }

    // Assume sessionIdClient is a unique session identifier and count each as one session
    data.sessionTotal = 1;
  });

  // Convert the map into an array of objects
  const processedData = Array.from(processedDataMap.values());

  return processedData;
};
