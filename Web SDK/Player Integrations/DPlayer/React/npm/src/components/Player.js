import {useEffect, useRef} from 'react';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

const Player = (props) => {
    const videoRef = useRef(null);
    const dpRef = useRef(null);
    const {options} = props;

    useEffect(() => {
        const video = videoRef.current;
        if (!dpRef.current) {
            const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
                container: video,
                ...options
            });
            dpRef.current = adapter.player;
        }
    }, [videoRef]);

    useEffect(() => {
        const dp = dpRef.current;
        return () => {
            if (dp) {
                dp.destroy();
                dpRef.current = null;
            }
        };
    }, [dpRef]);

    return (
        <div id="video" ref={videoRef} style={{width: "100%", maxWidth: "800px"}} />
    );
};

export default Player;
