<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <a-layout-content class="header-content">
        <div class="logo">
          <NuxtLink to="/">
            <NuxtLogo color="white" />

            <!-- <img src="~assets/images/logo.svg" class="logo" /> -->
          </NuxtLink>
        </div>

        <a-menu
          mode="horizontal"
          class="navigation"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <NuxtLink to="/info">info</NuxtLink>
          </a-menu-item>

          <a-menu-item key="2">
            <NuxtLink to="/work">work</NuxtLink>
          </a-menu-item>

          <a-menu-item key="3">
            <NuxtLink to="/">what?</NuxtLink>
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
}

.header {
  display: block;
  background-color: rgba(150, 111, 51, 0.5);
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

.body {
  width: 1200px;
  margin: auto;
}
.footer {
  position: absolute;
  bottom: 0;
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
