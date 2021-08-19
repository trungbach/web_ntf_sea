const path = require('path')

module.exports = {
  env: {
    API_DOMAIN: 'http://139.177.188.72:3333',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  images: {
    domains: ['opensea.io', "storage.googleapis.com", "lh3.googleusercontent.com", "img.favpng.com", 
              "www.designyourway.net", "thedreamwithinpictures.com", 'ipfs.infura.io', 
              'payload.cargocollective.com', 'upload.wikimedia.org',
              '139.177.188.72'
            ],
  },
  trailingSlash: true,
  react: {
    useSuspense: false,
    wait: true,
  },
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
