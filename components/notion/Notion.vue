<template>
  <div class="notion-wrapper">
    <component :is="tag" :content="content"></component>
    <Notion v-for="item in child" :key="item.id" :content="item"> </Notion>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client';
import { ENotionBlockType } from './type/notion';
import Paragraph from './tag/Paragraph.vue';
import Header1 from './tag/Heading1.vue';
import Header2 from './tag/Heading2.vue';
import Header3 from './tag/Heading3.vue';
import BlockImage from './tag/BlockImage.vue';
import Todo from './tag/Todo.vue';
import Quote from './tag/Quote.vue';
import Divider from './tag/Divider.vue';
import Ul from './tag/Ul.vue';
import Ol from './tag/Ol.vue';
import Code from './tag/Code.vue';
import Callout from './tag/Callout.vue';
import Video from './tag/Video.vue';

export default Vue.extend({
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          id: '',
          type: 'div',
          has_children: false,
          child: [{}],
        };
      },
    },
  },
  data: function () {
    return {
      block: {},
      child: [],
    };
  },
  async fetch({ error }) {
    // 자식 재귀 호출을 위한 코드
    // 미완성... 왜 안돌지
    console.log('fetch 동작');
    if (this.content.has_children) {
      try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const notion = new Client({
          auth: process.env.NOTION_KEY,
        });
        const response = await notion.blocks.children.list({
          block_id: this.content.id,
          page_size: 50,
        });
        this.child = response.results;
        console.log('fetch 동작', this.child);
      } catch (e) {
        error({
          statusCode: 503,
          message: 'API 요청이 실패했습니다 다시 시도해 주세요',
        });
      }
    }
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
        case ENotionBlockType.toDo: {
          return Todo;
        }
        case ENotionBlockType.bulletedListItem: {
          return Ul;
        }
        case ENotionBlockType.callout: {
          return Callout;
        }
        case ENotionBlockType.numberedListItem: {
          // numbering을 매기고 싶은데 해당 방법이 명확하지 않음
          return Ol;
        }
        case ENotionBlockType.quote: {
          return Quote;
        }
        case ENotionBlockType.image: {
          console.log(this.content);
          return BlockImage;
        }
        case ENotionBlockType.code: {
          // code styling 필요
          return Code;
        }
        case ENotionBlockType.divider: {
          return Divider;
        }
        case ENotionBlockType.video: {
          return Video;
        }
        case ENotionBlockType.table: {
          return 'table';
        }
        case ENotionBlockType.column: {
          return 'tr';
        }
        case ENotionBlockType.syncedBlock: {
          return 'div';
        }
        case ENotionBlockType.template: {
          return 'div';
        }
        case ENotionBlockType.toggle: {
          return 'div';
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
