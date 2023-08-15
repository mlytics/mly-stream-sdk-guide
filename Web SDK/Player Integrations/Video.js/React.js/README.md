# Quick Start | Integrate SDK to Video.js via React.js

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
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

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

In order to use SDK to download the video, we need to build the `Video.js` instance by SDK `Video.js` Plugin.

Call `driver.extensions.VideojsHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `Video.js` instance.

You may receive `Video.js` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import 'video.js/dist/video-js.css';

import {useEffect, useRef} from 'react';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

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
        aspectRatio: '16:9',
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

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for, would be one of the CDN domains in stream settings rather than the origin domain.

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/Video.js/React.js)
