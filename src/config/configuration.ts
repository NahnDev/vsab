export default function () {
  return {
    server: {
      port: process.env.PORT || 8080,
      hostname: process.env.HOSTNAME || 'http://localhost:8080',
    },
    database: {
      default: {
        uri: process.env.DATABASE_DEFAULT,
      },
    },
    security: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET || 'accessToken',
        expires: Number(process.env.ACCESS_TOKEN_EXPIRES) || 24 * 60 * 60,
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET || 'refreshToken',
        expires: Number(process.env.REFRESH_TOKEN_EXPIRES) || 24 * 60 * 60 * 30,
      },
      activeToken: {
        secret: process.env.ACTIVE_TOKEN_SECRET || 'activeToken',
        expires: Number(process.env.ACTIVE_TOKEN_EXPIRES) || 30 * 60,
      },
    },
    google: {
      login: {
        clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
        clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_LOGIN_CALLBACK_URL,
      },
      gmail: {
        clientID: process.env.GOOGLE_GMAIL_CLIENT_ID,
        clientSecret: process.env.GOOGLE_GMAIL_CLIENT_SECRET,
        activeUrl: process.env.GOOGLE_GMAIL_ACTIVE_URL,
        user: process.env.GOOGLE_GMAIL_USER,
        refreshToken: process.env.GOOGLE_GMAIL_REFRESH_TOKEN,
      },
    },

    frontEnd: {
      authUri: process.env.FRONT_END_AUTH_URI || 'http://localhost:8080/auth',
    },
  };
}
