# Quick Start | Integrate SDK to Radiant Media Player(RMP) via React

> ⚠️ This way of integration directly via NPM is experimental due to its requirement for complex configurations and potential compatibility issues. It is highly recommended to integrate by including `driver` and `RMP` scripts in `public/index.html` instead.

## Install Radiant Media Player(RMP)

In `public/index.html` file, add `RMP` as an external library.

```html
<head>
  ...
  <script src="https://cdn.radiantmediatechs.com/rmp/9.6.8/js/rmp.min.js"></script>
</head>
```

## Include config script

In `public/index.html`, append config script file to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</head>
```

## Install SDK

Install the bundled package.

```bash
npm install @mlytics/p2sp-sdk@{SDK_VERSION} --save-exact
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
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

import {useEffect} from 'react';

import Player from './components/Player';

const App = () => {
  useEffect(() => {
    driver.initialize();
  }, []);

  return (
    <><Player /></>
  );
};

export default App;
```

## Create player adapter

In order to use SDK to download the video, we need to build the `RMP` instance by SDK `RMP` Plugin.

Call `driver.extensions.RadiantMPHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `RMP` instance.

You may receive `RMP` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import {useEffect, useRef} from 'react';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

const Player = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!playerRef.current) {
      const adapter = driver.extensions.RadiantMPHlsPlayerPlugin.create({
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
      playerRef.current = adapter.player;
    }
  }, [videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <div ref={videoRef} id="video" style="width: 100%; maxWidth: 800px"></div>;
};

export default Player;
```

After video played, you can check out streaming analytics at our portal.

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/RMP/React/npm)
