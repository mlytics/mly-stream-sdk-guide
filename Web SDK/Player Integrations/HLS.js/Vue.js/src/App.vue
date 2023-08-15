<template>
  <Player :options="videoOptions" />
</template>

<script>
import Player from './components/Player.vue';

import Hls from '@mlytics/lib-hls.js';
import {driver, HlsjsHlsPlugin} from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';


HlsjsHlsPlugin.register(Hls);

export default {
    name: 'App',
    components: {
        Player
    },
    setup() {
        driver.initialize();
    },
    data() {
        return {
            videoOptions: {
                sourceUrl: 'https://1001642588942-cloudfront-z6frgspx.d-apm.com/hls/5ec5f77c-ba77-4054-af5a-90431f7e9904.mp4/5ec5f77c-ba77-4054-af5a-90431f7e9904.m3u8'
            }
        };
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
