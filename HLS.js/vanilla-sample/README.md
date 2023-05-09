# Quick Start | Integrate SDK to HLS.js via browser

## Install SDK

Include the pre-build bundled scripts.

```html
<!-- Configuration might be different along with Stream. -->
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/hlsjs-hls.min.js"></script>
```

## Install hls.js

Include the latest hls.js script.

```html
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/lib-hls.js@latest/dist/hls.min.js"></script>
```

## Initialize SDK Driver

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize();
```

## Configure Player Adapter

In order to use SDK to download the video, we need to build the `HLS` instance by driver `HLS` Plugin .

Call `driver.extensions.HlsjsHlsPlayerPlugin.create()` to build a player adapter.

You may receive `HLS` instance by calling `adapter.protocol`. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
var src = 'PLAYLIST_URL';

var video = document.getElementById('video');
const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
  url: src,
  element: video,
  hlsConfig: {
    // set your hls config here
  }
});

const hls = adapter.protocol;
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

## Full example

See [Demo](https://github.com/mlytics/stream-sdk-guide/tree/main/HLS.js/vanilla-sample)
