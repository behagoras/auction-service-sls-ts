import { handlerPath } from '@Libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/getAuctionsHandler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/auctions',
      },
    },
  ],
};
