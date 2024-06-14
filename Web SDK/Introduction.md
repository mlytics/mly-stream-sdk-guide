# Overview

Mlytics Stream offers a client-side, high resilience, and maximum end-client performance video delivery solution on various of players supported HLS protocol.  
It is closely connected to Mlytics Multi-CDN technology to help you quickly implement a well-architected delivery infrastructure for your mission-critical business.

# Introduction SDK

Mlytics SDK is a software package based on HLS protocol and built on HTML5 players with additional Mlytics specific functionality.

- ### Video streaming analysis
    Mlytics SDK collects metrics during the video and Mlytics portal will generate several charts relevant to video engagement, QoS and QoE after streaming.

- ### In-stream CDN switching
    For the benefit of availability, Mlytics SDK switches CDN for every attempt of resource downloading with customized CDN set. You can specify the CDN set by setting which CDN provider you prefer to use or assigning your own CDN, and set the priority of each CDN in Mlytics portal.  
    The switching algorithms will phase out the CDN which has poorer performance based on end user's own network environment and the decision will last until the page is refreshed.

- ### P2P transmission (Experimental)
    By using P2P transmission, every end user stands a chance of sharing loaded video manifests and segments to those who is watching the same video so that CDN traffic can be decreased to reach the purpose of cost reducing.

In summary, video player used to load manifests and segments through single CDN.  
![Before using SDk](https://lh3.googleusercontent.com/d/1EFiEk5hPNbqYimFHXlJT9uUil8rPvF_6)  
After using Mlytics SDK, video player can now load manifests and segments through several sources to reduce the potential risks and the costs.  
![After using SDk](https://lh3.googleusercontent.com/d/1u5-FxCavfQvC-g_2rvhapFvCZelX6p6N)

# Compatibility

## Browser

Both **fetch API** used for in-stream CDN switching and **webRTC API** used for P2P transmission are incorporated into the HTML5 standard and broadly deployed in modern browsers.

| Feature                 | Chrome | Firefox | macOS Safari | iOS Safari | Edge | IE   |
| :---------------------- | :----- | :------ | :----------- | :--------- | :--- | :--- |
| In-stream CDN switching | V      | V       | V            | V          | V    | V    |
| P2P transmission        | V      | V       | V            | V          | V    | X    |

## Video players

Mlytics SDK currently supports several well-known video players. For the best experience, we suggest the version of each video player as following:

| Video Player | Supported Version       |
| :----------- | :---------------------- |
| Video.js     | **v8.9.0** or **below** |
| hls.js       | **v1.5.7** or **below** |
| DPlayer      | **v1.27.1**             |

> ⚠️ IMPORTANT  
> Please note that Mlytics SDK adds functionality which only affects video delivery, you may obtain the instance of video player after initialization so that you can customize your own video player as usual, such as **styling, adding plugins for advertisement or others, modifying video player configurations**, etc.
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
> When using Mlytics SDK, you can pass the same options and obtain `video.js` instance by calling `.player` after initialization:
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

## PWA

Although Mlytics SDK gets along with two most popular PWA development tools. One is `React`; the other is `Vue.js`. Please be aware that using frameworks, which is based from the PWA development tools asforesaid, might not be satisfactory.

# Q&A

### Q: How to verified whether Mlytics SDK is working or not?
#### A: Please open Devtools in your browser, switch to the Network panel and filter out the needed request with `Fetch/XHR` tag.
![How to switch to Network panel](https://lh3.googleusercontent.com/d/1Su8pvrnmU-y5aOkQTHVGU64IWD7x3pkJ)
#### You may observe that manifests and segments were downloaded through different domains. And for those requests which was made by Mlytics SDK will follow by an addition query string called `via_mlysdk`.
![Example when using SDK](https://lh3.googleusercontent.com/d/1oUqc4wr0F3VxFoYsBjgfjVRi5R-GoEj2)

### Q: How can I tell the version of Mlytics SDK I'm using?
#### A: There is a interface from Mlytics SDK tells which version are you using. Type `driver.settings.software.version` in **Devtools Console Panel** or call it in script block and print it out.
![How to check mlytics sdk version](https://lh3.googleusercontent.com/d/1aopXsJQGNl95tbdf7g2V0ZvPHhw9Oq61)
