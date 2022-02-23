/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    CAPTCHA_ID: process.env.CAPTCHA_ID,
  }
}

module.exports = nextConfig
