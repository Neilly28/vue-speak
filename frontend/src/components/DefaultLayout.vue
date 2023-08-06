<template>
  <div class="m-auto mb-24 max-w-5xl font-secondary">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
</script>
