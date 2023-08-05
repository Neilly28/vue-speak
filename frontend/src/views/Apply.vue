<template>
  <div>
    <div class="text-center">
      <h1 class="text-4xl font-bold mt-12 mb-4">
        Do you want to become a teacher on SpeakVue?
      </h1>
      <p class="text-lg mb-12">
        Complete the teacher application below. Once you are accepted, students
        will be able to find you!
      </p>
    </div>
    <div>
      <form
        class="w-96 m-auto flex flex-col items-center justify-evenly shadow-md px-6 pt-12 pb-6 text-center rounded-3xl bg-white"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-col gap-6 justify-center">
          <div class="flex flex-col text-left gap-2">
            <label for="">Name</label>
            <input
              class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
              type="text"
              required
              placeholder="John Doe"
              v-model="teacher.name"
            />
          </div>
          <div class="flex flex-col text-left gap-2">
            <label for="">E-mail</label>
            <input
              class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
              type="email"
              required
              placeholder="johndoe@email.com"
              v-model="teacher.email"
            />
          </div>
          <div class="flex flex-col text-left gap-2">
            <label for="">Hourly rate in EUR</label>
            <input
              class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer w-24"
              type="number"
              required
              placeholder="9.99"
              v-model="teacher.price"
            />
          </div>
          <div class="flex flex-col text-left gap-2">
            <label for="">What language would you want to teach?</label>
            <select
              class="bg-slate-100 px-4 py-2 rounded-full cursor-pointer w-48"
              required
              name=""
              id=""
              v-model="teacher.language"
            >
              <option value="German">German</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>

        <button
          class="mt-12 border-transparent px-4 py-1 rounded-3xl font-semibold text-cyan-800 bg-cyan-200 hover:bg-cyan-400 transition-all"
        >
          Submit Application
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router/router";

const teacher = ref({
  name: "",
  email: "",
  description: "",
  language: "",
  price: "",
});

const handleSubmit = async () => {
  try {
    const response = await axios.post("http://localhost:3000/teachers", {
      name: teacher.value.name,
      description: teacher.value.description,
      language: teacher.value.language,
      price: teacher.value.price,
    });
    console.log({ response });
    if (response.status === 201) {
      router.push("/");
    }
  } catch (error) {
    console.error("Error adding restaurant:", error);
  }
};
</script>
