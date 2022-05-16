import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { getSpecificAuctionService, placeBidService } from '@Services/auction.services';
import { Forbidden } from 'http-errors';
import GetAuctionsSchema from './placeBidSchema';

const placeBid: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async (event) => {
  console.log('placeBid handler');

  const { id = '' } = event.pathParameters!;
  const { amount } = event.body;

  const retrievedAuction = await getSpecificAuctionService(id)

  const prevAmount = retrievedAuction.highestBid.amount;

  if (prevAmount >= (amount)) {
    throw new Forbidden(`Your bid must be higher than ${prevAmount}!`);
  }

  const updatedAuction = await placeBidService(id, { amount });

  return formatJSONResponse({
    updatedAuction,
    prevAmount,
    amount,
  }, 200);

};

export const main = middyfy(placeBid);
