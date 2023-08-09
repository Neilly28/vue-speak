<template>
  <h1 class="mb-4 mt-12 text-2xl font-bold" v-if="teachers.length > 0">
    Hey there, {{ username }} 👋🏻 Book a class with one of your favorite teachers
    below! 💖
  </h1>
  <h1 class="mb-4 mt-12 text-2xl font-bold" v-if="teachers.length === 0">
    Hey there, {{ username }} 👋🏻 You have not saved any teachers yet 😔
  </h1>

  <div class="mt-12 grid grid-cols-3 gap-12">
    <div v-for="teacher in teachers" :key="teacher.id">
      <router-link
        :to="{
          name: 'TeacherDetails',
          params: { id: teacher._id },
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
  <div>
    <h1>My Upcoming classes</h1>
    <div>Show my bookings below:</div>
    <div v-for="booking in bookings" :key="booking._id">
      <img :src="booking.teacher.image" alt="" />
      <h1>
        {{ booking.teacher.name }}
        {{ booking.date }}
      </h1>
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useUserStore } from "../store/user";
import { useTeacherStore } from "../store/teachers";

// refs
const username = ref("");
const userId = ref("");
const fetchedUser = ref(null);
const teachers = ref([]);
const bookings = ref([]);

// initialize instance
const authStore = useAuthStore();
const userStore = useUserStore();
const teacherStore = useTeacherStore();

// get user from localstorage
onMounted(async () => {
  authStore.initialize();
  username.value = authStore.user.username;
  userId.value = authStore.user.userId;
  await userStore.fetchUser(userId.value);
  fetchedUser.value = userStore.user;

  // Fetch details for each teacher
  await Promise.all(
    fetchedUser.value.favorites.map(async (teacherId) => {
      await teacherStore.fetchTeacherById(teacherId);
      teachers.value.push(teacherStore.selectedTeacher);
    })
  );

  // Fetch bookings for the user
  try {
    const response = await fetch(
      `http://localhost:5000/api/bookings/user/${userId.value}`
    );
    if (response.ok) {
      const data = await response.json();
      bookings.value = data;
    } else {
      console.log("Failed to fetch bookings");
    }
  } catch (error) {
    console.log("Error fetching bookings:", error);
  }
});
</script>
