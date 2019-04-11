var webpack = require('webpack')
var PurifyWebpack = require('purifycss-webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
  filename: 'css/[name].bundle.css',
})

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract(
          {
            fallback: {
              loader: 'style-loader',
              options: {
                singleton: true,
              }
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: function(loader) {
                    return [
                      require('postcss-cssnext')()
                    ]
                  }
                }
              },
              {
                loader: 'less-loader'
              }
            ]
          }
        )
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // outputPath: 'dist/',
              useRelativePath: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractLess,
    new PurifyWebpack({
      paths: glob.sync([
        './*.html',
        './src/*.js'
      ])
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}