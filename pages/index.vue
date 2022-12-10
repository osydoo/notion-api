<template>
  <div class="wrapper">
    <div class="banner">
      <iframe
        width="1200"
        height="600"
        src="https://www.youtube.com/embed/btc-Wj9QGO8?autoplay=1"
        autoplay
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="advertise-main">광고 탭1</div>
    <div class="advertise-sub">광고 탭</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
});
</script>
<style scoped>
.banner {
  width: 1200px;
  margin: auto;
  display: block;
}
.advertise-main {
  height: 600px;
}
.advertise-sub {
  height: 600px;
}
</style>
