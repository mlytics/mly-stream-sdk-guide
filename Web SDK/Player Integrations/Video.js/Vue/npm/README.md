# Quick Start | Integrate SDK to Video.js via Vue

> This method is not recommended due to compatibility issues.  
> Please include `Mlytics SDK` and `Video.js` scripts in `public/index.html` instead.  
> For more details, please see [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/Video.js/React/html/README.md).

## Install Video.js

Install `Video.js` package.
> We are currently supporting `Video.js` of which version should be lower than `v8.0.0`.

```bash
npm install video.js@7.21.5
```

## Install SDK

Install the bundled package.

```bash
npm install @mlytics/p2sp-sdk
```

## Install babel plugin

Install the latest babel plugin.

```bash
npm install @babel/plugin-proposal-private-methods --save-dev
```

Update `babel.config.js` file to your project's root directory. Then, paste the following code:

```javascript
module.exports = {
  ...
  plugins: [
    '@babel/plugin-proposal-private-methods'
  ]
};
```

## Include config script

In `index.html`, append config script file to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</head>
```

## Bind HLS loader

Bind `Video.js` with our HLS loader plugin. To make `Video.js` use HLS, call `VideojsHlsPlugin.register()` from SDK module. Here's an example showing how you could bind HLS loader with JavaScript.

```javascript
import videojs from 'video.js';
import {VideojsHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

VideojsHlsPlugin.register(videojs);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player />
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    Player
  },
  beforeMount() {
    driver.initialize();
  }
};
</script>
```

## Create player adapter

In order to use SDK to download the video, we need to build the `Video.js` instance by SDK `Video.js` Plugin.

Call `driver.extensions.VideojsHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `Video.js` instance.

You may receive `Video.js` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
<template>
  <div>
      <video ref="video" class="video-js" style="width: 100%; maxWidth: 500px"></video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

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
    const adapter = driver.extensions.VideojsHlsPlayerPlugin.create(video, {
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

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/Video.js/Vue/npm)
