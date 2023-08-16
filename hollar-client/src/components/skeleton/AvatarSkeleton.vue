<template>
  <div class="rounded-full pulse dark:hidden">
    <slot></slot>
  </div>
  <div class="hidden dark:block rounded-full darkpulse">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
