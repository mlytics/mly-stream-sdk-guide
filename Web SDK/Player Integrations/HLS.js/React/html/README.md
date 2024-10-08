# Quick Start | Integrate SDK to HLS.js via React

## Install HLS.js

In `public/index.html`, append `HLS.js` scripts to the tail part of `<head>` tag.

> ⚠️ We are currently supporting `HLS.js` of which version should be `v1.5.7` or above.

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.7"></script>
</head>
```

## Install SDK

In `public/index.html`, append config script and pre-built bundled scripts to the tail part of `<head>` tag.

```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/hlsjs-hls.min.js"></script>
</head>
```
Or include SDK with specific version as following script.
```html
<head>
  ...
  <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/driver.min.js"></script>
  <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@{SDK_VERSION}/bundle/peripheral/player/hlsjs-hls.min.js"></script>
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

In order to use SDK to download the video, we need to build the `HLS.js` instance by SDK `HLS.js` Plugin.

Call `self.mlysdk.driver.extensions.HlsjsHlsPlayerPlugin.create()` to build a player adapter.

You may receive `HLS.js` instance by calling `adapter.protocol`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import {useEffect, useRef} from 'react';

const Player = () => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const src = 'PLAYLIST_URL';

    const video = videoRef.current;
    if (!hlsRef.current) {
      const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
        url: src,
        element: video
      });
      hlsRef.current = adapter.protocol;
    }
  }, [videoRef]);

  useEffect(() => {
    const hls = hlsRef.current;
    return () => {
      if (hls) {
        hls.destroy();
        hlsRef.current = null;
      }
    };
  }, [hlsRef]);

  return (
    <video controls autoPlay ref={videoRef} width={800} />
  );
};

export default Player;
```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for, would be one of the CDN domains in stream settings rather than the origin domain.

> It is highly recommended to integrate by including the `driver` and `HLS.js` scripts in `public/index.html` instead of installing packages via NPM. If you do prefer to integrate entirely via NPM, please see example [here](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/HLS.js/React/npm).

# Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/HLS.js/React/html)
