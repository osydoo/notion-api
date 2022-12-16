<template>
  <div class="wrapper">
    <Notion v-for="(item, index) in results" :key="item.id" :content="item">
      {{ index + 1 }}
      <!-- {{ index + 1 }}. {{ item.paragraph?.rich_text[0]?.plain_text }} -->
    </Notion>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client';
import Notion from '~/components/notion/Notion.vue';

export default Vue.extend({
  components: { Notion },
  asyncData: async ({ route }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const notion = new Client({
      auth: process.env.NOTION_KEY,
    });
    const databaseId = '81b3bc52d2c34ed4a1e58869ec5d1a5c';
    const pageIndex = Number(route.params.infoIndex);
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'index',
          number: {
            equals: pageIndex,
          },
        },
      });
      const pageId = response.results[0].id;
      const block = await notion.blocks.children.list({
        block_id: pageId,
      });
      console.log(block.results);
      return {
        results: block.results,
      };
    } catch (error) {
      console.error(error);
    }
  },
  data: () => ({
    title: '',
    results: [],
    params: {
      infoIndex: '',
    },
  }),
});
</script>

<style></style>
