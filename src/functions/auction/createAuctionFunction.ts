import schema from './CreateAuctionSchema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/createAuctionHandler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/auction',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
