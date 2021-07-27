const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  images: {
    domains: ['opensea.io', "storage.googleapis.com", "lh3.googleusercontent.com"],
  },
}
