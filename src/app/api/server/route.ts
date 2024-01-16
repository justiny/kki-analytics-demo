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
  // adjust dates for specific range of data
  // const startYear = '2023';
  // const startMonth = '01';
  // const startDay = '14';
  // const startDate = `${startYear}${startMonth}${startDay}T00`;
  // const startDate = '20231225T00';

  // const endYear = '2024';
  // const endMonth = '01';
  // const endDay = '15';
  // const endDate = `${endYear}${endMonth}${endDay}T00`;
  // const endDate = '20240114T00';

  // Currently set to pull data from the last 5 days
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const endDate = `${today}T00`;

  const now = new Date();
  now.setDate(now.getDate() - 5);
  const yesterday = now.toISOString().split('T')[0].replace(/-/g, '');
  const startDate = `${yesterday}T00`;

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
            event.event_type === '[Amplitude] Page Viewed' ||
            event.event_type === '[Amplitude] Form Started' ||
            event.event_type === 'session_start' ||
            event.event_type === 'session_end' ||
            event.event_type === 'Video Watched' ||
            // Legacy Video events that are no longer used
            event.event_type === 'Video Play' ||
            event.event_type === 'Video Pause' ||
            event.event_type === 'Video Complete' ||
            event.event_type === 'Video Progress' ||
            event.event_type === 'Link Click' ||
            event.event_type === 'Nav Link Click' ||
            event.event_type === 'Accordion Link Click' ||
            event.event_type === 'Tutorial Quick Links' ||
            event.event_type === 'Page View' ||
            event.event_type === 'Session End' ||
            event.event_type === 'Session Start' ||
            event.event_type === 'User Identified'
          ) {
            return;
          }

          // Native Event properties
          const userId = event.user_id;
          const eventTime = event.event_time;
          const eventType = event.event_type;
          const sessionId = event.event_properties.sessionId;

          // User Property Site Name
          const siteName = event.user_properties.site_name;

          // JWPlayer events
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

          // Link Click events (Both Link Click and Nav Link Clicked)
          const linkName = event.event_properties.name;
          const linkDestination = event.event_properties.destination;

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

          // Quick Link event
          const quickLinkTitle = event.event_properties['Quick Link Title'];
          const quickLinkUrl = event.event_properties.pageUrl;
          const quickLinkPageTitle = event.event_properties.pageTitle;

          // Accordion Link event
          const accordionLinkTitle =
            event.event_properties['Accordion Link Title'];
          const accordionLinkUrl = event.event_properties.pageUrl;

          let eventData: EventData = {
            userId,
            eventTime,
            eventType,
            sessionId,
          };

          switch (event.event_type) {
            case 'Session Start - Server':
              eventData.userId = userId;
              eventData.eventTime = eventTime;
              eventData.eventType = eventType;
              break;

            case 'Video Watched - Server':
              eventData.siteName = siteName;
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

            case 'Page View - Server':
              eventData.referrer = referrer;
              eventData.siteName = siteName;
              eventData.pageUrl = pageUrl;
              eventData.pageDuration = pageDuration;
              eventData.pageBegin = pageBegin;
              eventData.pageEnd = pageEnd;
              eventData.pageName = pageName;
              eventData.engagement = engagement;
              eventData.sessionId = sessionId;
              break;

            case 'Link Click - Server':
              eventData.siteName = siteName;
              eventData.linkName = linkName;
              eventData.linkDestination = linkDestination;
              eventData.sessionId = sessionId;
              break;

            case 'Nav Link Click - Server':
              eventData.siteName = siteName;
              eventData.linkName = linkName;
              eventData.linkDestination = linkDestination;
              eventData.sessionId = sessionId;
              break;

            case 'Accordion Link Click - Server':
              eventData.siteName = siteName;
              eventData.accordionLinkTitle = accordionLinkTitle;
              eventData.accordionLinkUrl = accordionLinkUrl;
              eventData.sessionId = sessionId;
              break;

            case 'Tutorial Quick Links - Server':
              eventData.siteName = siteName;
              eventData.quickLinkTitle = quickLinkTitle;
              eventData.quickLinkUrl = quickLinkUrl;
              eventData.quickLinkPageTitle = quickLinkPageTitle;
              eventData.sessionId = sessionId;
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
