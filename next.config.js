/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export'  ,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://testpay.easebuzz.in/:path*',
      },
    ];
  },
  // async middleware() {
  //   const { createProxyMiddleware } = require('http-proxy-middleware');
    
  //   const proxyMiddleware = createProxyMiddleware({
  //     target: 'https://testpay.easebuzz.in',
  //     changeOrigin: true,
  //   });

  //   return [proxyMiddleware];
  // },
};

module.exports = nextConfig;


