<template>
  <nav>
    <div
      class="mb-24 mt-12 flex items-center justify-between text-4xl font-bold sm:text-base"
    >
      <router-link class="transition-all ease-in hover:text-cyan-400" to="/"
        >🏡
        <span class="hidden sm:block">Home</span>
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
            class="transition-all ease-in hover:text-cyan-400"
            to="/login"
            >😊 <span class="hidden sm:block">Login</span></router-link
          >
          <router-link
            class="transition-all ease-in hover:text-cyan-400"
            to="/signup"
            >👋🏻 <span class="hidden sm:block">Sign Up</span></router-link
          >
        </div>

        <!-- FOR LOGGED IN USERS -->
        <div class="flex items-center justify-evenly gap-12" v-else>
          <router-link
            class="transition-all ease-in hover:text-cyan-400"
            to="/user"
            >👋🏻 <span class="hidden sm:block"> Hello, {{ user.username }}</span>
          </router-link>
          <button
            class="transition-all ease-in hover:text-cyan-400"
            @click="handleLogout"
          >
            🥲 <span class="hidden sm:block">Logout</span>
          </button>
        </div>

        <!-- GitHub -->
        <a
          class="flex items-center justify-center gap-2 transition-all ease-in hover:text-cyan-400"
          href="https://github.com/Neilly28/vue-speak"
          target="_blank"
          ><svg-icon type="mdi" :path="path" />
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
