<template>
  <form @submit.prevent="handleSubmit">
    <h1>Sign Up Here</h1>
    <div class="flex flex-col items-center justify-center">
      <div>
        <label for="">email</label>
        <input
          class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
          type="email"
          name="email"
          v-model="email"
          required
        />
      </div>
      <div>
        <label for="">password</label>
        <input
          class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
          type="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <button>Sign Up</button>
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

const email = ref("");
const password = ref("");
const error = ref(null);

const handleSubmit = async () => {
  try {
    await store.dispatch("signup", {
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (err) {
    error.value = err.message;
  }
};
</script>
