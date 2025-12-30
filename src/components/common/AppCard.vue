<script setup>
defineProps({
  bordered: Boolean,
})
</script>

<template>
  <div class="bg-white dark:bg-[#18181c]" :class="{ 'card-border': bordered }">
    <slot></slot>
  </div>
</template>

