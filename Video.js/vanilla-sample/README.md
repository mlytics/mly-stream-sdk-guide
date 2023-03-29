# Quick Start | Integrate SDK to Videojs via browser

1. Install `video.js`.

    ```html
    <script src="https://vjs.fusioncdn.com/7.21.4/video.min.js"></script>
    ```

2. Install `config`, `driver` and `videojs-hls` plugin.

    ```html
    <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
    <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
    <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/videojs-hls.min.js"></script>
    ```

3. Call `mlysdk.driver.initialize()` first.

    ```javascript
    const driver = mlysdk.driver.initialize();
    ```

4. Call `driver.extensions.VideojsHlsPlayerPlugin.create()` to build a **player adapter**.  
   Passing the arguments like you normally would on creating `videojs` instance.  

    ```javascript
    const src = '{PLAYLIST_URL}';

    const video = document.getElementById('video');
    const adapter = driver.extensions.VideojsHlsPlayerPlugin.create(video, {
      autoplay: true,
      controls: true,
      sources: [{
        src: src,
        type: 'application/vnd.apple.mpegurl'
      }]
    });
    ```

5. You may receive `videojs` instance by calling `adapter.player`.

    ```javascript
    const adapter = driver.extensions.VideojsHlsPlayerPlugin.create(video, {
      ...
    });

    const videojsPlayer = adapter.player;
    ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

[Full example](./index.html)
