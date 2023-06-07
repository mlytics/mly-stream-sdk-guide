Please be aware that if you are using webpack as a bundler, and will obfuscate dependent packages, please exclude our SDK or keep the class name intact.

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
            // original options
          },
        }),
        new TerserPlugin({
          test: /mlytics\.\w+\.js$/,
          terserOptions: {
            keep_classnames: true
          },
        })
      ]
    }
  }
}
```
