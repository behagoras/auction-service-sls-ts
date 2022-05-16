import { handlerPath } from '@Libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/placeBidHandler.main`,
  events: [
    {
      http: {
        method: 'patch',
        path: '/auction/{id}/bid',
      },
    },
  ],
};
