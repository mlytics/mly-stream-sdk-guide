# Current release

## v0.11.0

New

1. Support new method of DPlayer HLS integration.
2. Support new method of HLS.js integration.

# Previous Releases

## v0.10.1

Fixes and Improvements

1. Optimize HTTP start delay according to segment durations.
2. Optimize HLS config when low latency mode is detected.

## v0.10.0

New

1. Support LLHLS protocol and pre-buffering of audio and video separation for Video.js HLS integration.

Fixes and Improvements

1. Live UI now works normally for Video.js HLS integration if the video is a live source.
2. Fail safe mechanism for Video.js HLS integration allows videos to play normally if driver initialization fails.

## v0.9.1

1. Support new method of Video.js HLS integration for Vue.js and React.js. Please see the MIGRATING guide after v0.9.0

## v0.9.0

Breaking changes

1. Support new method of Video.js HLS integration. The old one is deprecated now and will be removed in v0.11.0. Please see the MIGRATING guide after v0.9.0.

Fixes and Improvements

1. Fix that file downloader retries too fast.

## v0.8.1

Fixes and Improvements

1. Fix that video rebuffering issue when plackback reaches the of the media.
2. Fix that CDN used at the beginning might not be used again for a period of time.

## v0.8.0

New

1. Support auto and manual quality switching for Video.js HLS integration.

Fixes and Improvements

1. Reduce video startup time when P2P mode is enabled.
2. Improve fetching performance for short duration of HLS segment.

## v0.7.1

New

1. Add P2P metering report.
2. Allow disabling P2P mode on client side.