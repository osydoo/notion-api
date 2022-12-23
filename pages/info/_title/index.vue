<template>
  <div class="wrapper">
    <Title :content="properties" :user="user"></Title>
    <Notion v-for="(item, index) in results" :key="item.id" :content="item">
      {{ index + 1 }}
    </Notion>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client';
import Notion from '../../../components/notion/Notion.vue';
import Title from '~/components/notion/tag/Title.vue';

export default Vue.extend({
  components: { Notion, Title },
  async asyncData({ error, route }) {
    if (process.server) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const notion = new Client({
        auth: process.env.NOTION_KEY,
      });
      const databaseId = process.env.NOTION_DATABASE_LIST_ID;
      const title = route.params.title;
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: 'title',
            title: {
              equals: title,
            },
          },
        });
        console.log(response.results[0].properties.Tags);
        const pageId = response.results[0].id;
        const block = await notion.blocks.children.list({
          block_id: pageId,
        });
        const user = await notion.users.retrieve({
          user_id: response.results[0].created_by.id,
        });
        return {
          properties: response.results[0].properties,
          results: block.results,
          user,
        };
      } catch (e) {
        error({
          statusCode: 503,
          message: 'API 요청이 실패했습니다 다시 시도해 주세요',
        });
      }
    }
  },
  data: () => ({
    title: {},
    results: [],
    params: {
      infoIndex: '',
    },
  }),
  methods: {},
});
</script>

<style></style>
