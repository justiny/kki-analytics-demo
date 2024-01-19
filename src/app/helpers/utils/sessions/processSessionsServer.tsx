export const processSessionsServer = (fetchedData: any, siteName: string) => {
  return fetchedData
    .filter(
      (item: any) =>
        item.eventType === 'Page View - Server' && item.siteName === siteName
    )
    .reduce((acc: any, item: any) => {
      if (!acc[item.sessionId]) {
        acc[item.sessionId] = {
          data: [],
          pageCountMap: {},
        };
      }
      const session = acc[item.sessionId];
      session.data.push(item);
      session.pageCountMap[item.pageName] =
        (session.pageCountMap[item.pageName] || 0) + 1;
      return acc;
    }, {});
};
