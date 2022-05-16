import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import schema from './CreateAuctionSchema';
import { InternalServerError } from 'http-errors';
import { Auction, AuctionStatus } from '@Types/auction.types';



const dynamoDb = new DynamoDB.DocumentClient();


const createAuction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('createAuction handler');
  const { title } = event.body;
  const now = new Date();

  const auction: Auction = {
    id: uuid(),
    title,
    status: AuctionStatus.OPEN,
    createdAt: now.toISOString(),
    highestBid: {
      amount: 0,
    }
  }

  try {
    await dynamoDb.put({
      TableName: process?.env?.AUCTIONS_TABLE_NAME!,
      Item: auction,
    }).promise();
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }

  return formatJSONResponse({
    auction,
  }, 201);
};

export const main = middyfy(createAuction);
