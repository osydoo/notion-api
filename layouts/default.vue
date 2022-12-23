<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <a-layout-content class="header-content">
        <div class="logo">
          <a href="/">
            <NuxtLogo color="black" />
          </a>
        </div>

        <a-menu
          mode="horizontal"
          class="navigation"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <a href="/info">글</a>
          </a-menu-item>
        </a-menu>
      </a-layout-content>
    </a-layout-header>

    <a-layout-content class="body">
      <Nuxt />
    </a-layout-content>

    <a-layout-footer class="footer">
      <div class="footer-wrapper">
        <div>@damoa</div>
        <ul class="footer-list">
          <li><NuxtLink to="/info">이용약관</NuxtLink></li>
          <li><NuxtLink to="/info">개인정보 처리방침</NuxtLink></li>
          <li><NuxtLink to="/info">사이트맵</NuxtLink></li>
        </ul>
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import '~/assets/styles/reset.css';
export default defineComponent({
  setup() {
    return {
      selectedKeys: ref<string[]>(['2']),
    };
  },
});
</script>
<style>
.layout {
  min-height: 100%;
  background-color: #fff;
  position: relative;
}

.header {
  display: block;
  background-color: #fff;
  border-bottom: 1px solid rgba(55, 53, 47, 0.16);
  padding-bottom: 65px;
}

.header-content {
  display: flex;
  width: 1200px;
  margin: auto;
}

.logo {
  width: 130px;
  line-height: 23px;
  margin: auto 0;
}

.logo > a {
  height: 23px;
  display: block;
}

.navigation {
  margin-left: 50px;
  background-color: rgba(0, 0, 0, 0);
}

.ant-menu-horizontal > .ant-menu-item:hover {
  color: rgb(55, 53, 47) !important;
  font-weight: 700 !important;
}

.body {
  margin: auto;
}
.footer {
  position: absolute;
  bottom: -160px;
  right: 0;
  left: 0;
  height: 160px;
  color: rgb(6, 11, 17);
}
.footer-wrapper {
  width: 1200px;
  margin: auto;
  display: flex;
  line-height: 112px;
}
.footer-list {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
.footer-list > li > a {
  color: rgb(6, 11, 17);
}
.footer-list > li > a:hover {
  opacity: 0.8;
}
</style>
