import { engagement } from '@/app/helpers/mock/server/engagement';

export async function GET() {
  return Response.json(engagement);
}
