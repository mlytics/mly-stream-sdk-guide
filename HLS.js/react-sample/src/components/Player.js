import { useEffect, useRef } from 'react';
import { HlsjsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

const Player = (props) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const hls = hlsRef.current;
    return () => {
      if (hls) {
        hls.destroyed();
      }
    }
  }, []);

  useEffect(() => {
    const { sourceUrl } = props.options;
    const video = videoRef.current;
    hlsRef.current = HlsjsHlsPlugin.create({
      sourceUrl: sourceUrl,
      mediaElement: video,
      playerConfig: {}
    });
  }, [videoRef]);

  return (
    <video
      controls
      autoPlay
      ref={videoRef}

      width={800}
    />
  );
}
export default Player;
