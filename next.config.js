const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  images: {
    domains: ['opensea.io', "storage.googleapis.com", "lh3.googleusercontent.com", "img.favpng.com", "www.designyourway.net"],
  },
  trailingSlash: true,
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' },
  //     '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
  //     '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
  //     '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
  //   }
  // },
}
