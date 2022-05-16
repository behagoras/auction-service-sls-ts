import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { InternalServerError, NotFound } from 'http-errors';
import GetAuctionsSchema from './GetSingleAuctionSchema';

const dynamoDb = new DynamoDB.DocumentClient();

const getSingleAuction: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async (event, context) => {
  console.log('getSingleAuction handler');
  const TableName = process?.env?.AUCTIONS_TABLE_NAME!;
  let auction
  const { id = '' } = event.pathParameters!;
  try {
    const result = await dynamoDb.get({
      TableName,
      Key: { id },
    }).promise()
    auction = result.Item
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }

  if(!auction) {
    throw new NotFound(`Auction with id ${id} not found!`);
  }

  return formatJSONResponse({
    auction,
  }, 200);
};

export const main = middyfy(getSingleAuction);
