import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import schema from './CreateAuctionSchema';


const dynamoDb = new DynamoDB.DocumentClient();


const createAuction: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  const { title } = event.body;
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  }

  await dynamoDb.put({
    TableName: 'AuctionsTable',
    Item: auction,
  }).promise();

  return formatJSONResponse({
    auction,
    event,
  }, 201);
};

export const main = middyfy(createAuction);
