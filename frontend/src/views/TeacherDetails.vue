<template>
  <Loading v-if="isLoading" />
  <div v-else>
    <div
      class="group m-auto flex max-w-2xl cursor-pointer flex-col items-start justify-around gap-6 rounded-3xl bg-white p-6 shadow-md sm:p-12"
    >
      <!-- PROFILE SECTION -->
      <div class="flex w-full justify-between gap-6">
        <div class="flex items-center justify-center gap-6">
          <div class="flex flex-col items-center justify-center gap-2">
            <img class="w-24 rounded-full" :src="teacher.image" alt="" />
            <p class="text-sm text-slate-400">Visited a day ago</p>
          </div>
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
          <svg-icon
            :type="iconType"
            :path="iconPath"
            @click="toggleFavorite"
            :class="isFavorite ? 'text-red-400' : 'text-slate-400'"
            class="h-8 w-8"
          ></svg-icon>
        </div>
      </div>
      <div>
        <p class="text-left text-base">{{ teacher.description }}</p>
      </div>

      <!-- CTA SECTION -->
      <div
        class="flex w-full flex-col items-center justify-between gap-8 sm:flex-row"
      >
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
        <div
          class="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
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
        <h3 class="text-left text-sm font-bold md:text-xl">About Me</h3>
        <p>{{ teacher.about }}</p>
      </div>
    </div>
    {{ error }}
  </div>
</template>

<script setup>
// imports
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHeart } from "@mdi/js";
import { useAuthStore } from "../store/auth";
import { useTeacherStore } from "../store/teachers";
import { useFavoriteStore } from "../store/favorite";
import Loading from "../components/Loading.vue";

// initialize values
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const teacherStore = useTeacherStore();
const favoriteStore = useFavoriteStore();

const isFavorite = ref(
  favoriteStore.favorites.map((item) => item._id).includes(route.params.id)
);

const teacher = ref({});
const userId = ref("");
const iconType = "mdi";
const iconPath = ref(mdiHeart);
const error = ref(null);
const isLoading = ref(true);

const standardTimes = ref([
  { formattedDateTime: "Monday 4:45 PM" },
  { formattedDateTime: "Tuesday 9:30 AM" },
  { formattedDateTime: "Wednesday 1:00 PM" },
  { formattedDateTime: "Thursday 3:30 PM" },
  { formattedDateTime: "Friday 10:00 AM" },
  { formattedDateTime: "Saturday 2:15 PM" },
  { formattedDateTime: "Sunday 11:30 AM" },
]);

// Check if dummyTimes is already defined, otherwise generate the dummy times array
const selectedTime = ref("");
const bookedTimes = ref([]);
const availableTimes = ref([]);

// get data from store
onMounted(async () => {
  try {
    userId.value = authStore.user.userId;

    // fetch selected teacher when component is mounted
    await teacherStore.fetchTeacherById(route.params.id);
    teacher.value = teacherStore.selectedTeacher;

    // Fetch booked times for the specific teacher and store them in the bookedTimes array
    bookedTimes.value = await teacherStore.fetchBookedTimes(route.params.id);

    // Calculate available times by filtering out booked times
    availableTimes.value = standardTimes.value.filter(
      (time) => !bookedTimes.value.includes(time.formattedDateTime)
    );
  } catch (error) {
    console.error("Error fetching teacher details:", error);
    router.push("/error");
  } finally {
    isLoading.value = false;
  }
});

// toggle favorite teachers

const toggleFavorite = async () => {
  // Immediately update the UI
  isFavorite.value = !isFavorite.value;

  // Make the asynchronous request to update the favorite status
  await favoriteStore
    .toggleFavorite(userId.value, teacher.value._id)
    .catch((error) => {
      // Handle the error if needed
      console.error("Error toggling favorite:", error);
      // Revert the UI update if the request fails
      isFavorite.value = !isFavorite.value;
    });
};

// booking functionality
const bookClass = async () => {
  const response = await teacherStore.bookClass(
    route.params.id,
    userId.value,
    selectedTime.value
  );

  if (!response) {
    router.push("/error");
  } else {
    router.push("/user");
  }
};
</script>
