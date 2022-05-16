import { handlerPath } from '@Libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/getSingleAuctionHandler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/auction/{id}',
      },
    },
  ],
};
