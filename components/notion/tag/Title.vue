<template>
  <div class="header-wrapper">
    <div>
      <div class="title-wrapper">
        <span
          v-for="(item, index) in content.title.title"
          :key="index"
          :style="pStyle(item.annotations)"
          :class="pClass(item.annotations)"
          >{{ item.plain_text }}</span
        >
      </div>

      <div class="created">
        <div class="user">
          {{ user.name }}
        </div>

        <div class="created-time">
          {{ dateToYYYYMMDD(content['Created time'].created_time) }}
        </div>
      </div>

      <div class="tags">
        <div
          v-for="(item, index) in content.Tags.multi_select"
          :key="index"
          :style="tagColor(item.color)"
          class="tag"
        >
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  AnnotationResponse,
  EColor,
  NOTION_COLOR,
  EBackgroundColor,
} from '../type/notion';

export default Vue.extend({
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          'Created time': {
            created_time: '',
          },
          title: {
            title: [
              {
                annotations: {
                  bold: false,
                },
                plain_text: 'Title',
              },
            ],
          },
          Tags: {
            type: 'multi_select',
            multi_select: [{}],
          },
        };
      },
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
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
    dateToYYYYMMDD: (date: string) => {
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth();
      const day = new Date(date).getDay();
      return `${year}년 ${month}월 ${day}일`;
    },
    tagColor: (color: NOTION_COLOR) => {
      return `background-color: ${EBackgroundColor[color]}; color: ${EColor[color]}`;
    },
  },
});
</script>
<style>
.header-wrapper {
  padding: 0 96px;
}

.header-wrapper > div {
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(55, 53, 47, 0.16);
}

.title-wrapper {
  display: flex;
  margin: 2em 0 4px 0;
  caret-color: rgb(55, 53, 47);
}

.title-wrapper > span {
  color: rgb(55, 53, 47);
  font-weight: 700;
  line-height: 1.2;
  font-size: 40px;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji',
    'Segoe UI Symbol';
  cursor: text;
  display: flex;
  align-items: center;
}

.created {
  margin-top: 30px;
  display: flex;
  gap: 20px;
}

.user {
  font-weight: 700;
}

.created-time {
  position: relative;
}

.created-time::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 2px;
  height: 2px;
  border: 1px solid rgb(55, 53, 47);
  position: absolute;
  left: -10px;
  top: 7px;
  border-radius: 100%;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-bottom: 2px;
  margin-top: 5px;
}

.tag {
  display: flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0px;
  height: 20px;
  border-radius: 3px;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 2px;
  font-size: 14px;
  line-height: 120%;
  color: rgb(93, 23, 21);
  margin: 0px 6px 6px 0px;
}

.tag > div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
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
