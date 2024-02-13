interface EventData {
  userId: string;
  eventType: string;
  siteName: string;
}

interface ProcessedClickDataItem {
  userId: string;
  clickEvents: number;
  navClicks: number;
  videoClicks: number;
  accordionClicks: number;
  tutorialClicks: number;
}

interface ProcessedClickData {
  [userId: string]: ProcessedClickDataItem;
}

export const processClicksServer = (
  fetchedData: EventData[],
  siteName: string
): ProcessedClickData => {
  return fetchedData.reduce((acc: ProcessedClickData, item: EventData) => {
    if (item.siteName !== siteName) return acc;

    if (!acc[item.userId]) {
      acc[item.userId] = {
        userId: item.userId,
        clickEvents: 0,
        navClicks: 0,
        videoClicks: 0,
        accordionClicks: 0,
        tutorialClicks: 0,
      };
    }

    switch (item.eventType) {
      case 'Link Click - Server':
        acc[item.userId].clickEvents += 1;
        break;
      case 'Nav Link Click - Server':
        acc[item.userId].navClicks += 1;
        break;
      case 'Video Watched - Server':
        acc[item.userId].videoClicks += 1;
        break;
      case 'Accordion Link Click - Server':
        acc[item.userId].accordionClicks += 1;
        break;
      case 'Tutorial Quick Links - Server':
        acc[item.userId].tutorialClicks += 1;
        break;
      default:
        break;
    }

    return acc;
  }, {});
};
