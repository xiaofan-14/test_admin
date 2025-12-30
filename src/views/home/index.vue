<script setup>
import AppPage from '../../components/common/AppPage.vue';
import { NCard, NAvatar } from 'naive-ui';

const userStore = {
  avatar: 'https://pb.isme.top/api/files/pbc_3446931122/hzqdz7z2g6ua1fs/67bd93db39a90_51kvnknu08.png',
  nickName: 'me',
  username: "me",
  currentRole: {
    name: 'admin'
  }
}

</script>

<template>
  <AppPage show-footer>
    <div class="flex">
      <NCard class="min-w-200 w-30%">
        <div class="flex items-center">
          <NAvatar round :size="60" :src="userStore.avatar" class="shrink-0" />
          <div class="ml-20 flex flex-col">
            <span class="text-20 opacity-80">
              Hello, {{ userStore.nickName ?? userStore.username }}
            </span>
            <span class="mt-4 opacity-50">当前角色：{{ userStore.currentRole?.name }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-60">
          一个人几乎可以在任何他怀有无限热忱的事情上成功。
        </p>
        <p class="mt-12 text-right text-12 opacity-40">
          —— 查尔斯·史考伯
        </p>
      </NCard>
    </div>
  </AppPage>
</template>
