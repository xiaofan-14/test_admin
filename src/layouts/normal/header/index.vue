<script setup>
import { Menu, BellDot, CircleUserRound } from 'lucide-vue-next';
import AppCard from '../../../components/common/AppCard.vue';

</script>

<template>
  <AppCard class="flex items-center px-12 border border-b-[#efeff5] dark:border-b-[#2d2d30]">
    <Menu />
    <!-- 面包屑导航 -->
    <!-- <AppTab class="w-0 flex-1 px-12" /> -->
    <div class="w-0 flex-1 px-12" />
    <span class="opacity-20">|</span>

    <div class="flex shrink-0 items-center px-1 text-18 gap-2">
      <BellDot />
      <BellDot />
      <!-- 用户头像 -->
      <!-- <UserAvatar /> -->
      <CircleUserRound />
    </div>
  </AppCard>
</template>
