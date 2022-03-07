/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    CALLBACK_REDIRECT_EMAIL_AUTH: process.env.CALLBACK_REDIRECT_EMAIL_AUTH,
    CAPTCHA_ID: process.env.CAPTCHA_ID,
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    MP_PUBLIC_KEY: process.env.MP_PUBLIC_KEY,
  },
  images: {
    domains: ["cimacnoticias.com.mx"],
  },
};

module.exports = nextConfig;
