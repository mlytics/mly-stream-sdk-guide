import React, {useEffect, useState} from 'react';

import DPlayer from 'dplayer';

import {driver, DPlayerHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

import './App.css';
import Player from './components/Player';

DPlayerHlsPlugin.register(DPlayer);

function App() {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        driver.initialize();
        setOptions({
            autoplay: true,
            video: {
                url: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8'
            },
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {options ? <Player options={options} /> : null}
            </header>
        </div>
    );
}

export default App;
