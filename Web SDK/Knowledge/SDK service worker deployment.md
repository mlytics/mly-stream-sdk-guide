# Introduction

We highly recommend that you read this document and then deploy the Service Worker script on your video website, especially if you encounter issues with MCDN selection and P2P transmission on the iOS platforms during video playback. It is because some libraries like [hls.js](https://github.com/video-dev/hls.js/) or [dash.js](https://github.com/Dash-Industry-Forum/dash.js/) that support streaming media communication protocol usually rely on HTML5 [MediaSource Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API) (MSE) for playback but Apple does not support this on iOS platforms.

To resolve this issue, we have introduced the technology of [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), which enables video playback through MCDN selection and P2P transmission on the iOS platforms. Compared to video websites without deployment of Service Worker script, although videos can still be played normally on the iOS platforms, all requests will be directed to the same domain or origin server. Before proceeding to read the following document, please note that deployment of Service Worker script are only effective on the iOS platforms.

# Preparation

Please ensure that you have the permission to deploy the Service Worker script under a static file proxy like nginx server and your video website must be configured to be accessed via HTTPS. Additionally, please note that the deployment example below will use HLS as a streaming media communication protocol.

# Deployment

## Create a Service Worker script

If your website is a **simple HTML page** or if you want to perform a quick test, create the following file and name it `swproxy.js` (actually the name can be anything you prefer).

```javascript
self.importScripts('https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/integration/streaming/swproxy-hls.min.js');
```

Alternatively, if your website is built with a frontend framework such as [Vue.js](https://vuejs.org/) or [React.js](https://react.dev/), while you can consider using the same approach as mentioned above, there might be issues if the version of SDK installed via npm is different from the one imported in the Service Worker script. For a more accurate and long-term approach, please create the following file and name it `swproxy.js`.

```javascript
import '@mlytics/p2sp-sdk/driver/integration/streaming/hls/swproxy/server';
```

After creating the above file, use a module bundler like Webpack to bundle that file into a standalone script. You might want to name the bundled script `swproxy.min.js`. For further Webpack configuration and bundling steps, see Link.

## Deploy the script under a proxy

Due to the restrictions of Service Worker, please deploy the script in the **root directory** corresponding to the domain of your video website. For example, if your video website URL is `https://video.website.com/index.html`, then the script URL should be `https://video.website.com/swproxy.js`.

## Configure the SDK driver options

After creating the Service Worker script, please configure the correct script path in the SDK driver options to ensure that the Service Worker is successfully registered.

```javascript
const driver = mlysdk.driver.initialize({
    swproxy: {
        scriptPath: './swproxy.js'
    }
});
```

# Conclusion

When you finished the deployment steps above, video playback on iOS platforms will be enabled with MCDN selection and P2P transmission.
