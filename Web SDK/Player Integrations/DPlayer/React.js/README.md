# Quick Start | Integrate SDK to DPlayer via React.js

## Install SDK

Install the bundled package.

```bash
npm install @mlytics/p2sp-sdk
```

## Install DPlayer

Install the latest `DPlayer` package.

```bash
npm install dplayer
```

## Include config script

In `index.html`, append config script file to the tail part of `<head>` tag.

```html
<header>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
</header>
```

## Bind HLS loader

Bind `DPlayer` with our HLS loader plugin. To make `DPlayer` use HLS, call `DPlayerHlsPlugin.register()` from SDK module. Here's an example showing how you could bind HLS loader with JavaScript.

```javascript
import DPlayer from 'dplayer';
import { DPlayerHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

DPlayerHlsPlugin.register(DPlayer);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

import { useEffect } from 'react';

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

In order to use SDK to download the video, we need to build the `DPlayer` instance by SDK `DPlayer` Plugin.

Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `DPlayer` instance.

You may receive `DPlayer` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import { useEffect, useRef } from 'react';

import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

const Player = () => {
  const videoRef = useRef(null);
  const dpRef = useRef(null);

  useEffect(() => {
    const src = 'PLAYLIST_URL';

    const video = videoRef.current;
    if (!dpRef.current) {
      const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
        container: video,
        autoplay: true,
        video: {
          url: src
        }
      });
      dpRef.current = adapter.player;
    }
  }, [videoRef]);

  useEffect(() => {
    const dp = dpRef.current;

    return () => {
      if (dp) {
        dp.destroy();
        dpRef.current = null;
      }
    }
  }, [dpRef]);

  return (
    <div id="video" ref={videoRef} />
  );
};

export default Player;
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for, would be one of the CDN domains in stream settings rather than the origin domain.

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/DPlayer/React.js)
