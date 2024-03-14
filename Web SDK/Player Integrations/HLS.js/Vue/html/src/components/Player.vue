<template>
    <video id="video" ref="videoRef" controls autoplay width=800 />
</template>

<script>
/* eslint-disable vue/multi-word-component-names */

export default {
    name: 'Player',
    props: {
        options: {
            type: Object
        }
    },
    data() {
        return {
            hls: null
        };
    },
    async mounted() {
        const video = this.$refs.videoRef;
        const {sourceUrl} = this.options;
        const adapter = self.mlysdk.driver.extensions.HlsjsHlsPlayerPlugin.create({
            url: sourceUrl,
            element: video
        });
        this.hls = adapter.protocol;
    },
    async beforeUnmount() {
        if (this.hls) {
            this.hls.destroy();
        }
    }
};
</script>
