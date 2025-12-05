import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Comment: a.customType({
    author: a.string(),
    content: a.string()
  }),
  Place: a
    .model({
       id: a.id().required(),
      name: a.string().required(),
      description: a.string().required(),
      photos: a.string().array(),
      thumbs: a.string().array(),
      comments: a.ref('Comment').array()
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
  },
});

