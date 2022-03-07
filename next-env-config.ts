const env: string = process.env.NODE_ENV || 'development';

const envConfig = {
  development: {
    apiUrl: process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL,
    dbConn: process.env.MONGO_URI,
    mapsKey: process.env.NEXT_PUBLIC_MAPS_API_KEY
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_PRODUCTION_API_URL,
    dbConn: process.env.PRODUCTION_MONGO_URI,
    mapsKey: process.env.NEXT_PUBLIC_MAPS_API_KEY
  }
}[env];

export default envConfig;