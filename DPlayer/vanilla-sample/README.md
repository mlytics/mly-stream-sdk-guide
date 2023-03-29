# Quick Start | Integrate SDK to DPlayer.js via browser

1. Install `DPlayer`.

    ```html
    <script src="https://jsdelivr.fusioncdn.com/npm/dplayer@1.26.0/dist/DPlayer.min.js"></script>
    ```

2. Install `config`, `driver` and `dplayer-hls` plugin.

    ```html
    <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
    <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
    <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/dplayer-hls.min.js"></script>
    ```

3. Call `mlysdk.driver.initialize()` first.

    ```javascript
    const driver = mlysdk.driver.initialize();
    ```

4. Call `driver.extensions.DPlayerHlsPlayerPlugin.create()` to build a **player adapter**.  
   Passing the arguments like you normally would on creating `DPlayer` instance.  

    ```javascript
    const src = 'PLAYLIST_URL';

    const video = document.getElementById('video');
    const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
      container: video,
      autoplay: true,
      controls: true,
      video: {
          url: src,
      }
    });
    ```

5. You may receive `DPlayer` instance by calling `adapter.player`.

    ```javascript
    const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
      ...
    });
    const dp = adapter.player
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

[Full example](./index.html)
