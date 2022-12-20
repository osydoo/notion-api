<template>
  <div class="notion-wrapper">
    <component :is="tag" :content="content"></component>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ENotionBlockType } from './type/notion';
import Paragraph from './tag/Paragraph.vue';
import Header1 from './tag/Heading1.vue';
import Header2 from './tag/Heading2.vue';
import Header3 from './tag/Heading3.vue';
import BlockImage from './tag/BlockImage.vue';

export default Vue.extend({
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          type: 'div',
        };
      },
    },
  },
  data: function () {
    return {
      block: {},
    };
  },
  computed: {
    tag() {
      switch (this.content.type) {
        case ENotionBlockType.paragraph: {
          return Paragraph;
        }
        case ENotionBlockType.heading1: {
          return Header1;
        }
        case ENotionBlockType.heading2: {
          return Header2;
        }
        case ENotionBlockType.heading3: {
          return Header3;
        }
        case ENotionBlockType.bulletedListItem: {
          return 'ul';
        }
        case ENotionBlockType.callout: {
          return 'p';
        }
        case ENotionBlockType.column: {
          return 'tr';
        }
        case ENotionBlockType.numberedListItem: {
          return 'ol';
        }
        case ENotionBlockType.quote: {
          return 'p';
        }
        case ENotionBlockType.table: {
          return 'table';
        }
        case ENotionBlockType.syncedBlock: {
          return 'div';
        }
        case ENotionBlockType.template: {
          return 'div';
        }
        case ENotionBlockType.image: {
          return BlockImage;
        }
        default: {
          return 'div';
        }
      }
    },
  },
});
</script>
<style>
.notion-wrapper {
  width: 800px;
  padding: 0 96px;
}
</style>
