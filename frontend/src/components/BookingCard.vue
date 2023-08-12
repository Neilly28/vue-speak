<template>
  <div class="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
    <div
      v-for="booking in bookings"
      :key="booking._id"
      class="group flex h-80 flex-col items-start justify-evenly gap-4 rounded-3xl bg-white p-6 shadow-md"
    >
      <router-link
        :to="{
          name: 'TeacherDetails',
          params: { id: booking.teacher._id },
        }"
        class="flex gap-4"
      >
        <img class="w-24 rounded-full" :src="booking.teacher.image" />
        <div class="flex flex-col items-start justify-center text-left">
          <h2 class="text-2xl font-bold">{{ booking.teacher.name }}</h2>
          <h2 class="text-xs text-slate-400">
            {{
              booking.teacher.professional
                ? "Professional Teacher ✅"
                : "Community Tutor"
            }}
          </h2>
          <span
            class="mt-2 rounded-3xl border-transparent bg-cyan-200 px-2 py-1 text-xs font-semibold text-cyan-800"
            >{{ booking.teacher.language }}</span
          >
        </div>
      </router-link>

      <div>
        <p class="text-left text-sm">{{ booking.teacher.description }}</p>
      </div>
      <div class="flex w-full items-center justify-between">
        <div>
          <p class="text-left text-sm text-slate-400">Upcoming class</p>
          <h3 class="text-left text-base font-bold">
            <h1>{{ booking.date }}</h1>
          </h3>
        </div>

        <button
          @click="handleCancelBooking(booking._id)"
          class="cursor-pointer rounded-full bg-red-400 px-4 py-2 font-bold text-white opacity-0 duration-300 ease-in-out hover:bg-red-500 group-hover:opacity-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bookings", "handleCancelBooking"],
};
</script>

<style lang="scss" scoped></style>
