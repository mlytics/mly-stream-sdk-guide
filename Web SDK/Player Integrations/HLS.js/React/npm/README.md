# Quick Start | Integrate SDK to HLS.js via React

> This way of integration directly via NPM is experimental due to its requirement for complex configurations and potential compatibility issues.  
> It is highly recommended that integration by including `driver` and `HLS.js` scripts in `public/index.html` instead.

## Install HLS.js

Include the latest `HLS.js` package.

```bash
npm install hls.js@1.4.14
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

To make driver use HLS, call `HlsjsHlsPlugin.register()` from SDK module. Here's an example showing how you could make driver use HLS loader.

```javascript
import Hls from 'hls.js';
import {HlsjsHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

HlsjsHlsPlugin.register(Hls);
```

## Initialize SDK

When page is loading, call `driver.initialize()` first. Here's an example showing how you could initialize SDK with JavaScript.

```javascript
import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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

In order to use SDK to download the video, we need to build the `HLS.js` instance by SDK `HLS.js` Plugin.

Call `driver.extensions.HlsjsHlsPlayerPlugin.create()` to build a player adapter.

You may receive `HLS.js` instance by calling `adapter.protocol`. Here's an example showing how you could create player adapter with JavaScript.

```javascript
import {useEffect, useRef} from 'react';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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

# Full example

See [Demo](https://github.com/mlytics/mly-stream-sdk-guide/tree/main/Web%20SDK/Player%20Integrations/HLS.js/React/npm)
