<template>
    <div>
        <video ref="video" class="video-js" style="width: 100%; maxWidth: 800px"></video>
    </div>
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
            player: null
        };
    },
    mounted() {
        const adapter = self.mlysdk.driver.extensions.VideojsHlsPlayerPlugin.create(this.$refs.video, this.options);
        this.player = adapter.player;
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
};
</script>
