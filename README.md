# vue-cli脚手架 webpack 3.6 升 4.0

``` bash

手动修改package.json
"webpack": "^4.5.0",
"webpack-bundle-analyzer": "^2.9.0",
"webpack-cli": "^3.1.0",
"webpack-dev-server": "^3.1.4",
"webpack-merge": "^4.1.0"
"extract-text-webpack-plugin": "^4.0.0-beta.0",
"vue-loader": "^15.3.0",
"eslint": "^5.0.0",
"eslint-loader": "^2.1.2",
"html-webpack-plugin": "^3.2.0",
vue-loader15+需要使用 VueLoaderPlugin
webpack.base.conf.js
新增
const { VueLoaderPlugin } = require('vue-loader')
plugins: [
  new VueLoaderPlugin()
],
webpack4.0+
1、需安装webpack-cli
2、eslint-loader、vue-loader兼容
3、弃用CommonsChunkPlugin，推荐使用SplitChunkPlugin
  webpack.prod.conf.js
  删除CommonsChunkPlugin新增SplitChunksPlugin
  new webpack.optimize.SplitChunksPlugin({
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
            name: 'vendor'
        },
        //打包第三方类库
        commons: {
            name: "commons",
            chunks: "initial",
            minChunks: Infinity
        }
    }
  }),
4、弃用extract-text-webpack-plugin，推荐使用mini-css-extract-plugin
  webpack.prod.conf.js
  删除
  const ExtractTextPlugin = requir('extract-text-webpack-plugin')
  new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
  新增
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  "const webpackConfig = merge(baseWebpackConfig, {"新增mode : 'production',
  new MiniCssExtractPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    allChunks: true,
  }),
  build/utils.js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  if (options.extract) {
    return [MiniCssExtractPlugin.loader].concat(loaders)
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
5、控制台报错
  Cannot assign to read only property ‘exports’ of object 
  webpack.base.conf.js
  {
    test: /\.js$/,
    loader: 'babel-loader',
    // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
    include: [resolve('src'), resolve('test')]
  }

```
