# Integrate ExoPlayer

## Installing MLYSDK

- Add the following line to the dependencies block in the build.gradle file:

```bash
dependencies {
    implementation 'com.mlytics.sdk.p2sp:mlysdk:0.2.0'
    implementation 'com.mlytics.sdk.p2sp:exoplayer:0.0.2'
    implementation "com.squareup.okhttp3:okhttp:4.12.0"
    implementation 'io.github.centrifugal:centrifuge-java:0.2.7'
    implementation 'com.google.android.exoplayer:exoplayer:2.19.1'
    implementation 'com.mux.stats.sdk.muxstats:MuxExoPlayer_r2_19_1:3.4.7'
}
```

## Install the Mux Data SDK

- Add the Mux Maven repository to your Gradle file:

```bash
repositories {
    maven {
        url "https://muxinc.jfrog.io/artifactory/default-maven-release-local"
    }
}
```

## Initialize the driver for your ExoPlayer instance

Get your `client_id` from the stream Code Snippet.

To initialize SDK, we need to call `MLYDriver.initialize` first. Here's an example showing how you could initialize SDK.

```kotlin
val clientId = "{CLIENT_ID}"
MLYDriver.initialize { options ->
    options.client.id = clientId
}
```
```java
String clientId = "{CLIENT_ID}";
MLYDriver.INSTANCE.initialize(new Function1<MLYDriverOptions, Unit>() {
  @Override
  public Unit invoke(MLYDriverOptions options) {
    options.getClient().setId(clientId);
    return null;
  }
});
```

## Build your ExoPlayer

To create an ExoPlayer instance, we need to call `MLYExoPlayer.builder`

```kotlin
playerView = findViewById<StyledPlayerView>(R.id.player_view)
var builder = MLYExoPlayer.builder(playerView!!)
val player = builder.build()
playerView?.player = player
```
```java
playerView = findViewById(R.id.player_view);
ExoPlayer.Builder builder = MLYExoPlayer.INSTANCE.builder(playerView);
ExoPlayer player = builder.build();
playerView.setPlayer(player);
```

## Start playing the media

To play the media, call the play() method on the ExoPlayer instance.

```kotlin
val url = "{PLAYLIST_URL}"
player.setMediaItem(MediaItem.fromUri(url))
```
```java
String url = "{PLAYLIST_URL}";
player.setMediaItem(MediaItem.fromUri(url));
```

## Full example

- Kotlin [Demo](https://github.com/mlytics/mly-stream-sdk-android-exoplayer/tree/main/examples/kotlin-player)
- Java [Demo](https://github.com/mlytics/mly-stream-sdk-android-exoplayer/tree/main/examples/java-player)
