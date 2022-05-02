import { AwsIamPolicyStatements } from "@serverless/typescript";

export const AuctionsTableIam: AwsIamPolicyStatements[0] =
{
  Effect: 'Allow',
  Action: [
    'dynamodb:PutItem',
  ],
  Resource: [
    'arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/AuctionsTable',
  ]
}
