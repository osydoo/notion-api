<!-- <template>
  <div class="wrapper">
    <h3>{data.title}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Client } from '@notionhq/client';

export default Vue.extend({
  data: () => ({
    title: '',
    plainText: '',
  }),
  fetch: async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const notion = new Client({
      auth: process.env.NOTION_KEY,
    });
    const databaseId = '81b3bc52d2c34ed4a1e58869ec5d1a5c';
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'index',
          number: {
            equals: 1,
          },
        },
      });
      this.title = response.results[0].properties.body.title[0].text;
    } catch (error) {
      console.error(error);
    }
  },
  fetchOnServer: true,
});
</script>

<style></style> -->
