<template>
  <div class="wrapper">
    <h3>글 목록</h3>
    <ul>
      <li v-for="(item, index) in results" :key="item.properties.index.id">
        {{ index + 1 }}. {{ item.properties.body.title[0].plain_text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client';

export default Vue.extend({
  asyncData: async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const notion = new Client({
      auth: 'secret_7WjZu6v5c1iDab3U4B4LCg8yg46p3vEDXRV4AqYt1Nm',
    });
    const databaseId = '81b3bc52d2c34ed4a1e58869ec5d1a5c';
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
      return { results: response.results };
    } catch (error) {
      console.error(error);
    }
  },
  data: () => ({
    results: [],
  }),
  fetchOnServer: true,
});
</script>

<style></style>
