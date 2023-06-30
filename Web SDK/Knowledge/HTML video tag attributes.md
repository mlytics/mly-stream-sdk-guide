**`<autoplay>`**:

A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.

**`<control>`**:

If this attribute is present, the browser will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback.

**`<preload>`**:

This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience regarding what content is loaded before the video is played. It may have one of the following values:

- none: Indicates that the video should not be preloaded.
- metadata: Indicates that only video metadata (e.g. length) is fetched.
- auto: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.
- empty string: Synonym of the auto value.
