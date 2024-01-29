import { engagement } from '@/app/helpers/mock/client/engagement';

export async function GET() {
  return Response.json(engagement);
}
