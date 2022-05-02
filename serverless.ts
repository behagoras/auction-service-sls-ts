import type { AWS } from '@serverless/typescript';

import auctionFns from '@functions/auction';

const serverlessConfiguration: AWS = {
  service: 'ts-base-project',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-pseudo-parameters'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1'}" as "us-east-1",
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:PutItem',
        ],
        Resource: [
          'arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/AuctionsTable',
        ]
      }
    ]
  },
  resources:{
    // cloud formation syntax
    Resources: {
      AuctionsTable: {
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
    }
  },
  // import the function via paths
  functions: {
    auctionFns
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    // bundle: {
    //   linting: false,
    // }
  },
};

module.exports = serverlessConfiguration;
