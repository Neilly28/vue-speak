<template>
  <div class="text-center">
    <h1 class="mb-4 mt-12 text-4xl font-bold">
      Do you want to become a teacher on SpeakVue?
    </h1>
    <p class="mb-12 text-lg">
      Complete the teacher application below. Once you are accepted, students
      will be able to find you!
    </p>
  </div>
  <div>
    <form
      @submit.prevent="handleLogin"
      class="m-auto flex w-80 flex-col items-center justify-evenly rounded-3xl bg-white pb-6 pt-12 text-center shadow-md"
    >
      <div class="flex flex-col justify-center gap-6">
        <div class="flex flex-col gap-2 text-left">
          <label for="username">Username</label>
          <input
            class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
            type="text"
            id="username"
            name="username"
            v-model="username"
            required
          />
        </div>

        <div class="flex flex-col gap-2 text-left">
          <label for="password">Password</label>
          <input
            class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="!username || !password || authStore.isLoading"
          class="m-auto mt-6 w-24 rounded-3xl border-transparent bg-cyan-200 px-4 py-1 font-semibold text-cyan-800 transition-all hover:bg-cyan-400 disabled:bg-slate-400 disabled:text-slate-100"
        >
          Login
        </button>
        <div class="flex h-12 flex-col items-center justify-around">
          <div v-if="error" class="text-sm text-red-500">
            {{ error }}
          </div>
          <router-link
            class="transition-all ease-in hover:text-cyan-400"
            to="/signup"
          >
            Don't have an account? Sign Up</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

// import store
import { useAuthStore } from "../store/auth";
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value);
    if (!authStore.error) {
      router.push("/");
    } else {
      console.error("Error during sign up:", authStore.error);
      error.value = authStore.error;
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    router.push("/error");
  }
};
</script>
