import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { InternalServerError } from 'http-errors';
import GetAuctionsSchema from './GetAuctionsSchema';

const dynamoDb = new DynamoDB.DocumentClient();

const getAuction: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async (event, context) => {
  console.log('getAuction handler');
  const TableName = process?.env?.AUCTIONS_TABLE_NAME!;
  let auction
  const id = event.pathParameters?.id;
  try {
    const result = await dynamoDb.get({
      TableName,
      Key: { id },
    }).promise()

    //   const result = await dynamoDb.scan({
    //     TableName,
    //   }).promise()
    auction = result.Item
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }

  return formatJSONResponse({
    auction,
    event,
  }, 200);
};

export const main = middyfy(getAuction);
