const env: string = process.env.NODE_ENV || "development";

const envConfig = {
  development: {
    apiUrl: process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL,
    dbConn: process.env.MONGO_URI,
    mapsKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    redirectEmailAuth: `${process.env.DEVELOPMENT_HOST}/mail/code?`,
    redirectForgotPassword: `${process.env.DEVELOPMENT_HOST}/mail/password?`,
    forgotPasswordAuthenticated: `${process.env.DEVELOPMENT_HOST}/myAccount?isAuthenticated=true&`,
    host: `${process.env.DEVELOPMENT_HOST}`,
    signIn: `${process.env.DEVELOPMENT_HOST}`,
    signOut: `${process.env.DEVELOPMENT_HOST}`,
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_PRODUCTION_API_URL,
    dbConn: process.env.PRODUCTION_MONGO_URI,
    mapsKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    redirectEmailAuth: `${process.env.PRODUCTION_HOST}/mail/code?`,
    redirectForgotPassword: `${process.env.PRODUCTION_HOST}/mail/password?`,
    forgotPasswordAuthenticated: `${process.env.PRODUCTION_HOST}/myAccount?isAuthenticated=true&`,
    host: `${process.env.PRODUCTION_HOST}`,
    signIn: `${process.env.PRODUCTION_HOST}`,
    signOut: `${process.env.PRODUCTION_HOST}`,
  },
}[env];

export default envConfig;
