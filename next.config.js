/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    MONGO_URI:process.env.MONGO_URI,
    CAPTCHA_ID: process.env.CAPTCHA_ID,
    SECRET:process.env.SECRET,
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    GITHUB_ID:process.env.GITHUB_ID,
    GITHUB_SECRET:process.env.GITHUB_SECRET,
    GOOGLE_ID:process.env.GOOGLE_ID,
    GOOGLE_SECRET:process.env.GOOGLE_SECRET,
    FACEBOOK_ID:process.env.FACEBOOK_ID,
    FACEBOOK_SECRET:process.env.FACEBOOK_SECRET
  }
}

module.exports = nextConfig
