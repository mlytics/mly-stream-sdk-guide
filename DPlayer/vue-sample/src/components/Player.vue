<template>
  <div id="video" ref="videoRef" style="width: 100%; maxWidth: 800px" />
</template>

<script>
import { driver } from '@mlytics/p2sp-sdk/driver/peripheral/player/dplayer/streaming/hls/bundle';

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
      dp: null
    };
  },
  async mounted() {
    const video = this.$refs.videoRef;

    const adapter = driver.extensions.DPlayerHlsPlayerPlugin.create({
      container: video,
      ...this.options
    });

    this.dp = adapter.player;
  },
  async beforeUnmount() {
    if (this.dp) this.dp.destroy();
  }
};
</script>
