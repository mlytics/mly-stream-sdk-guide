const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/swproxy.js',
  output: {
    filename: 'swproxy.min.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
