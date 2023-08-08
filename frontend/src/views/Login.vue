<template>
  <form @submit.prevent="handleSubmit">
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const error = ref(null);

const handleSubmit = async () => {
  try {
    await store.dispatch("login", {
      username: username.value,
      password: password.value,
    });
    console.log("after login dispatched");
    router.push("/");
  } catch (err) {
    error.value = err.response.data;
  }
};
</script>
