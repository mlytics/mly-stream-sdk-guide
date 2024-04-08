# Quick Start | Integrate SDK to HLS.js via Vue

## Install HLS.js

In `public/index.html`, append `HLS.js` scripts to the tail part of `<head>` tag.

> ⚠️ We are currently supporting `HLS.js` of which version should be `v1.4.14` and above.

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.14"></script>
</head>
```

## Include SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/hlsjs-hls.min.js"></script>
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

In order to use SDK to download the video, we need to build the `HLS.js` instance by SDK `HLS.js` Plugin.

Call `self.mlysdk.driver.extensions.HlsjsHlsPlayerPlugin.create()` to build a player adapter.

You may receive `HLS.js` instance by calling `adapter.protocol`. Here's an example showing how you could create player adapter with JavaScript.

```vue
<template>
  <video id="video" ref="videoRef" controls autoplay width="800"></video>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
      hls: null,
    };
  },
  mounted() {
    const src = 'PLAYLIST_URL';

    const video = this.$refs.videoRef;
    const adapter = self.mlysdk.driver.extensions.HlsjsHlsPlayerPlugin.create({
      url: src,
      element: video
    });
    this.hls = adapter.protocol;
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
};
</script>
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for, would be one of the CDN domains in stream settings rather than the origin domain.

> It is highly recommended to integrate by including `driver` and `HLS.js` scripts in `public/index.html` instead of installing packages via NPM.
> If you do prefer to integrate entirely via NPM, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/HLS.js/Vue/npm).

# Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/HLS.js/Vue/html)
