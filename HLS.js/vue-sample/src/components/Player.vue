<template>
  <video id="video" ref="videoRef" controls autoplay width=800 />
</template>

<script>
import { HlsjsHlsPlugin } from '@mlytics/p2sp-sdk/driver/peripheral/player/hlsjs/streaming/hls/bundle';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
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
    const { sourceUrl } = this.options;
    this.hls = HlsjsHlsPlugin.create({
      sourceUrl: sourceUrl,
      mediaElement: video,
      playerConfig: {}
    });
  },
  async beforeUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
};
</script>
