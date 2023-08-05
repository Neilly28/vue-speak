<template>
  <h1 class="text-2xl font-bold mt-12 mb-4">
    Hey there,{{ user?.email }}, book a class with one of your favorite teachers
    below! 💖
  </h1>

  <div class="grid grid-cols-3 gap-12 mt-12">
    <div v-for="teacher in favoriteTeachers" :key="teacher.id">
      <router-link
        :to="{
          name: 'TeacherDetails',
          params: { id: teacher.id },
          props: { teacher },
        }"
        class="group h-80 cursor-pointer flex flex-col items-start justify-evenly gap-4 shadow-md p-6 rounded-3xl bg-white"
      >
        <div class="flex gap-4">
          <img class="rounded-full w-24" :src="teacher.image" alt="" />
          <div class="text-left flex flex-col items-start justify-center">
            <h2 class="text-2xl font-bold">{{ teacher.name }}</h2>
            <h2 class="text-sm text-slate-400">
              {{
                teacher.professional
                  ? "Professional Teacher"
                  : "Community Tutor"
              }}
            </h2>
            <span
              class="mt-2 border-transparent px-2 py-1 rounded-3xl text-xs font-semibold text-cyan-800 bg-cyan-200"
              >{{ teacher.language }}</span
            >
          </div>
        </div>

        <div>
          <p class="text-sm text-left">{{ teacher.description }}</p>
        </div>
        <div class="flex items-center justify-evenly gap-4">
          <div>
            <p class="text-sm text-left text-slate-400">Trial from</p>
            <h3 class="font-bold text-xl text-left">
              EUR {{ teacher.price.toFixed(2) }}
            </h3>
          </div>

          <button
            class="bg-red-500 text-white font-bold px-4 py-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 ease-in-out duration-300"
          >
            Book a class
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const user = computed(() => store.state.user);

const favoriteTeachers =
  JSON.parse(localStorage.getItem("favoriteTeachers")) || [];
</script>
