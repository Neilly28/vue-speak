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
      <div class="flex items-center justify-evenly gap-8">
        <div class="flex items-center justify-center gap-4">
          <div>
            <p class="text-left text-sm text-slate-400">Trial from</p>
            <h3 class="text-left text-xl font-bold">
              EUR {{ teacher.price?.toFixed(2) }}
            </h3>
          </div>
          <img
            class="w-20"
            src="/klarna.png
          "
            alt=""
          />
        </div>

        <!-- TIME SELECTION -->
        <div class="flex items-center justify-center gap-4">
          <select
            v-model="selectedTime"
            class="cursor-pointer rounded-full border p-2"
          >
            <option value="">Check my availability</option>
            <option v-for="time in availableTimes" :key="time" :value="time">
              {{ time.formattedDateTime }}
            </option>
          </select>

          <button
            :disabled="!selectedTime"
            @click="bookClass"
            class="cursor-pointer rounded-full bg-cyan-200 px-4 py-2 font-bold text-cyan-800 transition-all hover:bg-cyan-300 disabled:bg-slate-400 disabled:text-slate-100"
          >
            Book a class
          </button>
        </div>
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
import { useRoute, useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHeart } from "@mdi/js";
import { useAuthStore } from "../store/auth";
import { useUserStore } from "../store/user";
import { useTeacherStore } from "../store/teachers";

// initialize values
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const teacherStore = useTeacherStore();
const favorite = ref(userStore.favorites.includes(route.params.id));
const teacher = ref({});
const userId = ref("");
const iconType = "mdi";
const iconPath = ref(mdiHeart);

const standardTimes = ref([
  { formattedDateTime: "Monday 16:45 PM" },
  { formattedDateTime: "Tuesday 9:30 AM" },
  { formattedDateTime: "Wednesday 1:00 PM" },
  { formattedDateTime: "Thursday 3:30 PM" },
  { formattedDateTime: "Friday 10:00 AM" },
  { formattedDateTime: "Saturday 2:15 PM" },
  { formattedDateTime: "Sunday 11:30 AM" },
]);

// Check if dummyTimes is already defined, otherwise generate the dummy times array
const selectedTime = ref("");
const bookedTimes = ref([]); // Store booked times
const availableTimes = ref([]);

// get user from localstorage
onMounted(async () => {
  authStore.initialize();
  userId.value = authStore.user.userId;

  // fetch selected teacher when component is mounted
  await teacherStore.fetchTeacherById(route.params.id);
  teacher.value = teacherStore.selectedTeacher;

  // Fetch booked times for the specific teacher and store them in the bookedTimes array
  bookedTimes.value = await fetchBookedTimes(route.params.id);

  // Calculate available times by filtering out booked times
  availableTimes.value = standardTimes.value.filter(
    (time) => !bookedTimes.value.includes(time.formattedDateTime)
  );
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
        selectedTime: selectedTime.value.formattedDateTime,
      }),
    });

    if (response.ok) {
      console.log("BOOKING SUCCCCESS");
      router.push("/user");
    } else {
      console.log("BOOKING FAIL");
    }
  } catch (error) {
    console.log(error);
  }
};

// fetch booked times
const fetchBookedTimes = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/bookings/teacher/${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log({ data });
      const bookedTimes = data.map((booking) => booking.date);
      console.log({ bookedTimes });
      return bookedTimes;
    } else {
      console.log("Failed to fetch booked times");
      return [];
    }
  } catch (error) {
    console.log("Error fetching booked times:", error);
    return [];
  }
};
</script>
