# Quick Start | Integrate SDK to HLS.js via react

1. Install `hls.js`.

    ```bash
    npm install hls.js
    ```

2. Install `driver`.

    ```bash
    npm install @mlytics/p2sp-sdk
    ```

3. In `index.html`, append config script file to the tail part of `<head>` tag.

    ```html
    <header>
      ...
      <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
    </header>
    ```

4. To make driver use `Hls`, call `HlsjsHlsPlugin.register()` from SDK module.

    ```javascript
    import Hls from 'hls.js';
    import { HlsjsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

    HlsjsHlsPlugin.register(Hls);
    ```

5. When page is loading, call `driver.initialize()` first.

    ```javascript
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';
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

6. Call `driver.extensions.HlsjsHlsPlayerPlugin.create()` to create a **player adapter**.  

    ```javascript
    import { useEffect, useRef } from 'react';
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

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

7. You may receive `Hls` instance by calling `adapter.protocol`.

    ```javascript
    import { useEffect, useRef } from 'react';
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

    const Player = () => {
      const videoRef = useRef(null);
      const hlsRef = useRef(null);

      useEffect(() => {
        ...

        if (!hlsRef.current) {
          const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
            ...
          });
          hlsRef.current = adapter.protocol;
        }
      }, [videoRef]);

      ...

    };

    export default Player;
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
