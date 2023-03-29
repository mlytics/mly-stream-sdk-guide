# Quick Start | Integrate SDK to DPlayer.js via react

1. Install `DPlayer`.

    ```bash
    npm install dplayer
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

4. To make `DPlayer` use HLS, call `DPlayerHlsPlugin.register()` from SDK module.

    ```javascript
    import DPlayer from 'dplayer';
    import { DPlayerHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

    DPlayerHlsPlugin.register(DPlayer);
    ```

5. When page is loading, call `driver.initialize()` first.

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

6. Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to create a **player adapter**.  
   Passing the arguments like you normally would on creating `DPlayer` instance.  

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

7. You may receive `DPlayer` instance by calling `adapter.player`.

    ```javascript
    import { useEffect, useRef } from 'react';

    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

    const Player = () => {
      const videoRef = useRef(null);
      const dpRef = useRef(null);

      useEffect(() => {
        ...
        
        if (!dpRef.current) {
          const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
            ...
          });
          dpRef.current = adapter.player;
        }
      }, [videoRef]);

      ...
    };

    export default Player;
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
