# Quick Start | Integrate SDK to DPlayer.js via vue

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
    <template>
      <Player/>
    </template>

    <script>
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

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

6. Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to create a **player adapter**.  
   Passing the arguments like you normally would on creating `DPlayer` instance.  

    ```javascript
    <template>
      <div id="video" ref="videoRef" />
    </template>

    <script>
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

    export default {
      name: 'Player',
      data() {
        return {
          dp: null,
        };
      },
      mounted() {
        const src = 'PLAYLIST_URL';

        const video = this.$refs.videoRef;
        const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
          container: video,
          autoplay: true,
          video: {
            url: src
          }
        });
      },
      beforeUnmount() {
        if (this.dp) {
          this.dp.destroy();
        }
      }
    };
    </script>
    ```

7. You may receive `DPlayer` instance by calling `adapter.player`.

    ```javascript
    import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

    export default {
      ...
      
      mounted() {
        ...
        
        const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
          ...
        });
        this.dp = adapter.player;
      },

      ...
      
    };
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.
