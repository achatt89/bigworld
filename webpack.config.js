const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

module.exports = {
  entry: [
    './src/scripts/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    // contentBase: './dist/', // Relative directory for base of server
    publicPath: '/',
    inline: true,
    port: port, // Port Number
    host: host, // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
    open:true
  },
  module: {
    rules: [{
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }, {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },

      //Using MiniCssExtractPlugin for extracting multiple CSS per JS file
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist/styles/',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff2|woff)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[hash].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },

      // font-awesome
      {
        test: /font-awesome\.config\.js/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'font-awesome-loader'
          }
        ]
      },

      // Bootstrap 4
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: 'imports-loader?jQuery=jquery'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    // Global Plugins via webpack instead of importing/require in JS files
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
  ]

}