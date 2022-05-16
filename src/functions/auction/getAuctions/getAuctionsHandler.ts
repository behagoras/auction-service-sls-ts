import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { getAuctionsService } from '@Services/auction.services';
import GetAuctionsSchema from './GetAuctionsSchema';

const getAuctions: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async () => {
  console.log('getAuctions handler');

  const auctions = await getAuctionsService()

  return formatJSONResponse({
    auctions,
  }, 200);
};

export const main = middyfy(getAuctions);
