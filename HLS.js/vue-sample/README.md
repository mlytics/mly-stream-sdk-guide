# Integrate player

## Install SDK

Include the pre-build bundled scripts.

```bash
npm install @mlytics/p2sp-sdk
```

## Install HLS.js

Include the latest HLS.js script.

```bash
npm install @mlytics/lib-hls.js
```

## Include Config Script

In `index.html`, append config script file to the tail part of `<head>` tag.

```html public/index.html
<header>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</header>
```

## Make Driver use HLS

To make Driver use HLS, call `HlsjsHlsPlugin.register()` from SDK module. Here's an example showing how you could make driver use HLS loader.

```javascript
import Hls from 'hls.js';
import { HlsjsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

HlsjsHlsPlugin.register(Hls);
```

## Initialize SDK

To initialize SDK, we need to call `mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player/>
  </template>

<script>
  import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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

## Configure Player Adapter

In order to use SDK to download the video, we need to build the `HLS` instance by driver `HLS` Plugin .

Call `driver.extensions.HlsjsHlsPlayerPlugin.create()` to build a player adapter.

You may receive `HLS` instance by calling `adapter.protocol`. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
<template>
  <video id="video" ref="videoRef" controls autoplay width=800 />
</template>

<script>
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

# Full example

See [Demo](https://github.com/mlytics/stream-sdk-guide/tree/main/HLS.js/vue-sample)
