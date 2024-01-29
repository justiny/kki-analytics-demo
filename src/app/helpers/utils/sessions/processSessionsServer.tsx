export const processSessionsServer = (fetchedData: any, siteName: string) => {
  const filteredData = fetchedData.filter(
    (event: any) => event.siteName === siteName
  );

  // Object to hold the processed data, grouped by sessionId
  const processedData = {} as any;

  // Process the filtered data
  filteredData.forEach((event: any) => {
    const { sessionId, pageViewId, eventType, clickType } = event;

    // Initialize the session data structure if it doesn't exist
    if (!processedData[sessionId]) {
      processedData[sessionId] = {
        sessionId: sessionId,
        data: [],
      };
    }

    const session = processedData[sessionId];

    // Initialize or find the pageViewId data within the session
    let pageData = session.data.find(
      (item: { pageViewId: string }) => item.pageViewId === pageViewId
    );
    if (!pageData) {
      pageData = {
        pageViewId,
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
      };
      session.data.push(pageData);
    }

    // Process different event types
    switch (eventType) {
      case 'Page Entry - Server':
        if (!event.pageName) return;
        pageData.pageName = event.pageName;
        pageData.userId = event.userId;
        pageData.eventTime = event.eventTime;
        pageData.pageReferrer = event.pageReferrer;
        break;
      case 'Page Exit - Server':
        pageData.totalDuration += event.totalDuration;
        pageData.pageEngagement += event.pageEngagement;
        break;
      case 'Click Event - Server':
        pageData.clickTotal += 1;
        if (clickType === 'Link Click') pageData.hyperlinkClicks += 1;
        else if (clickType === 'Quick Link Click')
          pageData.navigationClicks += 1;
        else if (clickType === 'Accordion Click') pageData.accordionClicks += 1;
        else if (clickType === 'Video Click') pageData.videoClicks += 1;
        else pageData.otherClicks += 1; // Assuming all other clicks fall into 'other' category
        break;
    }
    // Increment session total for each unique pageViewId
    pageData.sessionTotal = 1;
  });

  // Convert the processed data into an array of session objects
  return Object.values(processedData);
};
