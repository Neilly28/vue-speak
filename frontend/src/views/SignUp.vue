<template>
  <form @submit.prevent="handleSignUp">
    <h1>Sign Up Here</h1>
    <div class="flex flex-col items-center justify-center">
      <div>
        <label for="username">username</label>
        <input
          class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
          type="text"
          id="username"
          name="username"
          v-model="username"
          required
        />
      </div>

      <div>
        <label for="password">password</label>
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
        class="cursor-pointer rounded-full bg-cyan-200 px-4 py-2 font-bold text-cyan-800 transition-all hover:bg-cyan-300 disabled:bg-slate-400 disabled:text-slate-100"
      >
        Sign Up
      </button>
      <div v-if="error" class="text-2xl text-red-500">{{ error }}</div>
    </div>
  </form>
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

const handleSignUp = async () => {
  try {
    await authStore.signUp(username.value, password.value);
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
