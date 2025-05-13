module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f1sZbGPQwaZrQmXZmtywdw'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'AsdUWKnHx3KpzwfZdTI9GA'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
