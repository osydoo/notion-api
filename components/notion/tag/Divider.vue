<template>
  <div class="divider-wrapper">
    <div></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          divider: {
            rich_text: [
              {
                annotations: {
                  bold: false,
                },
                plain_text: 'default text',
              },
            ],
          },
        };
      },
    },
  },
});
</script>
<style>
.divider-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  width: 100%;
  height: 13px;
  flex: 0 0 auto;
  color: rgba(55, 53, 47, 0.16);
}

.divider-wrapper > div {
  width: 100%;
  height: 1px;
  visibility: visible;
  border-bottom: 1px solid rgba(55, 53, 47, 0.16);
}
</style>
