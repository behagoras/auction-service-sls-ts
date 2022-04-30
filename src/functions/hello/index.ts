import schema from './createAuction.schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/createAuction.handler.main`,
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
