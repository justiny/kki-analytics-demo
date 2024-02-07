interface Event {
  userId: string;
  eventTime: string;
  eventType: string;
  pageViewId: string;
  pageName?: string;
  pageReferrer?: string;
  totalDuration?: number;
  pageEngagement?: number;
  clickType?: string;
  siteName?: string;
}

interface ProcessedEvent {
  pageName: string;
  userId: string;
  eventTime: string;
  totalDuration: number;
  pageEngagement: number;
  pageReferrer: string;
  clickTotal: number;
  hyperlinkClicks: number;
  navigationClicks: number;
  accordionClicks: number;
  videoClicks: number;
  otherClicks: number;
}

export const processEngagement = (
  fetchedData: Event[],
  type: string,
  siteName: string
): ProcessedEvent[] => {
  const filteredData = fetchedData.filter(
    (event) => event.siteName === siteName
  );

  // Group events by pageViewId
  const eventsByPageViewId = filteredData.reduce((acc: any, event) => {
    if (!acc[event.pageViewId]) {
      acc[event.pageViewId] = [];
    }
    acc[event.pageViewId].push(event);
    return acc;
  }, {});

  // Process each group of events
  const processedData = Object.values(eventsByPageViewId).flatMap(
    (events: any) => {
      let hasPageEntry = false;
      let hasPageExit = false;
      let processedEvent: ProcessedEvent = {
        pageName: '',
        userId: '',
        eventTime: '',
        totalDuration: 0,
        pageEngagement: 0,
        pageReferrer: '',
        clickTotal: 0,
        hyperlinkClicks: 0,
        navigationClicks: 0,
        accordionClicks: 0,
        videoClicks: 0,
        otherClicks: 0,
      };

      events.forEach((event: any) => {
        if (event.eventType === 'Page Entry - Client') {
          processedEvent.pageName = event.pageName || '';
          processedEvent.userId = event.userId;
          processedEvent.eventTime = event.eventTime;
          processedEvent.pageReferrer = event.pageReferrer || '';
          hasPageEntry = true;
        } else if (
          event.eventType === 'Page Exit - Client' ||
          event.eventType === 'Page Exit - Unload'
        ) {
          processedEvent.totalDuration += event.totalDuration || 0;
          processedEvent.pageEngagement += event.pageEngagement || 0;
          hasPageExit = true;
        } else if (event.eventType.startsWith('Click Event - Client')) {
          processedEvent.clickTotal += 1;
          switch (event.clickType) {
            case 'Hyperlink Link Click':
              processedEvent.hyperlinkClicks += 1;
              break;
            case 'Quick Link Click':
              processedEvent.navigationClicks += 1;
              break;
            case 'Accordion Click':
              processedEvent.accordionClicks += 1;
              break;
            case 'Video Click':
              processedEvent.videoClicks += 1;
              break;
            default:
              processedEvent.otherClicks += 1;
              break;
          }
        }
      });

      // Only include the processed event if both a Page Entry and Page Exit event were found
      if (hasPageEntry && hasPageExit) {
        return [processedEvent];
      } else {
        return [];
      }
    }
  );

  return processedData;
};
