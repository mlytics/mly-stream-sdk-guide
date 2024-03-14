# Quick Start | Integrate SDK to HLS.js via Vue

## Install HLS.js

In `public/index.html`, append `Video.js` scripts to the tail part of `<head>` tag.
> We are currently supporting `HLS.js` of which version should be higher than `v1.4.14`.

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

```javascript
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

```javascript
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

> We highly recommend including `Mlytics SDK` and `Video.js` scripts in `public/index.html` instead of installing with npm.  
> If you do prefer to use package management, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/HLS.js/Vue/npm/README.md).

# Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/HLS.js/Vue/html)
