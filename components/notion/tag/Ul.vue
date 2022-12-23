<template>
  <div class="bulleted_list_item-wrapper">
    <div class="bulleted_list_item">
      <template v-for="(item, index) in content.bulleted_list_item.rich_text"
        ><a
          v-if="item.href !== null"
          :key="'a-' + index"
          :href="item.href"
          :style="pStyle(item.annotations)"
          :class="pClass(item.annotations) + 'link'"
          target="_blank"
          >{{ item.plain_text }}</a
        ><span
          v-else-if="isStyle(item.annotations)"
          :key="'span-' + index"
          :style="pStyle(item.annotations)"
          :class="pClass(item.annotations)"
          >{{ item.plain_text }}</span
        ><template v-else>{{ item.plain_text }}</template></template
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AnnotationResponse } from '../type/notion';

export default Vue.extend({
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          bulleted_list_item: {
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
  methods: {
    isStyle: (annotations: AnnotationResponse) => {
      for (const [, value] of Object.entries(annotations)) {
        if (value) return true;
      }
      return false;
    },
    pStyle: (annotations: AnnotationResponse) => {
      return `${annotations.bold ? 'font-weight: bold' : ''}; ${
        annotations.italic ? 'font-style: italic' : ''
      }; text-decoration: ${annotations.strikethrough ? 'strikethrough' : ''} ${
        annotations.underline ? 'underline' : ''
      };
          ${
            annotations.color === 'default' ? '' : 'color: ' + annotations.color
          }
          `;
    },
    pClass: (annotations: AnnotationResponse) => {
      return `${annotations.code ? 'code-style' : ''}`;
    },
  },
});
</script>
<style>
.bulleted_list_item-wrapper {
  display: flex;
  max-width: 100%;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  color: rgb(55, 53, 47);
  line-height: 1.5;
  pointer-events: none;
  position: relative;
}
.bulleted_list_item {
  margin-left: 18px;
}
.bulleted_list_item::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 5px;
  height: 5px;
  border: 3px solid rgb(55, 53, 47);
  position: absolute;
  left: 0;
  top: 14px;
  border-radius: 100%;
  margin-left: 4px;
}
.bulleted_list_item-wrapper > a {
  color: rgb(55, 53, 47);
}
.bulleted_list_item-wrapper > a,
.bulleted_list_item-wrapper > span .code-style {
  line-height: normal;
  background: rgba(135, 131, 120, 0.15);
  color: #eb5757;
  border-radius: 3px;
  font-size: 85%;
  padding: 0.2em 0.4em;
}
.link {
  border-bottom: 0.05em solid;
  border-color: rgba(55, 53, 47, 0.4);
  opacity: 0.7;
}
</style>
