<template>
  <div class="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
    <div v-for="teacher in filteredTeachers" :key="teacher._id">
      <router-link
        :to="{
          name: 'TeacherDetails',
          params: { id: teacher._id },
          props: { teacher },
        }"
        class="group flex h-80 cursor-pointer flex-col items-start justify-evenly gap-4 rounded-3xl bg-white p-6 shadow-md transition-all duration-300 ease-in-out sm:hover:scale-105"
      >
        <div class="flex gap-4">
          <img class="w-24 rounded-full" :src="teacher.image" alt="" />
          <div class="flex flex-col items-start justify-center text-left">
            <h2 class="text-2xl font-bold">{{ teacher.name }}</h2>
            <h2 class="text-xs text-slate-400">
              {{
                teacher.professional
                  ? "Professional Teacher ✅"
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
        <div class="flex w-full items-center justify-between gap-4">
          <div>
            <p class="text-left text-sm text-slate-400">Trial from</p>
            <h3 class="text-left text-xl font-bold">
              EUR {{ teacher.price.toFixed(2) }}
            </h3>
          </div>

          <button
            class="cursor-pointer rounded-full bg-cyan-200 px-4 py-2 font-bold text-cyan-800 opacity-100 duration-300 ease-in-out hover:bg-cyan-300 sm:opacity-0 sm:group-hover:opacity-100"
          >
            Book a class
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filteredTeachers"],
};
</script>

<style lang="scss" scoped></style>
