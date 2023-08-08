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
      <button type="submit">Sign Up</button>
      <div v-if="error">{{ error }}</div>
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
console.log(authStore);

const handleSignUp = async () => {
  try {
    await authStore.signUp(username.value, password.value);
    if (!authStore.signupError) {
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    error.value = authStore.signupError;
  }
};
</script>
