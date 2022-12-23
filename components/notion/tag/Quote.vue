<template>
  <div class="quote-wrapper">
    <template v-for="(item, index) in content.quote.rich_text"
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
          quote: {
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
.quote-wrapper {
  max-width: 100%;
  min-height: 21px;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  white-space: pre-wrap;
  color: rgb(55, 53, 47);
  line-height: 1.5;
  border-left: 3px solid currentcolor;
  padding-left: 14px;
  padding-right: 14px;
  width: 100%;
  margin: 4px 0;
}
.quote-wrapper > a {
  color: rgb(55, 53, 47);
}
.code-style {
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
