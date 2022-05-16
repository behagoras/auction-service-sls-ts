import { Auction, Bid } from '@Types/auction.types';
import { DynamoDB } from 'aws-sdk';
import { InternalServerError, NotFound, Forbidden } from 'http-errors';

const dynamoDb = new DynamoDB.DocumentClient();
const AuctionTableName = process?.env?.AUCTIONS_TABLE_NAME!;


export async function getAuctionsService() {
  try {
    const result = await dynamoDb.scan({ TableName: AuctionTableName, }).promise()
    return result.Items as Auction[]
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }
}

export async function getSpecificAuctionService(id: string) {
  try {
    const result = await dynamoDb.get({
      TableName: AuctionTableName,
      Key: { id },
    }).promise()
    const auction = result.Item

    if (!auction) {
      throw new NotFound(`Auction with id ${id} not found!`);
    }

    return auction
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }
}

export async function createAuctionService(auction: Auction) {
  try {
    await dynamoDb.put({
      TableName: process?.env?.AUCTIONS_TABLE_NAME!,
      Item: auction,
    }).promise();
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }
}

export async function placeBidService(id: string, bid:Bid) {
  try {
    const response = await dynamoDb.update({
      TableName: AuctionTableName,
      Key: { id },
      UpdateExpression: 'set highestBid.amount = :amount',
      ExpressionAttributeValues: {
        ':amount': bid.amount,
      },
      ReturnValues: 'ALL_NEW',
    }).promise()

    return response.Attributes as Auction
  } catch (error) {
    console.error(error);
    throw new InternalServerError(JSON.stringify(error));
  }
}
