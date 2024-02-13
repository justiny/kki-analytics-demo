import fetch from 'node-fetch';
import zlib from 'zlib';
import JSZip from 'jszip';
import { Buffer } from 'buffer';
import { promisify } from 'util';
import { getDefaultDates } from '@/app/hooks/utils/DateUtils';
import { timeZoneUtil } from '@/app/hooks/utils/timeZoneUtil';
import { EventData } from '../../types/eventData';

const gunzip = promisify(zlib.gunzip);

export async function GET(request: Request) {
  const API_ENDPOINT = 'https://amplitude.com/api/2/export';
  const API_KEY = '1ca386624bb32db4c16b010e49422a2c';
  const SECRET_KEY = '4a3d4d72b960339acbc6510949755d4e';
  const { startDate, endDate } = getDefaultDates(request.url);

  // const startDate2 = '20240213T08';
  // const endDate2 = '20240214T20';

  // console.log('✅ startDate', startDate);
  // console.log('✅ endDate', endDate);

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
            event.event_type !== 'Page Exit - Unload' &&
            event.event_type !== 'Page InActivity - Client' &&
            event.event_type !== 'Click Event - Client'
          ) {
            return;
          }

          // Native Event properties
          const userId = event.user_id;
          const eventTime = event.event_time;
          const eventType = event.event_type;
          const sessionIdClient = event.session_id;
          const sessionIdServer = event.event_properties.sessionId;
          const processedTime = event.processed_time;
          const cityLocation = event.city;
          const regionLocation = event.region;

          // User Property Site Name
          const siteName = event.user_properties.site_name;
          const anonId = event.user_properties.anon_id;

          // Page View events
          const totalDuration = event.event_properties.totalDuration;
          const pageEngagement = event.event_properties.pageEngagement;
          const engagementTime = event.event_properties.engagementTime;
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

          // Video Events
          const videoId = event.event_properties.id;
          const videoTitle = event.event_properties.videoTitle;
          const videoTime = event.event_properties.time;
          const videoDuration = event.event_properties.videoDuration;
          const videoPlayTime = event.event_properties.videoPlayTime;
          const videoUrl = event.event_properties.url;
          const videoPageName = event.event_properties.videoPageName;
          const videoComplete = event.event_properties.videoComplete;
          const videoPercentage = event.event_properties.videoPercentage;
          const videoStartTime = event.event_properties.videoStartTime;

          // Convert time to local time
          const timeZone = timeZoneUtil(eventTime, 'America/Denver');

          let eventData: EventData = {
            userId,
            anonId,
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
              eventData.totalDuration = totalDuration / 1000;
              eventData.pageEngagement = pageEngagement / 1000;
              break;

            case 'Page Exit - Unload':
              eventData.pageViewId = pageViewId;
              eventData.totalDuration = totalDuration / 1000;
              eventData.pageEngagement = engagementTime / 1000;
              eventData.sessionIdServer = sessionIdServer;
              break;

            case 'Click Event - Client':
              eventData.pageViewId = pageViewId;
              eventData.pageName = pageName;
              eventData.pathName = pathName;
              eventData.pageDestination = pageDestination;
              eventData.pageDestinationName = pageDestinationName;
              eventData.clickType = clickType;
              eventData.sectionTitle = sectionTitle;
              eventData.linkText = linkText;
              eventData.videoTitle = videoTitle;
              break;

            case 'Video Watched':
              eventData.videoTitle = videoTitle;
              eventData.videoId = videoId;
              eventData.videoTime = videoTime;
              eventData.videoUrl = videoUrl;
              eventData.videoPageName = videoPageName;
              eventData.videoPlayTime = videoPlayTime;
              eventData.videoDuration = videoDuration;
              eventData.videoComplete = videoComplete;
              eventData.videoPercentage = videoPercentage;
              eventData.videoStartTime = videoStartTime;
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
