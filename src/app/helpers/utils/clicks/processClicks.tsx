interface EventData {
  userId: string;
  eventType: string;
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

export const processClicks = (fetchedData: EventData[]): ProcessedClickData => {
  return fetchedData.reduce((acc: ProcessedClickData, item: EventData) => {
    // Initialize user data in accumulator if not already present
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

    // Increment appropriate counts based on eventType
    if (item.eventType === 'Link Click') {
      acc[item.userId].clickEvents += 1;
    } else if (item.eventType === 'Nav Link Click') {
      acc[item.userId].navClicks += 1;
    } else if (item.eventType === 'Video Watched') {
      acc[item.userId].videoClicks += 1;
    } else if (item.eventType === 'Accordion Link Click') {
      acc[item.userId].accordionClicks += 1;
    } else if (item.eventType === 'Tutorial Quick Links') {
      acc[item.userId].tutorialClicks += 1;
    }

    return acc;
  }, {});
};
