# Quick Start | Integrate SDK to Radiant Media Player(RMP) via Vue

## Install Radiant Media Player(RMP)

In `public/index.html` file, add `RMP` as an external library.

```html
<head>
  ...
  <script src="https://cdn.radiantmediatechs.com/rmp/9.6.8/js/rmp.min.js"></script>
```

## Install SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/rmp-hls.min.js"></script>
</head>
```
Or include SDK with specific version as following script.
```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/peripheral/player/rmp-hls.min.js"></script>
</head>
```

## Initialize SDK

When page is loading, call `self.mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```vue
<template>
  <Player />
</template>

<script>
import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    Player
  },
  beforeMount() {
    self.mlysdk.driver.initialize();
  }
};
</script>
```

## Create player adapter

In order to use SDK to download the video, we need to build the `RMP` instance by SDK `RMP` Plugin.

Call `self.mlysdk.driver.extensions.RadiantMPHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `RMP` instance.

You may receive `RMP` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```vue
<template>
  <div id="video" style="width: 100%; maxWidth: 800px"></div>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
      player: null
    }
  },
  mounted() {
    const adapter = self.mlysdk.driver.extensions.RadiantMPHlsPlayerPlugin.create(video, {
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
    this.player = adapter.player;
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
```

After video played, you can check out streaming analytics at our portal.

> It is highly recommended to integrate by including the `driver` and `RMP` scripts in `public/index.html` instead of installing packages via NPM. If you do prefer to integrate entirely via NPM, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/RMP/Vue/npm).

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/RMP/Vue/html)
