# Quick Start | Integrate SDK to DPlayer via Vue

## Install DPlayer

In `public/index.html`, append `DPlayer` scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/dplayer@1.27.1/dist/DPlayer.min.js"></script>
</head>
```

## Install SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/dplayer-hls.min.js"></script>
</head>
```
Or include SDK with specific version as following script.
```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/peripheral/player/dplayer-hls.min.js"></script>
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

In order to use SDK to download the video, we need to build the `DPlayer` instance by SDK `DPlayer` Plugin.

Call `self.mlysdk.driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `DPlayer` instance.

You may receive `DPlayer` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```vue
<template>
  <div id="video" ref="videoRef"></div>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
      dp: null,
    };
  },
  mounted() {
    const src = 'PLAYLIST_URL';

    const video = this.$refs.videoRef;
    const adapter = self.mlysdk.driver.extensions.DPlayerHlsPlayerPlugin.create({
      container: video,
      autoplay: true,
      video: {
        url: src
      }
    });
    this.dp = adapter.player;
  },
  beforeUnmount() {
    if (this.dp) {
      this.dp.destroy();
    }
  }
};
</script>
```

Now start the service and view the request log in your browser. You should be able to find domains with `.m3u8` and `.ts` extension from one of the CDN domains configured in the stream settings.

> It is highly recommended to integrate by including the `driver` and `DPlayer` scripts in `public/index.html` instead of installing packages via NPM. If you do prefer to integrate entirely via NPM, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/DPlayer/Vue/npm).

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/DPlayer/Vue/html)
