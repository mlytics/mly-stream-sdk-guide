# Quick Start | Integrate SDK to DPlayer via Vue.js

## Install DPlayer

Install the latest `DPlayer` package.

```bash
npm install dplayer
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

Bind `DPlayer` with our HLS loader plugin. To make `DPlayer` use HLS, call `DPlayerHlsPlugin.register()` from SDK module. Here's an example showing how you could bind HLS loader with JavaScript.

```javascript
import DPlayer from 'dplayer';
import {DPlayerHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

DPlayerHlsPlugin.register(DPlayer);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player />
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

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

In order to use SDK to download the video, we need to build the `DPlayer` instance by SDK `DPlayer` Plugin.

Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `DPlayer` instance.

You may receive `DPlayer` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
<template>
  <div id="video" ref="videoRef"></div>
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

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
    const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
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

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/DPlayer/Vue.js)
