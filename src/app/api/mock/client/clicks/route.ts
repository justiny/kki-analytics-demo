import { clicksClientData } from '@helpers/mock/client/clicks';

export async function GET() {
  return Response.json(clicksClientData);
}
