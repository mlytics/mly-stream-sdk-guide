import {useEffect, useRef} from 'react';

import {driver} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

const Player = (props) => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);

    useEffect(() => {
        const {sourceUrl} = props.options;
        const video = videoRef.current;
        if (!hlsRef.current) {
            const adapter = driver.extensions.HlsjsHlsPlayerPlugin.create({
                url: sourceUrl,
                element: video
            });
            hlsRef.current = adapter.protocol;
        }
    }, [videoRef]);

    useEffect(() => {
        const hls = hlsRef.current;
        return () => {
            if (hls) {
                hls.destroy();
                hlsRef.current = null;
            }
        };
    }, [hlsRef]);

    return (
        <video
            controls
            autoPlay
            ref={videoRef}

            width={800}
        />
    );
};

export default Player;
