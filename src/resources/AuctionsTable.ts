import { Resource } from "@Types/aws.types";

export const AuctionsTable: Resource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'AuctionsTable',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S', // S: string | N: number | B: binary
      }
    ],
    KeySchema: [
      { // partition key id of type Hash
        AttributeName: 'id',
        KeyType: 'HASH', // HASH | RANGE
      }
    ],
  }
}