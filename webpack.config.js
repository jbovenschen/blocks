const path = require('path')
const webpack = require('webpack')

const config = {
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
    vendors: ['react','react-dom', 'babel-polyfill']
  },
  output: {
    path: './src',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './src',
    port: 3000
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader?importLoaders=1&module',
      include: __dirname
    } ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.output.path = path.join(__dirname, 'dist/')

  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }))
}

module.exports = config
