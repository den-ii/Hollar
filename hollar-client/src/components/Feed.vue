<template>
  <div>
    <div class="flex justify-between shadow dark:shadow-barshadow p-2">
      <h1 class="font-bold text-lg">Feeds</h1>
      <div class="flex gap-3">
        <router-link
          to="follows"
          class="font-bold dark:text-darks bg-purple-200 p-1 rounded-lg min-w-[50px] text-center"
          >follows</router-link
        >
        <router-link
          to="top"
          class="bg-purple-100 font-semibold dark:text-darks p-1 rounded-lg min-w-[50px] text-center"
          >top</router-link
        >
        <router-link
          to="latest"
          class="bg-purple-100 font-semibold dark:text-darks p-1 rounded-lg min-w-[50px] text-center"
          >latest</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
