# Overview

Mlytics Stream offers a client-side, high resilience, and maximum end-client performance video delivery solution on various of players supported HLS protocol.  
It is closely connected to Mlytics Multi-CDN technology to help you quickly implement a well-architected delivery infrastructure for your mission-critical business.

# Introduction SDK

Mlytics SDK is a software package based on the HLS protocol and built for HTML5 video players, providing additional Mlytics-specific functionality.

- ### Video streaming analysis
    Mlytics SDK collects metrics during video playback, and Mlytics portal will generate several charts relevant to video engagement, Quality of Service (QoS), and Quality of Experience (QoE) after streaming.

- ### In-stream CDN switching
    To enhance availability, Mlytics SDK switches CDNs for every resource download attempt using a customized CDN set. You can specify the CDN set by indicating your preferred CDN providers or assigning your own CDN, and set the priority of each CDN in Mlytics portal.  

    The switching algorithms will phase out underperformed CDNs based on the end-user's network environment, and this decision will persist until the page is refreshed.

- <h3>Peer-to-Peer (P2P) transmission <img src="https://raw.githubusercontent.com/mlytics/mly-stream-sdk-guide/uat/Web%20SDK/assets/introduction_p2p_transmission_beaker.png" /></h3>
    By utilizing Peer-to-Peer (P2P) transmission, every end-user has the opportunity to share loaded video manifests and segments with others watching the same video. This approach can decrease CDN traffic and ultimately reduce costs.  

    However, please note that P2P transmission is currently experimental.

In summary, traditional video players load manifests and segments through a single CDN.  
![Before using SDk](https://raw.githubusercontent.com/mlytics/mly-stream-sdk-guide/uat/Web%20SDK/assets/introduction_summary_without_sdk.png)  
After integrating the Mlytics SDK, video players can now load manifests and segments from multiple sources, reducing potential risks and costs.  
![After using SDk](https://raw.githubusercontent.com/mlytics/mly-stream-sdk-guide/uat/Web%20SDK/assets/introduction_summary_with_sdk.png)

# Compatibility

## Browser

The **fetch API** used for in-stream CDN switching and the **WebRTC API** used for P2P transmission are both incorporated into the HTML5 standard and broadly supported by modern browsers.

| Feature                 | Chrome | Firefox | macOS Safari | iOS Safari | Edge | IE |
|:------------------------|:-------|:--------|:-------------|:-----------|:-----|:---|
| In-stream CDN switching | V      | V       | V            | V          | V    | V  |
| P2P transmission        | V      | V       | V            | V          | V    | X  |

## Video players

Mlytics SDK currently supports several well-known video players. For the best experience, we recommend using the following versions of each video player:

| Video Player | Supported Version       |
|:-------------|:------------------------|
| Video.js     | **v8.9.0** or **below** |
| hls.js       | **v1.5.7** or **below** |
| DPlayer      | **v1.27.1**             |

> ⚠️ IMPORTANT  
> Please note that Mlytics SDK adds functionality that solely affects video delivery. After initialization, you can obtain an instance of the video player, allowing you to customize your own video player as usual. This includes **styling**, **adding plugins for advertisements or other purposes**, **modifying video player configurations**, and more.
> 
> Take `video.js`, for instance. If you used to initialize `video.js` like this:
> 
> ```html
> <video id="my-player"></video>
> <script>
>     const player = videojs("my-player", {
>         muted: true,
>         liveui: true,
>         autoplay: true,
>         controls: true,
>         preload: "auto",
>         aspectRatio: "16:9",
>         sources: [{
>             src: "https://vsp-stream.s3.ap-northeast-1.amazonaws.com/HLS/raw/SpaceX.m3u8",
>             type: "application/vnd.apple.mpegurl"
>         }],
>         playbackRates: [0.25, 0.5, 1.0, 1.5, 2.0]
>     });
> </script>
> ```
> 
> When using Mlytics SDK, you can pass the same options and obtain the `video.js` instance by calling `.player` after initialization:
> 
> ```html
> <video id="my-player"></video>
> <script>
>     const driver = mlysdk.driver.initialize();
>     const player = driver.extensions.VideojsHlsPlayerPlugin.create("my-player", {
>         muted: true,
>         liveui: true,
>         autoplay: true,
>         controls: true,
>         preload: "auto",
>         aspectRatio: "16:9",
>         sources: [{
>             src: "https://vsp-stream.s3.ap-northeast-1.amazonaws.com/HLS/raw/SpaceX.m3u8",
>             type: "application/vnd.apple.mpegurl"
>         }],
>         playbackRates: [0.25, 0.5, 1.0, 1.5, 2.0]
>     }).player;
> </script>
> ```
> 
> See more information about integration with `video.js` [here](./web-player-videojs-vanilla).

## Progressive Web App (PWA)

Mlytics SDK is compatible with the two most popular Progressive Web App (PWA) development tools: `React` and `Vue.js`. However, please note that installing Mlytics SDK via npm might not provide a satisfactory experience when using frameworks derived from the aforementioned PWA development tools. Therefore, we recommend including the Mlytics SDK using static script tags in `public/index.html` instead.

# Q&A

### Q: How to verified whether Mlytics SDK is working or not?
#### A: Please open the Developer Tools in your browser, switch to the Network panel, and filter the request using with `Fetch/XHR` tag to locate the needed request.
![How to switch to Network panel](https://raw.githubusercontent.com/mlytics/mly-stream-sdk-guide/uat/Web%20SDK/assets/qa_devtool_network_panel.png)
#### You may observe that manifests and segments were downloaded through different domains. Requests made by Mlytics SDK will be followed by an additional query string called `via_mlysdk`.
![Example when using SDK](https://raw.githubusercontent.com/mlytics/mly-stream-sdk-guide/uat/Web%20SDK/assets/qa_mlysdk_cdn_switching_demo.png)

### Q: How can I tell the version of Mlytics SDK I'm using?
#### A: Mlytics SDK provides an interface to check the version you're using. Open the Developer Tools in your browser, switch to the Console panel, and type `driver.settings.software.version`. Alternatively, you can call it within a script block and print out the version.
![How to check mlytics sdk version](https://raw.githubusercontent.com/mlytics/mly-stream-sdk-guide/uat/Web%20SDK/assets/qa_mlysdk_version_checking.png)
