<script setup>
import Layout from './layouts/normal/index.vue';
</script>

<template>
  <router-view>
    <template #default="{ Component }">
      <Layout>
        <component :is="Component" />
      </Layout>
    </template>
  </router-view>
</template>

<style scoped>
</style>
