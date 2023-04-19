# Quick Start | Integrate SDK to DPlayer.js via vue

## Install SDK

Install the bundled packages.

```shell
npm install @mlytics/p2sp-sdk
```

## Install DPlayer

Install the latest DPlayer package.

```shell
npm install dplayer
```

## Include Config Script

In `index.html`, append config script file to the tail part of `<head>` tag.

```html public/index.html
<header>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</header>
```

## Bind HLS loader

Bind `DPlayer` with our HLS loader plugin. To make `DPlayer` use HLS, call `DPlayerHlsPlugin.register()` from SDK module. Here's an example showing how you could bind HLS loader SDK with JavaScript.

```javascript
import DPlayer from 'dplayer';
import { DPlayerHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

DPlayerHlsPlugin.register(DPlayer);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player/>
</template>

<script>
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

import Player from './components/Player.vue';

export default {
  name: 'App',
  components: {
    Player
  },
  setup() {
    driver.initialize();
  }
};
</script>
```

## Configure SDK Adapter

In order to use SDK to download the video, we need to build the `DPlayer` instance by driver `DPlayer` Plugin .

Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `DPlayer` instance.

You may receive `DPlayer` instance by calling `adapter.player`. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
<template>
  <div id="video" ref="videoRef" />
</template>

<script>
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

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

See [Demo](https://github.com/mlytics/stream-sdk-guide/tree/main/DPlayer/vue-sample)