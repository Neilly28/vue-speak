<template>
  <div class="max-w-5xl m-auto mb-24 font-secondary">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
</script>
