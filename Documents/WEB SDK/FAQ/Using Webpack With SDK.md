Please be aware that if you are using webpack as a bundler, and will obfuscate the `node_modules` folder, please exclude our SDK or keep the className intact.

Here is an example of a webpack configuration file:

```javascript
module.exports = function () {
  return {
    // other configurations
    optimization: {
      splitChunks: {
        cacheGroups: {
          mlytics: {
            test: /[\\/]node_modules[\\/]@mlytics[\\/]/,
            name: 'mlytics',
            chunks: 'all',
          },
        },
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          exclude: /mlytics\.\w+\.js$/,
          terserOptions: {
            // ...
          },
        }),
        new TerserPlugin({
          test: /mlytics\.\w+\.js$/,
          terserOptions: {
            keep_classnames: true,
            // ...
          },
        })
      ]
    }
  }
}
```
