<template>
  <div>
    <div class="flex justify-between shadow p-2">
      <h1 class="font-Raleway text-lg font-semibold">Feeds</h1>
      <div class="flex gap-3">
        <router-link
          to="follows"
          class="font-Raleway bg-purple-50 p-1 rounded-lg min-w-[50px] text-center"
          >follows</router-link
        >
        <router-link
          to="top"
          class="font-Raleway bg-purple-50 p-1 rounded-lg min-w-[50px] text-center"
          >top</router-link
        >
        <router-link
          to="latest"
          class="font-Raleway bg-purple-50 p-1 rounded-lg min-w-[50px] text-center"
          >latest</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
