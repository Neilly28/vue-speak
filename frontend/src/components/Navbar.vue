<template>
  <nav>
    <div class="mb-24 mt-12 flex items-center justify-between font-bold">
      <!-- FOR ALL USERS -->
      <router-link class="transition-all ease-in hover:text-cyan-400" to="/"
        >🏡Home</router-link
      >
      <router-link
        class="transition-all ease-in hover:text-cyan-400"
        to="/apply"
        >💪🏻Become A Teacher</router-link
      >

      <!-- FOR LOGGED IN USERS -->
      <div v-if="user">
        <router-link
          class="transition-all ease-in hover:text-cyan-400"
          to="/user"
          >👋🏻Hello, {{ user.username }}</router-link
        >
      </div>

      <div v-if="user">
        <button
          class="transition-all ease-in hover:text-cyan-400"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>

      <!-- FOR LOGGED OUT USERS -->
      <div v-if="!user">
        <router-link
          class="transition-all ease-in hover:text-cyan-400"
          to="/login"
          >Login</router-link
        >
        <router-link
          class="transition-all ease-in hover:text-cyan-400"
          to="/signup"
          >Sign Up</router-link
        >
      </div>

      <!-- GitHub -->
      <a
        class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
        href="https://github.com/Neilly28/vue-restaurant"
        target="_blank"
        >GitHub<svg-icon type="mdi" :path="path"
      /></a>
    </div>
  </nav>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiGithub } from "@mdi/js";
const path = ref(mdiGithub);
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted, watch } from "vue";

const user = ref("");
const router = useRouter();

// import store
import { useAuthStore } from "../store/auth";

// initialize instance
const authStore = useAuthStore();
console.log(authStore);

// get user from localstorage
onMounted(() => {
  authStore.initialize();
  user.value = authStore.user;
});

// logout
const handleLogout = async () => {
  try {
    authStore.logout();
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};

// Watcher to update user state
watch(
  () => authStore.user,
  (newValue) => {
    user.value = newValue;
  }
);
</script>
