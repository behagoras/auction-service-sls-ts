import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { getSpecificAuctionService } from '@Services/auction.services';
import { NotFound } from 'http-errors';
import GetAuctionsSchema from './GetSingleAuctionSchema';

const getSingleAuction: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async (event) => {
  console.log('getSingleAuction handler');

  const { id = '' } = event.pathParameters!;
  const auction = await getSpecificAuctionService(id)

  if(!auction) {
    throw new NotFound(`Auction with id ${id} not found!`);
  }

  return formatJSONResponse({
    auction,
  }, 200);
};

export const main = middyfy(getSingleAuction);
