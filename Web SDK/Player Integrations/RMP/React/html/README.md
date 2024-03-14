# Quick Start | Integrate SDK to Radiant Media Player(RMP) via React

## Include Radiant Media Player(RMP)

In `public/index.html` file, add `RMP` as an external library.

```html
<head>
  ...
  <script src="https://cdn.radiantmediatechs.com/rmp/9.6.8/js/rmp.min.js"></script>
</head>
```

## Include SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/rmp-hls.min.js"></script>
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

In order to use SDK to download the video, we need to build the `RMP` instance by SDK `RMP` Plugin.

Call `self.mlysdk.driver.extensions.RadiantMPHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `RMP` instance.

You may receive `RMP` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import {useEffect, useRef} from 'react';

const Player = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!playerRef.current) {
      const adapter = self.mlysdk.driver.extensions.RadiantMPHlsPlayerPlugin.create({
        elementID: 'video',
        playerOptions: {
            src: {
              hls: '{PLAYLIST_URL}'
            },
            licenseKey: '{YOUR_RMP_LICENSE_KEY}',
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

> We highly recommend including `Mlytics SDK` and `RMP` scripts in `public/index.html` instead of installing with npm.  
> If you do prefer to use package management, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/RMP/React/npm/README.md).

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/RMP/React/html)
