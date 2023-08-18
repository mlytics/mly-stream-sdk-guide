import {useEffect, useRef} from 'react';

import 'video.js/dist/video-js.css';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/videojs/streaming/hls/bundle';

const Player = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const {options} = props;

    useEffect(() => {
        const video = videoRef.current;
        if (!playerRef.current) {
            const adapter = driver.extensions.VideojsHlsPlayerPlugin.create(video, options);
            playerRef.current = adapter.player;
        } else {
            const player = playerRef.current;
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return <div data-vjs-player>
        <video ref={videoRef} className="video-js" style={{width: "100%", maxWidth: "800px"}} />
    </div>;
};
export default Player;
