/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    MONGO_URI:process.env.MONGO_URI,
    EMAIL_SENDER:process.env.EMAIL_SENDER,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
   CALLBACK_REDIRECT_EMAIL_AUTH:process.env.CALLBACK_REDIRECT_EMAIL_AUTH,
   CALLBACK_REDIRECT_FORGOT_PASSWORD:process.env.CALLBACK_REDIRECT_FORGOT_PASSWORD,
   CALLBACK_REDIRECT_FORGOT_PASSWORD_IS_AUTHENTICATED:process.env.CALLBACK_REDIRECT_FORGOT_PASSWORD_IS_AUTHENTICATED,
    DELETE_USER_URL:process.DELETE_USER_URL,
    CAPTCHA_ID: process.env.CAPTCHA_ID,
    SECRET:process.env.SECRET,
    NEXT_PUBLIC_DEVELOPMENT_API_URL:process.env. NEXT_PUBLIC_DEVELOPMENT_API_URL,
    NEXT_PUBLIC_MAPS_API_KEY:process.env.NEXT_PUBLIC_MAPS_API_KEY,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    GITHUB_ID:process.env.GITHUB_ID,
    GITHUB_SECRET:process.env.GITHUB_SECRET,
    GOOGLE_ID:process.env.GOOGLE_ID,
    GOOGLE_SECRET:process.env.GOOGLE_SECRET,
    FACEBOOK_ID:process.env.FACEBOOK_ID,
    FACEBOOK_SECRET:process.env.FACEBOOK_SECRET
  },
  images: {
    domains: ['cimacnoticias.com.mx',"rubrit-development.s3.sa-east-1.amazonaws.com","s3.amazonaws.com"],

  }
}

module.exports = nextConfig
