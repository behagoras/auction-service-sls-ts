import { AwsIamPolicyStatements } from "@serverless/typescript";

export const AuctionsTableIam: AwsIamPolicyStatements[0] =
{
  Effect: 'Allow',
  Action: [
    'dynamodb:PutItem',
    'dynamodb:Scan',
    'dynamodb:GetItem',
    'dynamodb:UpdateItem',
  ],
  Resource: [
    'arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${self:custom.AuctionsTableName}',
  ]
}
