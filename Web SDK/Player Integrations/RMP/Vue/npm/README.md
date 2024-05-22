# Quick Start | Integrate SDK to Radiant Media Player(RMP) via Vue

> ⚠️ This way of integration directly via NPM is experimental due to its requirement for complex configurations and potential compatibility issues. It is highly recommended to integrate by including `driver` and `RMP` scripts in `public/index.html` instead.

## Include player script

In `public/index.html` file, add `RMP` as an external library.

```html
<head>
  ...
  <script src="https://cdn.radiantmediatechs.com/rmp/9.6.8/js/rmp.min.js"></script>
</head>
```

## Include config script

In `index.html`, append config script file to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</head>
```

## Install SDK

Install the bundled package.

```bash
npm install @mlytics/p2sp-sdk@{VERSION} --save-exact
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
}
```

## Bind SDK

Add `RMP` into our SDK. To do this, use `RadiantMPHlsPlugin.register()` from SDK module. Here's an example showing how you could register the `RMP`:

```javascript
import {RadiantMPHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

RadiantMPHlsPlugin.register(window.RadiantMP);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
<template>
  <Player />
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

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

In order to use SDK to download the video, we need to build the `RMP` instance by SDK `RMP` Plugin.

Call `driver.extensions.RadiantMPHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `RMP` instance.

You may receive `RMP` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
<template>
  <div id="video" style="width: 100%; maxWidth: 800px"></div>
</template>

<script>
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

export default {
  name: 'Player',
  data() {
    return {
      player: null
    }
  },
  mounted() {
    const adapter = driver.extensions.RadiantMPHlsPlayerPlugin.create(video, {
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

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/RMP/Vue/npm)
