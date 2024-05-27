# Quick Start | Integrate SDK to DPlayer.js via browser

## Install DPlayer

Include the latest `DPlayer` script.

```html
<script src="https://jsdelivr.fusioncdn.com/npm/dplayer@1.27.1/dist/DPlayer.min.js"></script>
```

## Install SDK

Include the pre-built bundled scripts.

```html
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/dplayer-hls.min.js"></script>
```
Or include SDK with specific version as following script
```html
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/dplayer-hls.min.js"></script>
```

## Initialize SDK

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize();
```

## Create player adapter

In order to use SDK to download the video, we need to build the `DPlayer` instance by SDK `DPlayer` Plugin.

Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `DPlayer` instance.

You may receive `DPlayer` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

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
const dp = adapter.player;
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for, would be one of the CDN domains in stream settings rather than the origin domain.

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/DPlayer/Vanilla)
