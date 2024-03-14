import {useEffect, useRef} from 'react';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

const Player = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const {options} = props;

    useEffect(() => {
        if (!playerRef.current) {
            const adapter = driver.extensions.RadiantMPHlsPlayerPlugin.create(options);
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

    return <div ref={videoRef} id="video" style={{width: "100%", maxWidth: "800px"}} />;
};

export default Player;
