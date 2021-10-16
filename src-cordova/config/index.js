var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
}