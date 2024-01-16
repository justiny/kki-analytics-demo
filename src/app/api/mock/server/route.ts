import { serverData } from '@helpers/mock/server/sessions';

export async function GET() {
  return Response.json(serverData);
}
