# Quick Start | Integrate SDK to HLS.js via browser

1. Install `hls.js`.

  ```html
  <script src="https://jsdelivr.fusioncdn.com/npm/hls.js@1.1.5"></script>
  ```

2. Install `config`, `driver` and `hlsjs-hls` plugin.

  ```html
    <script src="https://sdkjs.fusioncdn.com/{CLIENT_ID}-mlysdk.js"></script>
    <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/driver.min.js"></script>
    <script src="https://jsdelivr.fusioncdn.com/npm/@mlytics/p2sp-sdk@latest/bundle/peripheral/player/hlsjs-hls.min.js"></script>
  ```

3. Call `mlysdk.driver.initialize()` first.

  ```javascript
  const driver = mlysdk.driver.initialize();
  ```

4. call `driver.extensions.HlsjsHlsPlugin.create()` to prepare the Hls instance.

  ```html
  <body>
    <video id="video" controls muted autoplay width="600"></video>
  </body
  ```

  ```javascript
    var src = 'PLAYLIST_URL';
    var video = document.getElementById('video');

    const driver = mlysdk.driver.initialize();
    const plugin = driver.extensions.HlsjsHlsPlugin.create({
      sourceUrl: src,
      mediaElement: video,
      playerConfig: {} // hls.js config
    })
    const hls = plugin.player;
  ```

Now start the service and try to watch request logs in a browser. You could find that the domains in urls of `.m3u8` and `.ts` files, video player seeks for,  would be one of the cdn domains in stream settings rather than the origin domain.

[Full example](./index.html)
