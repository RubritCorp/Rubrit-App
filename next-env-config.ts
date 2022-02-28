const env: string = process.env.NODE_ENV || 'development';

const envConfig = {
  development: {
    apiUrl: process.env.DEVELOPMENT_API_URL,
    dbConn: process.env.MONGO_URI,
  },
  production: {
    apiUrl: process.env.PRODUCTION_API_URL,
    dbConn: process.env.PRODUCTION_MONGO_URI
  }
}[env];

export default envConfig;