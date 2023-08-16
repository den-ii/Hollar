<template>
  <span class="rounded-full cursor-pointer h-full rounded-br-lg pulse dark:hidden">
    <slot></slot>
  </span>
  <span class="rounded-full cursor-pointer hidden dark:inline darkpulse">
    <slot></slot>
  </span>
</template>
<script setup lang="ts"></script>
