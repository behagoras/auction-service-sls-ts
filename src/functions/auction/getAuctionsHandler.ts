import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { InternalServerError } from 'http-errors';
import GetAuctionsSchema from './GetAuctionsSchema';

const dynamoDb = new DynamoDB.DocumentClient();

const getAuctions: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async (event, context) => {
  console.log('getAuctions handler');
  const TableName= process?.env?.AUCTIONS_TABLE_NAME || 'AuctionsTable';
  console.log({ TableName });
  let auctions
  try {
    const result = await dynamoDb.scan({
      TableName,
    }).promise()
    auctions = result.Items
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }

  return formatJSONResponse({
    auctions,
    event,
  }, 200);
};

export const main = middyfy(getAuctions);
