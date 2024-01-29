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
          if (event.event_type !== 'Video Watched - Server') {
            return;
          }

          // console.log('event: ', event);

          // Native Event properties
          const userId = event.user_id;
          const eventTime = event.event_time;
          const eventType = event.event_type;
          const sessionId = event.event_properties.sessionId;
          const processedTime = event.processed_time;
          const cityLocation = event.city;
          const regionLocation = event.region;

          // User Property Site Name
          const siteName = event.user_properties.site_name;

          const videoTitle = event.event_properties.videoTitle;
          const videoId = event.event_properties.id;
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
            eventTime: timeZone,
            eventType,
            sessionId,
            siteName,
            processedTime,
            cityLocation,
            regionLocation,
          };

          switch (event.event_type) {
            case 'Video Watched - Server':
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
