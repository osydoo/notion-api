<template>
  <div>
    <div class="code-wrapper">
      <div
        v-for="(item, index) in content.code.rich_text"
        :key="'div-' + index"
        class="code"
      >
        <span
          :style="pStyle(item.annotations)"
          :class="pClass(item.annotations)"
          >{{ item.plain_text }}</span
        >
      </div>
    </div>
    <div class="caption">
      <span
        v-for="(item, index) in content.code.caption"
        :key="index"
        :style="pStyle(item.annotations)"
        :class="pClass(item.annotations)"
        >{{ item.plain_text }}</span
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
          code: {
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
.code-wrapper {
  flex-grow: 1;
  border-radius: 3px;
  text-align: left;
  position: relative;
  background: rgb(247, 246, 243);
  min-width: 0px;
  width: 100%;
}
.code {
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  font-family: SFMono-Regular, Menlo, Consolas, 'PT Mono', 'Liberation Mono',
    Courier, monospace;
  font-size: 85%;
  tab-size: 2;
  padding: 34px 16px 32px 32px;
  min-height: 1em;
  color: rgb(55, 53, 47);
  white-space: pre;
}
.code > span {
  line-height: 1.8;
}
.caption {
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  font-size: 14px;
  line-height: 1.4;
  color: rgba(55, 53, 47, 0.65);
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 2px;
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
