# Quick Start | Integrate SDK to DPlayer.js via browser

## Install SDK

Include the pre-build bundled scripts.

```html
<!-- Configuration might be different along with Stream. -->
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/hlsjs-hls.min.js"></script>
```

## Install DPlayer

Include the latest DPlayer script.

```html
<script src="https://jsdelivr.fusioncdn.com/npm/dplayer@1.26.0/dist/DPlayer.min.js"></script>
```

## Initialize SDK

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize();
```

## Configure Player Adapter

In order to use SDK to download the video, we need to build the `DPlayer` instance by driver `DPlayer` Plugin .

Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter.

You may receive `DPlayerHlsPlayerPlugin` instance by calling `adapter.player`. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
const src = 'PLAYLIST_URL';

const video = document.getElementById('video');
const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
  container: video,
  autoplay: true,
  controls: true,
  video: {
    url: src,
  }
});
const dp = adapter.player
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

## Full example

See [Demo](https://github.com/mlytics/stream-sdk-guide/tree/main/DPlayer/vanilla-sample)