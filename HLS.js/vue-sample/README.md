# Quick Start | Integrate SDK to HLS.js via vue

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
    <template>
      <Player/>
    </template>

    <script>
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

    import Player from './components/Player.vue';

    export default {
      name: 'App',
      components: {
        Player
      },
      setup() {
        driver.initialize();
      }
    };
    </script>
    ```

6. Call `driver.extensions.HlsjsHlsPlayerPlugin.create()` to create a **player adapter**.  

    ```javascript
    <template>
      <video id="video" ref="videoRef" controls autoplay width=800 />
    </template>

    <script>
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

    export default {
      name: 'Player',
      data() {
        return {
          hls: null,
        };
      },
      mounted() {
        const src = 'PLAYLIST_URL';
        const video = this.$refs.videoRef;

        const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
          url: src,
          element: video
        });
      },
      beforeUnmount() {
        if (this.hls) {
          this.hls.destroy();
        }
      },
    };
    </script>
    ```

7. You may receive `Hls` instance by calling `adapter.protocol`.

    ```javascript
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

    export default {
      ...

      mounted() {
        ...

        const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
          ...
        });
        this.hls = adapter.protocol;
      },
      
      ...
      
    };
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
