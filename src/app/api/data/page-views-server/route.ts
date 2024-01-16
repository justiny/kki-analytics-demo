import fetch from 'node-fetch';
import JSZip from 'jszip';
import { Buffer } from 'buffer';
import zlib from 'zlib';
import { promisify } from 'util';

interface EventData {
  userId: string | null;
  eventTime: string;
  eventType: string;
  videoTitle?: string;
  videoId?: string;
  videoTime?: string;
  videoPausedTime?: string;
  videoProgress?: string;
  videoComplete?: string;
  videoDuration?: string;
  videoPlayTime?: string;
  videoStartTime?: string;
  videoUrl?: string;
  videoPageName?: string;
  sessionId?: string;
  siteName?: string;
  linkName?: string;
  linkDestination?: string;
  pageUrl?: string;
  pageDuration?: string;
  pageBegin?: string;
  pageEnd?: string;
  referrer?: string;
  pageName?: string;
  engagement?: string;
  quickLinkTitle?: string;
  quickLinkUrl?: string;
  quickLinkPageTitle?: string;
  accordionLinkTitle?: string;
  accordionLinkUrl?: string;
  videoPercentage?: string;
}

const gunzip = promisify(zlib.gunzip);

export async function GET() {
  const API_ENDPOINT = 'https://amplitude.com/api/2/export';
  const API_KEY = '1ca386624bb32db4c16b010e49422a2c';
  const SECRET_KEY = '4a3d4d72b960339acbc6510949755d4e';
  const startDate = '20240113T00';
  const endDate = '20240115T00';

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
          if (event.event_type !== 'Page View - Server') {
            return;
          }

          // Native Event properties
          const userId = event.user_id;
          const eventTime = event.event_time;
          const eventType = event.event_type;
          const sessionId = event.event_properties.sessionId;

          // User Property Site Name
          const siteName = event.user_properties.site_name;

          // Page View event
          const pageUrl = event.event_properties.url;
          const pageDuration = event.event_properties.duration;
          const pageBegin = event.event_properties.begin;
          const pageEnd = event.event_properties.end;
          const pageName =
            event.event_properties.pageName || 'Page Name Unknown';
          const referrer = event.event_properties.previousPath
            ? event.event_properties.previousPath
            : 'Direct Link';
          const engagement =
            event.event_properties.engagement || 'Engagement Unknown';

          let eventData: EventData = {
            userId,
            eventTime,
            eventType,
            sessionId,
          };

          switch (event.event_type) {
            case 'Page View - Server':
              eventData.referrer = referrer;
              eventData.siteName = siteName;
              eventData.pageUrl = pageUrl;
              eventData.pageDuration = pageDuration;
              eventData.pageBegin = pageBegin;
              eventData.pageEnd = pageEnd;
              eventData.pageName = pageName;
              eventData.engagement = engagement;
              break;
          }

          allEvents.push(eventData);
        });
      }
    }

    return Response.json(allEvents);
  } catch (error) {
    console.error('Error:', error);
    Response.json({ error: 'Failed to process data' });
  }
}
