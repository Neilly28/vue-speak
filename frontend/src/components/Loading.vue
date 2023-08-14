<template>
  <div class="m-auto mb-4 mt-72 text-center text-4xl font-bold">
    <!-- <h1 class="text-2xl font-bold">Loading</h1> -->
    <PulseLoader :color="'#A5F2F3'" />
  </div>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
</script>
