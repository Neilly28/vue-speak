<template>
  <div>
    <div
      class="group m-auto flex max-w-2xl cursor-pointer flex-col items-start justify-around gap-6 rounded-3xl bg-white p-12 shadow-md"
    >
      <!-- PROFILE SECTION -->
      <div class="flex gap-6">
        <div class="flex flex-col items-center justify-center gap-2">
          <img class="w-24 rounded-full" :src="teacher.image" alt="" />
          <p class="text-sm text-slate-400">Visited a day ago</p>
        </div>
        <div class="flex flex-col items-start justify-center text-left">
          <h2 class="text-2xl font-bold">{{ teacher.name }}</h2>
          <h2 class="text-sm text-slate-400">
            {{
              teacher.professional ? "Professional Teacher" : "Community Tutor"
            }}
          </h2>
          <span
            class="mt-2 rounded-3xl border-transparent bg-cyan-200 px-2 py-1 text-xs font-semibold text-cyan-800"
            >{{ teacher.language }}</span
          >
        </div>
        <svg-icon
          :type="iconType"
          :path="iconPath"
          @click="toggleFavorite"
          :class="favorite ? 'text-red-400' : 'text-slate-400'"
        ></svg-icon>
      </div>
      <div>
        <p class="text-left text-sm">{{ teacher.description }}</p>
      </div>

      <!-- CTA SECTION -->
      <div class="flex items-center justify-evenly gap-4">
        <div>
          <p class="text-left text-sm text-slate-400">Trial from</p>
          <h3 class="text-left text-xl font-bold">
            EUR {{ teacher.price?.toFixed(2) }}
          </h3>
        </div>

        <!-- TIME SELECTION -->
        <select v-model="selectedTime" class="rounded-full border p-2">
          <option value="">Check my availability</option>
          <option v-for="time in dummyTimes" :key="time" :value="time">
            {{ time.formattedDate }}
          </option>
        </select>

        <button
          @click="bookClass"
          class="cursor-pointer rounded-full bg-red-500 px-4 py-2 font-bold text-white transition-all hover:bg-red-600"
        >
          Book a class
        </button>
        <!-- <button
          class="cursor-pointer rounded-full bg-slate-200 px-4 py-2 font-bold text-slate-800 transition-all hover:bg-slate-300"
        >
          Contact Teacher
        </button> -->
      </div>

      <!-- ABOUT SECTION -->
      <div>
        <h3 class="text-left text-xl font-bold">About Me</h3>
        <p>{{ teacher.about }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHeart } from "@mdi/js";
import { useAuthStore } from "../store/auth";
import { useUserStore } from "../store/user";
import { useTeacherStore } from "../store/teachers";

// initialize values
const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const teacherStore = useTeacherStore();
const favorite = ref(userStore.favorites.includes(route.params.id));
const teacher = ref({});
const userId = ref("");
const iconType = "mdi";
const iconPath = ref(mdiHeart);

// get user from localstorage
onMounted(() => {
  authStore.initialize();
  userId.value = authStore.user.userId;
});

// fetch selected teacher when component is mounted
onMounted(async () => {
  await teacherStore.fetchTeacherById(route.params.id);
  teacher.value = teacherStore.selectedTeacher;
});

// toggle favorite teachers
const toggleFavorite = async () => {
  try {
    // Toggle the favorite value locally
    favorite.value = !favorite.value;

    // if favorite, add to array else remove
    if (favorite.value) {
      userStore.addToFavorites(route.params.id);
    } else {
      userStore.removeFromFavorites(route.params.id);
    }

    // Send PUT request to update user's favorites in the backend
    await userStore.updateFavorites(userId.value);
  } catch (error) {
    console.log("Error updating favorites:", error);
  }
};

// booking functionality
const bookClass = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherId: route.params.id,
        userId: userId.value,
        selectedTime: selectedTime.value.formattedDate,
      }),
    });

    if (response.ok) {
      console.log("BOOKING SUCCCCESS");
    } else {
      console.log("BOOKING FAIL");
    }
  } catch (error) {
    console.log(error);
  }
};

const generateDummyTimes = () => {
  const times = [];

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const maxDays = 3;
  const maxSlotsPerDay = 3;

  for (let day = 0; day < maxDays; day++) {
    const currentDate = new Date(now);
    currentDate.setDate(now.getDate() + day);
    const currentDayOfWeek = weekdays[currentDate.getDay()];

    for (let slot = 0; slot < maxSlotsPerDay; slot++) {
      const time = new Date(currentDate);
      const hour = 8 + slot; // Starting from 8 AM
      time.setHours(hour);
      time.setMinutes(0);

      const formattedDate = `${currentDayOfWeek}, ${time.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;

      times.push({
        formattedDate: formattedDate,
      });
    }
  }

  return times;
};

// Initialize selectedTime with an empty string
const selectedTime = ref("");

// Check if dummyTimes is already defined, otherwise generate the dummy times array
const dummyTimes = ref(generateDummyTimes());
</script>
