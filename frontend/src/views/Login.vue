<template>
  <form @submit.prevent="handleLogin">
    <h1>Login Here</h1>
    <div class="flex flex-col items-center justify-center">
      <div>
        <label for="">username</label>
        <input
          class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
          type="username"
          name="username"
          v-model="username"
          required
        />
      </div>
      <div>
        <label for="">password</label>
        <input
          class="cursor-pointer rounded-full bg-slate-100 px-4 py-2"
          type="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <button>Login</button>
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

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value);
    if (!authStore.loginError) {
      router.push("/");
    } else {
      console.error("error!");
      error.value = authStore.loginError;
    }
  } catch (err) {
    console.error(err);
    error.value = authStore.loginError;
  }
};
</script>
