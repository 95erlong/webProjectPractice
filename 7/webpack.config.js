var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },

  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       // loader: 'style-loader/url'
      //       // loader: 'style-loader/useable'
      //       loader: 'style-loader',
      //       options: {
      //         singleton: true,
      //         transform: './css.tranform.js'
      //       }
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         minimize: true,
      //         modules: true,
      //         localIdentName: '[path][name]_[local]_[hash:base64:5]'
      //       }
      //       // loader: 'file-loader'
      //     }
      //   ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.tranform.js'
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true,
                modules: true,
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
              }
            }
          ]
        })
        
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.tranform.js'
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true,
                modules: true,
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  // require('autoprefixer')(),
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false
    })
  ]
}