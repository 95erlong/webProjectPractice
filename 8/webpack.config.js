var path = require('path')
var Webpack = require('webpack')
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
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: { singleton: true }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
              test: /\.js$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env'],
                    plugins: ['lodash']
                  }
                }
              ]
            }
        ]
    },
    plugins: [
      new ExtractTextWebpackPlugin({
        filename: '[name].min.css',
        allChunks: false
      }),
      
      new Webpack.optimize.UglifyJsPlugin()
    ]
}