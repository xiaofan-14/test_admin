<script setup>
import { Command, UserRound, Shield, Menu as MenuIcon, FileText, Settings, Database } from 'lucide-vue-next';
import { NMenu } from "naive-ui";
import { h, ref } from "vue";

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
        code: 'RoleManagement',
        label: '角色管理',
        type: 'MENU',
        path: '/system/roles',
        icon: () => h(Shield),
        order: 2,
        enable: true,
        show: true,
      },
      {
        code: 'MenuManagement',
        label: '菜单管理',
        type: 'MENU',
        path: '/system/menus',
        icon: () => h(MenuIcon),
        order: 3,
        enable: true,
        show: true,
      },
    ]
  },
  {
    code: 'PermissionManagement',
    label: '权限管理',
    type: 'MENU',
    icon: () => h(Shield),
    order: 2,
    enable: true,
    show: true,
    children: [
      {
        code: 'PermissionList',
        label: '权限列表',
        type: 'MENU',
        path: '/permission/list',
        icon: () => h(FileText),
        order: 1,
        enable: true,
        show: true,
      },
      {
        code: 'PermissionAssign',
        label: '权限分配',
        type: 'MENU',
        path: '/permission/assign',
        icon: () => h(Command),
        order: 2,
        enable: true,
        show: true,
      },
    ]
  },
  {
    code: 'LogManagement',
    label: '日志管理',
    type: 'MENU',
    icon: () => h(FileText),
    order: 3,
    enable: true,
    show: true,
    children: [
      {
        code: 'OperationLog',
        label: '操作日志',
        type: 'MENU',
        path: '/log/operation',
        icon: () => h(FileText),
        order: 1,
        enable: true,
        show: true,
      },
      {
        code: 'LoginLog',
        label: '登录日志',
        type: 'MENU',
        path: '/log/login',
        icon: () => h(Database),
        order: 2,
        enable: true,
        show: true,
      },
    ]
  },
  {
    code: 'SystemSettings',
    label: '系统设置',
    type: 'MENU',
    icon: () => h(Settings),
    order: 4,
    enable: true,
    show: true,
    children: [
      {
        code: 'BasicSettings',
        label: '基础设置',
        type: 'MENU',
        path: '/settings/basic',
        icon: () => h(Settings),
        order: 1,
        enable: true,
        show: true,
      },
      {
        code: 'SecuritySettings',
        label: '安全设置',
        type: 'MENU',
        path: '/settings/security',
        icon: () => h(Shield),
        order: 2,
        enable: true,
        show: true,
      },
    ]
  },
]

const collapsed = ref(false);
</script>

<template>
  <NMenu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
    key-field="code" children-field="children" icon-field="icon" />
</template>
