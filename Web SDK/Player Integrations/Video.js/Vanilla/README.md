# Quick Start | Integrate SDK to Video.js via browser

## Install Video.js

Include `Video.js` script.

> ⚠️ We are currently supporting `Video.js` of which version is not greater than `v8.9.0`.

```html
<link href="https://vjs.fusioncdn.com/{VIDEOJS_VERSION}/video-js.min.css" rel="stylesheet" />
<link href="https://unpkg.com/@videojs/themes@1/dist/fantasy/index.css" rel="stylesheet">
<script src="https://vjs.fusioncdn.com/{VIDEOJS_VERSION}/video.min.js"></script>
```

## Install SDK

Include the pre-built bundled scripts.

```html
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/videojs-hls.min.js"></script>
```
Or include SDK with specific version as following script.
```html
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/peripheral/player/videojs-hls.min.js"></script>
```

## Initialize SDK

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize();
```

## Create player adapter

In order to use SDK to download the video, we need to build the `Video.js` instance by SDK `Video.js` Plugin.

Call `driver.extensions.VideojsHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `Video.js` instance.

You may receive `Video.js` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
const src = '{PLAYLIST_URL}';

const video = document.getElementById('video');
const adapter = driver.extensions.VideojsHlsPlayerPlugin.create(video, {
  autoplay: true,
  controls: true,
  aspectRatio: '16:9',
  sources: [{
    src: src,
    type: 'application/vnd.apple.mpegurl'
  }]
});

const videojsPlayer = adapter.player;
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for, would be one of the CDN domains in stream settings rather than the origin domain.

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/Video.js/Vanilla)
