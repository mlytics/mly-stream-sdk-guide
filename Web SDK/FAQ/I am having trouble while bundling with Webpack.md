> If you are using SDK version lower than 0.13.1, please apply the following steps:

Kindly note that if you utilize webpack as a bundler and plan to obfuscate the dependent packages, we kindly request you to either exclude our SDK or ensure that the class name remains unchanged.

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
            chunks: 'all'
          }
        }
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          exclude: /mlytics\.\w+\.js$/,
          terserOptions: {
            // original options
          }
        }),
        new TerserPlugin({
          test: /mlytics\.\w+\.js$/,
          terserOptions: {
            keep_classnames: true
          }
        })
      ]
    }
  }
}
```
