<template>
  <nav>
    <div
      class="mb-24 mt-12 flex items-center justify-between text-4xl font-bold sm:text-base"
    >
      <router-link
        class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
        to="/"
      >
        <!-- <Icon icon="ic:baseline-home" width="24" /> -->
        <img src="/logo.png" class="h-10 sm:h-12" alt="" />
        <!-- <span class="hidden sm:block">Home</span> -->
      </router-link>
      <!-- <router-link
        class="transition-all ease-in hover:text-cyan-400"
        to="/apply"
        >💪🏻Become A Teacher</router-link
      > -->

      <!-- FOR LOGGED OUT USERS -->
      <div class="flex items-center justify-evenly gap-12">
        <div class="flex items-center justify-evenly gap-12" v-if="!user">
          <router-link
            class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
            to="/login"
          >
            <Icon icon="ic:baseline-person" width="24" />
            <span class="hidden sm:block">Login</span></router-link
          >
          <router-link
            class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
            to="/signup"
          >
            <Icon icon="ic:baseline-person-add-alt-1" width="24" />
            <span class="hidden sm:block">Sign Up</span></router-link
          >
        </div>

        <!-- FOR LOGGED IN USERS -->
        <div class="flex items-center justify-evenly gap-12" v-else>
          <router-link
            class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
            to="/user"
          >
            <Icon icon="ic:baseline-account-circle" width="24" />
            <span class="hidden items-center justify-center gap-2 sm:block">
              Hello, {{ user.username }}</span
            >
          </router-link>
          <button
            class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
            @click="handleLogout"
          >
            <Icon icon="ic:outline-person-remove-alt-1" width="24" />
            <span class="hidden items-center justify-center gap-2 sm:block"
              >Logout</span
            >
          </button>
        </div>

        <!-- GitHub -->
        <a
          class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
          href="https://github.com/Neilly28/vue-speak"
          target="_blank"
          ><svg-icon type="mdi" :path="path" width="24" />
          <span class="hidden sm:block">GitHub</span>
        </a>
      </div>
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

import { Icon } from "@iconify/vue";

const user = ref("");
const router = useRouter();

// import store
import { useAuthStore } from "../store/auth";

// initialize instance
const authStore = useAuthStore();

// get user from localstorage
onMounted(async () => {
  await authStore.user;
  user.value = authStore.user;
});

// logout
const handleLogout = () => {
  authStore.logout();
  if (!authStore.error) {
    router.push("/login");
  } else {
    router.push("/error");
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
