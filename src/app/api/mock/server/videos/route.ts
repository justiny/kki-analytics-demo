import { videosData } from '@helpers/mock/server/videos';

export async function GET() {
  return Response.json(videosData);
}
