import { AwsIamPolicyStatements } from "@serverless/typescript";

export const AuctionsTableIam: AwsIamPolicyStatements[0] =
{
  Effect: 'Allow',
  Action: [
    'dynamodb:PutItem',
    'dynamodb:Scan',
  ],
  Resource: [
    'arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${self:custom.AuctionsTableName}',
  ]
}
