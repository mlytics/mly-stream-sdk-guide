# Quick Start | Integrate SDK to Radiant Media Player(RMP) via browser

## Install RMP

Include `RMP` script.

```html
<script src="https://cdn.radiantmediatechs.com/rmp/9.6.8/js/rmp.min.js"></script>
```

## Install SDK

Include the pre-built bundled scripts.

```html
<script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
<script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/rmp-hls.min.js"></script>
```

## Initialize SDK

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
const driver = mlysdk.driver.initialize();
```

## Create player adapter

In order to use SDK to download the video, we need to build the `RMP` instance by SDK `RMP` Plugin.

Call `driver.extensions.RadiantMPHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `RMP` instance.

You may receive `RMP` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
const adapter = driver.extensions.RadiantMPHlsPlayerPlugin.create({
  elementID: 'video',
  playerOptions: {
    src: {
      hls: '{PLAYLIST_URL}'
    },
    licenseKey: '{LICENSE_KEY}',
    autoplay: true,
    width: 640,
    height: 360
  }
});

const player = adapter.player;
```

After video played, you can check out streaming analytics at our portal.

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/RMP/Vanilla)
