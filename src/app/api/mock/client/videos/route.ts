import videoData from '@helpers/mock/client/videos';

export async function GET() {
  return Response.json(videoData);
}
