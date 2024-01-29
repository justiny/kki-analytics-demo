import fetch from 'node-fetch';
import zlib from 'zlib';
import JSZip from 'jszip';
import { Buffer } from 'buffer';
import { promisify } from 'util';
import { getDefaultDates } from '@utils/DateUtils';
import { timeZoneUtil } from '@utils/timeZoneUtil';
import { EventData } from '../../types/eventData';

const gunzip = promisify(zlib.gunzip);

export async function GET(request: Request) {
  const API_ENDPOINT = 'https://amplitude.com/api/2/export';
  const API_KEY = '1ca386624bb32db4c16b010e49422a2c';
  const SECRET_KEY = '4a3d4d72b960339acbc6510949755d4e';
  const { startDate, endDate } = getDefaultDates(request.url);

  // const startDate2 = '20240126T00';
  // const endDate2 = '20240129T00';

  console.log('✅ startDate', startDate);
  console.log('✅ endDate', endDate);

  try {
    const response = await fetch(
      `${API_ENDPOINT}?start=${startDate}&end=${endDate}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${API_KEY}:${SECRET_KEY}`
          ).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const zip = new JSZip();
    const zipContents = await zip.loadAsync(buffer);

    let allEvents: EventData[] = [];

    for (const fileName in zipContents.files) {
      if (!zipContents.files[fileName].dir) {
        const fileData = await zipContents.files[fileName].async('nodebuffer');
        const decompressed = await gunzip(fileData);
        const events = decompressed
          .toString('utf8')
          .trim()
          .split('\n')
          .map((line) => JSON.parse(line));

        events.forEach((event) => {
          if (
            event.event_type !== 'Page Entry - Client' &&
            event.event_type !== 'Page Exit - Client' &&
            event.event_type !== 'Page InActivity - Client' &&
            event.event_type !== 'Click Event - Client'
          ) {
            return;
          }

          // console.log('event: ', event);

          // Native Event properties
          const userId = event.user_id;
          const eventTime = event.event_time;
          const eventType = event.event_type;
          const sessionId = event.event_properties.sessionId;
          const sessionIdClient = event.session_id;
          const processedTime = event.processed_time;
          const cityLocation = event.city;
          const regionLocation = event.region;

          // User Property Site Name
          const siteName = event.user_properties.site_name;

          // Page View events
          const totalDuration = event.event_properties.totalDuration;
          const pageEngagement = event.event_properties.pageEngagement;
          const pageReferrer = event.event_properties.previousPathname;
          const pageViewId = event.event_properties.pageViewId;
          const pageName = event.event_properties.pageName;
          const pathName = event.event_properties.pathName;
          const pageDestination = event.event_properties.pageDestination;
          const clickType = event.event_properties.clickType;
          const pageDestinationName =
            event.event_properties.pageDestinationName;
          const sectionTitle = event.event_properties.sectionTitle;
          const linkText = event.event_properties.linkText;
          const videoTitle = event.event_properties.videoTitle;

          // Convert time to local time
          const timeZone = timeZoneUtil(eventTime, 'America/Denver');

          let eventData: EventData = {
            userId,
            eventTime: timeZone,
            eventType,
            sessionIdClient,
            siteName,
            processedTime,
            cityLocation,
            regionLocation,
          };

          switch (event.event_type) {
            case 'Page InActivity - Client':
              eventData.pageViewId = pageViewId;
              eventData.pageName = pageName;
              break;

            case 'Page Entry - Client':
              eventData.pageViewId = pageViewId;
              eventData.pageName = pageName;
              eventData.pathName = pathName;
              eventData.pageReferrer = pageReferrer;
              break;

            case 'Page Exit - Client':
              eventData.pageViewId = pageViewId;
              eventData.totalDuration = totalDuration;
              eventData.pageEngagement = pageEngagement;
              break;

            case 'Click Event - Client':
              eventData.pageViewId = pageViewId;
              eventData.pageName = pageName;
              eventData.pathName = pathName;
              eventData.totalDuration = totalDuration;
              eventData.pageEngagement = pageEngagement;
              eventData.pageDestination = pageDestination;
              eventData.pageDestinationName = pageDestinationName;
              eventData.clickType = clickType;
              eventData.sectionTitle = sectionTitle;
              eventData.linkText = linkText;
              eventData.videoTitle = videoTitle;
              break;
          }
          allEvents.push(eventData);
        });
      }
    }
    return Response.json(allEvents);
  } catch (error: any) {
    return Response.json({
      error: error.message,
      reason: 'Check the date range.',
    });
  }
}
