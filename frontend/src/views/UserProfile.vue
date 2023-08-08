<template>
  <h1 class="mb-4 mt-12 text-2xl font-bold">
    Hey there,{{ user?.email }}, book a class with one of your favorite teachers
    below! 💖
  </h1>

  <div class="mt-12 grid grid-cols-3 gap-12">
    <div v-for="teacher in favoriteTeachers" :key="teacher.id">
      <router-link
        :to="{
          name: 'TeacherDetails',
          params: { id: teacher.id },
          props: { teacher },
        }"
        class="group flex h-80 cursor-pointer flex-col items-start justify-evenly gap-4 rounded-3xl bg-white p-6 shadow-md"
      >
        <div class="flex gap-4">
          <img class="w-24 rounded-full" :src="teacher.image" alt="" />
          <div class="flex flex-col items-start justify-center text-left">
            <h2 class="text-2xl font-bold">{{ teacher.name }}</h2>
            <h2 class="text-sm text-slate-400">
              {{
                teacher.professional
                  ? "Professional Teacher"
                  : "Community Tutor"
              }}
            </h2>
            <span
              class="mt-2 rounded-3xl border-transparent bg-cyan-200 px-2 py-1 text-xs font-semibold text-cyan-800"
              >{{ teacher.language }}</span
            >
          </div>
        </div>

        <div>
          <p class="text-left text-sm">{{ teacher.description }}</p>
        </div>
        <div class="flex items-center justify-evenly gap-4">
          <div>
            <p class="text-left text-sm text-slate-400">Trial from</p>
            <h3 class="text-left text-xl font-bold">
              EUR {{ teacher.price.toFixed(2) }}
            </h3>
          </div>

          <button
            class="cursor-pointer rounded-full bg-red-500 px-4 py-2 font-bold text-white opacity-0 duration-300 ease-in-out group-hover:opacity-100"
          >
            Book a class
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
