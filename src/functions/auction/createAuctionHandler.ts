import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './CreateAuctionSchema';

const createAuction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  const { title } = event.body;
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  }
  return formatJSONResponse({
    auction,
    event,
  }, 201);
};

export const main = middyfy(createAuction);
