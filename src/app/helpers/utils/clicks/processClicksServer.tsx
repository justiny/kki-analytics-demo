export const processClicksServer = (fetchedData: any) => {
  return fetchedData.reduce((acc: any, item: any) => {
    if (!acc[item.userId]) {
      acc[item.userId] = {
        userId: item.userId || 'Unknown User',
        clickEvents: 0,
        navClicks: 0,
        videoClicks: 0,
        accordionClicks: 0,
        tutorialClicks: 0,
      };
    }

    if (item.eventType === 'Link Click - Server') {
      acc[item.userId].clickEvents += 1;
    } else if (item.eventType === 'Nav Link Click - Server') {
      acc[item.userId].navClicks += 1;
    } else if (item.eventType === 'Video Play - Server') {
      acc[item.userId].videoClicks += 1;
    } else if (item.eventType === 'Accordion Link Click - Server') {
      acc[item.userId].accordionClicks += 1;
    } else if (item.eventType === 'Tutorial Quick Links - Server') {
      acc[item.userId].tutorialClicks += 1;
    }

    return acc;
  }, {});
};
