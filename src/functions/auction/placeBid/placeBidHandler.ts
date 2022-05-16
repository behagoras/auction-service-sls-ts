import type { ValidatedEventAPIGatewayProxyEvent } from '@Libs/api-gateway';
import { formatJSONResponse } from '@Libs/api-gateway';
import { middyfy } from '@Libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { InternalServerError, NotFound } from 'http-errors';
import GetAuctionsSchema from './placeBidSchema';

const dynamoDb = new DynamoDB.DocumentClient();

const placeBid: ValidatedEventAPIGatewayProxyEvent<typeof GetAuctionsSchema> = async (event) => {
  console.log('placeBid handler');
  const TableName = process?.env?.AUCTIONS_TABLE_NAME!;
  const { id = '' } = event.pathParameters!;
  const { amount } = event.body;

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName,
    Key: { id },
    ExpressionAttributeValues: {
      ':amount': amount,
    },
    UpdateExpression: 'set highestBid.amount = :amount',
    ReturnValues: 'ALL_NEW',
  }

  let updatedAuction;

  try {
    const result = await dynamoDb.update(params).promise()
    updatedAuction = result.Attributes
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }

  return formatJSONResponse({
    updatedAuction,
  }, 200);

};

export const main = middyfy(placeBid);
