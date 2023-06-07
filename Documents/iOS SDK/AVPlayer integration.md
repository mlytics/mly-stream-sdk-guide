# Integrate AVPlayer

## Installing MLYSDK

- **Installing with CocoaPods**  
  To install with CocoaPods, modify your Podfile to use frameworks by including use_frameworks! and then add the following pods to your Podfile:

```shell
pod 'MLYSDK',:git => 'https://github.com/mlytics/mly-stream-sdk-avplayer.git'
```

- **Installing with SwiftPM**
  1. In XCode click "File" > "Swift Packages" > "Add Package Dependency..."
  2. The package repository URL is <https://github.com/mlytics/mly-stream-sdk-avplayer.git>
  3. Click next.

## Initialize the driver for your AVPlayer instance

Get your `client_id` from the stream Code Snippet.

To initialize SDK, we need to call `MLYDriver.initialize` first. Here's an example showing how you could initialize SDK.

```swift
do {
    try MLYDriver.initialize { options in
        options.client.id = "{CLIENT_ID}" 
    }
} catch {
    print(error)
}
```
```objectivec
[MLYDriver initializeAndReturnError:  &error :^(MLYDriverOptions * option) {
  [[option client] setId:@"{CLIENT_ID}"];
}];
```

## Setup your AVPlayer And AVPlayerViewController

Create an AVPlayer instance and add it to your view controller's view.

```swift
var player = AVPlayer()
var playerViewController = {
    let controller = AVPlayerViewController()
    controller.showsPlaybackControls = true
    controller.view.translatesAutoresizingMaskIntoConstraints = false
    controller.view.backgroundColor = .darkGray
    controller.player = player
    return controller
}()
```
```objectivec
AVPlayer player = [[AVPlayer alloc] init];
AVPlayerViewController playerController = [AVPlayerViewController new];
playerController.showsPlaybackControls = true;
playerController.view.backgroundColor = UIColor.darkGrayColor;
playerController.player = player;
```

## Configure SDK Adapter

In order to use SDK to download the video, we need to configure the SDK Adapter by passing your `PlayerViewController` instance.  Here's an example showing how you could configure SDK Adapter.

```swift
var plugin = MLYAVPlayerPlugin()

plugin.adapt(playerViewController)
```
```objectivec
MLYAVPlayerPlugin plugin = [MLYAVPlayerPlugin alloc];

[plugin adapt:playerController];
```

## Start playing the media

To play the media, call the play() method on the AVPlayer instance.

```swift
let url = URL(string: "https://your.video.website.com/your_video.m3u8")!
let playerItem = AVPlayerItem(url: url)
player.replaceCurrentItem(with: playerItem)
player.play()
```
```objectivec
NSURL *url = [NSURL URLWithString:@"https://your.video.website.com/your_video.m3u8"];
AVPlayerItem *item = [AVPlayerItem playerItemWithURL:url];
[player replaceCurrentItemWithPlayerItem:item];
[player play];
```

## Full example

- Swift [Demo](https://github.com/mlytics/mly-stream-sdk-avplayer/tree/main/examples/swift-demo)
- Objective-C [Demo](https://github.com/mlytics/mly-stream-sdk-avplayer/tree/main/examples/objective-c-demo)
