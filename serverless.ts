import { createAuctionFunction, getAuctionsFunction, getSingleAuctionFunction, placeBidFunction } from '@Functions/auction';
import { AuctionsTableIam } from '@Iams/AunctionsTableIam';
import { AuctionsTable } from '@Resources/AuctionsTable';
import type { AWS } from '@serverless/typescript';
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
      AUCTIONS_TABLE_NAME: '${self:custom.AuctionsTableName}',
    },
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1'}" as "us-east-1",
    iamRoleStatements: [
      AuctionsTableIam,
    ]
  },
  resources: {
    // cloud formation syntax
    Resources: {
      AuctionsTable,
    }
  },
  // import the function via paths
  functions: {
    createAuction: createAuctionFunction,
    getAuctions: getAuctionsFunction,
    getSingleAuction: getSingleAuctionFunction,
    placeBid: placeBidFunction,
  },
  package: { individually: true },

  custom: {
    AuctionsTableName: 'AuctionsTable-${self:provider.stage}',
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
  },
};

module.exports = serverlessConfiguration;
