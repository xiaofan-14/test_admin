<script setup>
import { Command, UserRound, Shield, Menu as MenuIcon, FileText, Settings, Database } from 'lucide-vue-next';
import { NMenu } from "naive-ui";
import { h, ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const menuOptions = [
  {
    code: 'SystemManagement',
    label: '系统管理',
    type: 'MENU',
    icon: () => h(Command),
    order: 1,
    enable: true,
    show: true,
    children: [
      {
        code: 'UserManagement',
        label: '用户管理',
        type: 'MENU',
        path: '/system/users',
        icon: () => h(UserRound),
        order: 1,
        enable: true,
        show: true,
      },
      {
        code: 'MenuManagement',
        label: '分类管理',
        type: 'MENU',
        path: '/system/menus',
        icon: () => h(MenuIcon),
        order: 3,
        enable: true,
        show: true,
      },
    ]
  },
]

const collapsed = ref(false);

function handleMenuSelect(_, item) {
  if (item.path) {
    router.push({ path: item.path });
  }
}
</script>

<template>
  <NMenu @update:value="handleMenuSelect" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
    key-field="code" children-field="children" icon-field="icon" />
</template>
