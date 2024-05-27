# Quick Start | Integrate SDK to Video.js via Vue.js

## Install Video.js

In `public/index.html`, append `Video.js` scripts to the tail part of `<head>` tag.

> ⚠️ We are currently supporting `Video.js` of which version is not greater than `v8.9.0`.

```html
<head>
  ...
  <link href="https://vjs.fusioncdn.com/{VIDEOJS_VERSION}/video-js.min.css" rel="stylesheet" />
  <link href="https://unpkg.com/@videojs/themes@1/dist/fantasy/index.css" rel="stylesheet">
  <script src="https://vjs.fusioncdn.com/{VIDEOJS_VERSION}/video.min.js"></script>
</head>
```

## Install SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/videojs-hls.min.js"></script>
</head>
```
Or include SDK with specific version as following script.
```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/peripheral/player/videojs-hls.min.js"></script>
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

In order to use SDK to download the video, we need to build the `Video.js` instance by SDK `Video.js` Plugin.

Call `self.mlysdk.driver.extensions.VideojsHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `Video.js` instance.

You may receive `Video.js` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```vue
<template>
  <div>
      <video ref="video" class="video-js" style="width: 100%; maxWidth: 500px"></video>
  </div>
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
    const src = '{PLAYLIST_URL}';

    const video = this.$refs.video;
    const adapter = self.mlysdk.driver.extensions.VideojsHlsPlayerPlugin.create(video, {
      autoplay: true,
      controls: true,
      aspectRatio: '16:9',
      sources: [{
        src: src,
        type: 'application/vnd.apple.mpegurl'
      }]
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

Now start the service and view the request log in your browser. You should be able to find domains with `.m3u8` and `.ts` extension from one of the CDN domains configured in the stream settings.

> It is highly recommended to integrate by including the `driver` and `Video.js` scripts in `public/index.html` instead of installing packages via NPM. If you do prefer to integrate entirely via NPM, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/Video.js/Vue/npm).

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/Video.js/Vue/html)
