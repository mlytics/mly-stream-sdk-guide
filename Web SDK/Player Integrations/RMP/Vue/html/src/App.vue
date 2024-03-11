<template>
    <Player :options="this.$data" />
</template>

<script>
import Player from './components/Player.vue';

export default {
    name: 'App',
    components: {
        Player
    },
    beforeMount() {
        self.mlysdk.driver.initialize();
    },
    data() {
        return {
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
