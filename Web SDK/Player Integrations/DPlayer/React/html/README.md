# Quick Start | Integrate SDK to DPlayer via React

## Include DPlayer

In `public/index.html`, append `DPlayer` scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/dplayer@1.27.1/dist/DPlayer.min.js"></script>
</head>
```

## Include SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/cehcdiphseaa0coe0c10-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/dplayer-hls.min.js"></script>
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

In order to use SDK to download the video, we need to build the `DPlayer` instance by SDK `DPlayer` Plugin.

Call `self.mlysdk.driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a player adapter, passing the same arguments as you would when creating a `DPlayer` instance.

You may receive `DPlayer` instance by calling `adapter.player`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import {useEffect, useRef} from 'react';

const Player = () => {
  const videoRef = useRef(null);
  const dpRef = useRef(null);

  useEffect(() => {
    const src = 'PLAYLIST_URL';

    const video = videoRef.current;
    if (!dpRef.current) {
      const adapter = self.mlysdk.driver.extensions.DPlayerHlsPlayerPlugin.create({
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

> We highly recommend including `Mlytics SDK` and `DPlayer` scripts in `public/index.html` instead of installing with npm.  
> If you do prefer to use package management, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/DPlayer/React/npm/README.md).

## Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/new/pwa_script_in_html/Web%20SDK/Player%20Integrations/DPlayer/React/html)
