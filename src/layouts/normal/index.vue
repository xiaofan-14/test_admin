<script setup>
import AppHeader from './header/index.vue'
import SideBar from './sidebar/index.vue'
</script>

<template>
  <div class="w-full h-full flex">
    <aside class="w-64 flex flex-col shrink-0 bg-white border border-r-[#efeff5] dark:bg-[#2d2d30]">
      <SideBar />
    </aside>

    <article class="flex flex-col flex-1">
      <AppHeader class="h-14 shrink-0" />
        <slot />
    </article>
  </div>
</template>




<style>
.collapsed {
  width: 64px;
}
</style>
