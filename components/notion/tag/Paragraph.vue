<template>
  <div class="paragraph-wrapper">
    <span
      v-for="(item, index) in content.paragraph.rich_text"
      :key="index"
      :style="pStyle(item.annotations)"
      :class="pClass(item.annotations)"
      >{{ item.plain_text }}</span
    >
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
          paragraph: {
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
    pStyle: (annotations: AnnotationResponse) => {
      return `${annotations.bold ? 'font-weight: bold' : ''}; ${
        annotations.italic ? 'font-style: italic' : ''
      }; text-decoration: ${annotations.strikethrough ? 'strikethrough' : ''} ${
        annotations.underline ? 'underline' : ''
      };
      ${annotations.color === 'default' ? '' : 'color: ' + annotations.color} 
      `;
    },
    pClass: (annotations: AnnotationResponse) => {
      return `${annotations.code ? 'code-style' : ''}`;
    },
  },
});
</script>
<style>
.paragraph-wrapper {
  caret-color: rgb(55, 53, 47);
  display: flex;
}
.paragraph-wrapper > span {
  max-width: 100%;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  white-space: pre-wrap;
}
.code-style {
  line-height: normal;
  background: rgba(135, 131, 120, 0.15);
  color: #eb5757;
  border-radius: 3px;
  font-size: 85%;
  padding: 0.2em 0.4em;
}
</style>
