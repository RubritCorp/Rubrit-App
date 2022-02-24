/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    CAPTCHA_ID: process.env.CAPTCHA_ID,
  }
  images: {
    domains: ['cimacnoticias.com.mx'],
  }
}

module.exports = nextConfig
