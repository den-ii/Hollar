<template>
  <div class="mt-6 flex items-center justify-between">
    <input
      class="block w-[80%] border-2 shadow p-2 rounded-lg"
      type="text"
      name="search"
      id=""
      placeholder="Search"
    />
    <div>
      <button class="ml-2 bg-green-700 rounded-full w-[35px] h-[35px]">
        <i class="fa-solid fa-plus text-white"></i>
      </button>
      <button class="ml-2">
        <i class="fa-solid fa-phone-volume text-base text-lg"></i>
      </button>
      <button>
        <i class="fa-regular fa-ellipsis-stroke text-base"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
