<template>
  <div class="video-wrapper">
    <iframe
      width="600"
      height="400"
      :src="content.video.external.url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="caption">
      <span
        v-for="(item, index) in content.video.caption"
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
          video: {
            caption: [
              {
                type: 'text',
                plain_text: '테스트 비디오 1',
              },
            ],
            file: {
              url: '',
            },
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
.video-wrapper {
  height: 100%;
  width: 100%;
}
.video-wrapper > img {
  display: block;
  object-fit: cover;
  border-radius: 1px;
  pointer-events: auto;
  width: 100%;
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
