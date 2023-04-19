# Quick Start | Integrate SDK to Videojs via react

## Install SDK

Install the bundled packages.

```bash
npm install @mlytics/p2sp-sdk
```

## Install Video.js

Install the latest Video.js package.

```bash
npm install video.js
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

Bind `Video.js` with our HLS loader plugin. To make `Video.js` use HLS, call `VideojsHlsPlugin.register()`from SDK module. Here's an example showing how you could bind HLS loader SDK with JavaScript.

```javascript
import videojs from 'video.js';
import { VideojsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

VideojsHlsPlugin.register(videojs);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

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

## Configure SDK Adapter

In order to use SDK to download the video, we need to build the `VideoJS` instance by driver `VideoJS` Plugin .

Call `driver.extensions.VideojsHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `VideoJS` instance.

You may receive `VideoJS` instance by calling `adapter.player`. Here's an example showing how you could configure SDK Adapter with JavaScript.

```javascript
import 'video.js/dist/video-js.css';
import { useEffect, useRef } from 'react';
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

const Player = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const src = '{PLAYLIST_URL}';

    const video = videoRef.current;
    if (!playerRef.current) {
      const adapter = driver.extensions.VideojsHlsPlayerPlugin.create(video, {
        autoplay: true,
        controls: true,
        sources: [{
          src: src,
          type: 'application/vnd.apple.mpegurl'
        }]
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

  return <div data-vjs-player>
    <video ref={videoRef} className="video-js" style={{ width: "100%", maxWidth: "500px" }} />
</div>;
};

export default Player;
```

Now start the service and view the request log in your browser. You should be able to find domains with `.m3u8` and `.ts` extension from one of the CDN domains configured in the stream settings.

## Full example

See [Demo](https://github.com/mlytics/stream-sdk-guide/tree/main/Video.js/react-sample)