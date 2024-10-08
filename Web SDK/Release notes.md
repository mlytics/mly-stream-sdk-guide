# Current release

## v0.17.0

New Features

1. Support Video.js version 8.9.0.

# Previous releases

## v0.16.2

Fixes and Improvements

1. Fix that HLS.js demux worker failure when SDK is compiled via the frontend tool Vite.
2. Optimize HLS.js configurations to use relative latency by default under regular latency.

## v0.16.1

Fixes and Improvements

1. Fix that viewer experience metrics are duplicately reported when the video source is not found.

## v0.16.0

New Features

1. Support the measurement of bandwidth in the regular SDK reports for each CDN.

Fixes and Improvements

1. Fix that viewer experience metrics are underestimated due to abnormal SDK startup.
2. Optimize the domain used to fetch configurations to reduce the chance of startup failure.

## v0.15.3

Fixes and Improvements

1. Fix that SDK does not stop requesting segments after player paused.

## v0.15.2

Fixes and Improvements

1. Fix that Video.js HLS quality selector crashed after source is changed.

## v0.15.1

New Features

1. Allow to adjust configs of HLS latency for each playback on client side.

## v0.15.0

New Features

1. Support SDK integration of new player Radiant Media Player(RMP) with HLS.
2. Allow to disable loader or monitor for each playback on client side.

Fixes and Improvements

1. HLS catch-up function is enabled by default even under regular latency. 

## v0.14.0

New Features

1. Support MCDN selection and P2P transmission on iOS Safari through Service Worker. Please see the deployment guide for Service Worker script.

Fixes and Improvements

1. Fix that LLHLS latency would permanently increase after the player moved from background to foreground.

## v0.13.1

New Features

1. Allow to disable monitor reporting on client side.

Fixes and Improvements

1. Fix that Webpack bundled SDK class name obfuscated cannot be executed correctly.

## v0.13.0

Breaking Changes

1. Deprecate old method of Video.js, HLS.js and DPlayer HLS integration which has been replaced since v0.9.0. Please see the latest guide for player integration.

Fixes and Improvements

1. Video playback on iOS Safari now works for Video.js, HLS.js and DPlayer HLS integration and would fetch files from origins normally.

## v0.12.0

Fixes and Improvements

1. Fix that SDK installation failure happened on Node.js 16 and higher.
2. Fix that original ABR algorithm in LLHLS mode cannot increase the video quality.
3. Fix that Video.js HLS rebuffering issue happened in the beginning of the video.

## v0.11.0

Breaking Changes

1. Support new method of HLS.js HLS integration and the old one will be deprecated in v0.13.0. Please see the latest guide for player integration.
2. Support new method of DPlayer HLS integration and the old one will be deprecated in v0.13.0. Please see the latest guide for player integration.

## v0.10.1

Fixes and Improvements

1. Optimize HTTP start delay according to segment durations.
2. Optimize HLS.js configurations when low latency mode is detected.

## v0.10.0

New Features

1. Support LLHLS protocol and pre-buffering of audio and video separation for Video.js HLS integration.

Fixes and Improvements

1. Live UI now works normally for Video.js HLS integration if the video is a live source.
2. Fail safe mechanism for Video.js HLS integration allows videos to play normally if driver initialization fails.

## v0.9.1

Breaking Changes

1. Support new method of Video.js HLS integration for Vue.js and React.js. Please see the latest guide for player integration.

## v0.9.0

Breaking Changes

1. Support new method of Video.js HLS integration and the old one will be deprecated in v0.13.0. Please see the latest guide for player integration.

Fixes and Improvements

1. Fix that file downloader retries too fast.

## v0.8.1

Fixes and Improvements

1. Fix that video rebuffering issue when playback reaches the end of media.
2. Fix that CDN used at the beginning might not be used again for a period of time.

## v0.8.0

New Features

1. Support auto and manual quality switching for Video.js HLS integration.

Fixes and Improvements

1. Reduce video startup time when P2P mode is enabled.
2. Improve fetching performance for short duration of HLS segment.

## v0.7.1

New Features

1. Add P2P metering report.
2. Allow to disable P2P mode on client side.
