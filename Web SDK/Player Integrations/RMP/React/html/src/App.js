import {useEffect, useState} from 'react';

import './App.css';
import Player from './components/Player';

const App = () => {
    const [options, setOptions] = useState(null);
    useEffect(() => {
        self.mlysdk.driver.initialize();
        setOptions({
            elementID: 'video',
            playerOptions: {
                src: {
                    hls: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8'
                },
                licenseKey: '{YOUR_RMP_LICENSE_KEY}',
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
