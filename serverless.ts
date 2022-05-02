import type { AWS } from '@serverless/typescript';

import auctionFns from '@functions/auction';

const serverlessConfiguration: AWS = {
  service: 'ts-base-project',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
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
