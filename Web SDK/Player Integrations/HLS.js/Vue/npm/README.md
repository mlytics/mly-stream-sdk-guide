# Quick Start | Integrate SDK to HLS.js via Vue

> This way of integration directly via NPM is experimental due to its requirement for complex configurations and potential compatibility issues.  
> It is highly recommended that integration by including `driver` and `HLS.js` scripts in `public/index.html` instead.

## Install HLS.js

Install the latest `HLS.js` package.

```bash
npm install hls.js@1.4.14
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

To make driver use HLS, call `HlsjsHlsPlugin.register()` from SDK module. Here's an example showing how you could make driver use HLS loader.

```javascript
import Hls from 'hls.js';
import {HlsjsHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

HlsjsHlsPlugin.register(Hls);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player />
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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

In order to use SDK to download the video, we need to build the `HLS.js` instance by SDK `HLS.js` Plugin.

Call `driver.extensions.HlsjsHlsPlayerPlugin.create()` to build a player adapter.

You may receive `HLS.js` instance by calling `adapter.protocol`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
<template>
  <video id="video" ref="videoRef" controls autoplay width="800"></video>
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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
    const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
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

# Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/HLS.js/Vue.js)
