import {useEffect, useState} from 'react';

import {driver, RadiantMPHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/rmp/streaming/hls/bundle';

import './App.css';
import Player from './components/Player';

RadiantMPHlsPlugin.register(window.RadiantMP);

const App = () => {
    const [options, setOptions] = useState(null);
    useEffect(() => {
        driver.initialize();
        setOptions({
            elementID: 'video',
            playerOptions: {
                src: {
                    hls: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8'
                },
                licenseKey: '{LICENSE_KEY}',
                autoplay: true,
                width: 640,
                height: 360
            }
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {options ? <Player options={options} /> : null}
            </header>
        </div>
    );
};

export default App;
