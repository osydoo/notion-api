<template>
  <div class="wrapper">
    <ul>
      <li
        v-for="item in results"
        :key="item.properties.id.formula.string"
        class="content-wrapper"
      >
        <a :href="`/info/${item.properties.title.title[0].plain_text}`">
          <div class="cover-wrapper">
            <img
              v-if="!!item.cover && item.cover.type === 'external'"
              :src="item.cover.external.url"
              class="cover"
            />
            <img
              v-if="!!item.cover && item.cover.type === 'file'"
              :src="item.cover.file.url"
              class="cover"
            />
          </div>

          <div class="title-wrapper">
            <h2 class="title">
              {{ item.properties.title.title[0].plain_text }}
            </h2>
          </div>
          <div class="tags">
            <div
              v-for="(tag, index) in item.properties.Tags.multi_select"
              :key="index"
              :style="tagColor(tag.color)"
              class="tag"
            >
              <div>
                {{ tag.name }}
              </div>
            </div>
          </div>
          <div class="created">
            <div class="created-date">
              {{ dateToYYYYMMDD(item.properties['Created time'].created_time) }}
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client';
import {
  EColor,
  NOTION_COLOR,
  EBackgroundColor,
} from '../../components/notion/type/notion';

export default Vue.extend({
  asyncData: async ({ error }) => {
    if (process.server) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const notion = new Client({
        auth: process.env.NOTION_KEY,
      });
      const databaseId = process.env.NOTION_DATABASE_LIST_ID;
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
          sorts: [
            {
              timestamp: 'created_time',
              direction: 'descending',
            },
          ],
        });
        console.log(response.results);
        return { results: response.results };
      } catch (e) {
        error({
          statusCode: 503,
          message: 'API 요청이 실패했습니다 다시 시도해 주세요',
        });
      }
    }
  },
  data: () => ({
    results: [],
  }),
  methods: {
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
.wrapper {
  padding: 30px 0;
}
.content-wrapper {
  border-bottom: 1px solid rgba(55, 53, 47, 0.16);
  margin-bottom: 50px;
  padding-bottom: 30px;
  color: rgb(55, 53, 47);
}
.cover-wrapper {
  overflow: hidden;
  height: 400px;
  border: 1px solid #ebeced;
}
.cover {
  width: 700px;
}

.title {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
}
.tags {
  margin-top: 20px;
}
.created {
  margin-top: 10px;
}
.created-date {
  color: #868e96;
}
</style>
