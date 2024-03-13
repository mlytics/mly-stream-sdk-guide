# Quick Start | Integrate SDK to Video.js via React

## Include Video.js

In `public/index.html`, append `Video.js` scripts to the tail part of `<head>` tag.
> We are currently supporting `Video.js` of which version should be lower than `v8.0.0`.

```html
<head>
  ...
  <link href="https://vjs.fusioncdn.com/7.21.5/video-js.min.css" rel="stylesheet" />
  <link href="https://unpkg.com/@videojs/themes@1/dist/fantasy/index.css" rel="stylesheet">
  <script src="https://vjs.fusioncdn.com/7.21.5/video.min.js"></script>
</head>
```

## Include SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/videojs-hls.min.js"></script>
</head>
```

## Initialize SDK

When page is loading, call `self.mlysdk.driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
import {useEffect} from 'react';

import Player from './components/Player';

const App = () => {
  useEffect(() => {
    self.mlysdk.driver.initialize();
  }, []);

  return (
    <><Player /></>
  );
};

export default App;
```

## Create player adapter

In order to use SDK to download the video, we need to build the `Video.js` instance by SDK `Video.js` Plugin.

Call `self.mlysdk.driver.extensions.VideojsHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `Video.js` instance.

You may receive `Video.js` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import {useEffect, useRef} from 'react';

const Player = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const src = '{PLAYLIST_URL}';

    const video = videoRef.current;
    if (!playerRef.current) {
      const adapter = self.mlysdk.driver.extensions.VideojsHlsPlayerPlugin.create(video, {
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

> We highly recommend including `Mlytics SDK` and `Video.js` scripts in `public/index.html` instead of installing with npm.  
> If you do prefer to use package management, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/Video.js/React/npm/README.md).

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/Video.js/React/html)
