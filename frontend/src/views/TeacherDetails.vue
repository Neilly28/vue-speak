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

        <button
          class="cursor-pointer rounded-full bg-red-500 px-4 py-2 font-bold text-white transition-all hover:bg-red-600"
        >
          Book a class
        </button>
        <button
          class="cursor-pointer rounded-full bg-slate-200 px-4 py-2 font-bold text-slate-800 transition-all hover:bg-slate-300"
        >
          Contact Teacher
        </button>
      </div>

      <!-- ABOUT SECTION -->
      <div>
        <h3 class="text-left text-xl font-bold">About Me</h3>
        <p>{{ teacher.about }}</p>
      </div>
    </div>
    {{ id }}
  </div>
  <h1>{{ userId }}</h1>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const teacher = ref({});
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHeart } from "@mdi/js";

const iconType = "mdi";
const iconPath = ref(mdiHeart);
const favorite = ref(false);

const userId = ref("");

// import store
import { useAuthStore } from "../store/auth";

// initialize instance
const authStore = useAuthStore();
console.log(authStore);

// get user from localstorage
onMounted(() => {
  authStore.initialize();
  userId.value = authStore.user.userId;
});

const toggleFavorite = async () => {
  try {
    // Toggle the favorite value locally
    favorite.value = !favorite.value;

    // Get the current favorites array from the user's data
    const currentFavorites = authStore.favorites;

    // initilize updatedFavoritss
    let updatedFavorites;

    if (favorite.value) {
      // Check if the item is already in favorites
      if (!currentFavorites.includes(route.params.id)) {
        // Push the new favorite item if it's not already present
        updatedFavorites = [...currentFavorites, route.params.id];
      }
    } else {
      // Remove the favorite item if it's present
      updatedFavorites = currentFavorites.filter(
        (id) => id !== route.params.id
      );
    }

    // Send a PUT request to the backend
    const response = await axios.put(
      `http://localhost:5000/api/user/update-favorites/${userId.value}`,
      {
        favorites: updatedFavorites,
      }
    );

    // Update the favorites array directly in the store using the action
    authStore.updateFavorites(updatedFavorites);

    console.log({ response });
  } catch (error) {
    console.log(error);
  }
};

// import store
import { useTeacherStore } from "../store/teachers";
const teacherStore = useTeacherStore();

// fetch selected teacher when component is mounted
onMounted(async () => {
  await teacherStore.fetchTeacherById(route.params.id);
  teacher.value = teacherStore.selectedTeacher;
});
</script>

<style lang="scss" scoped></style>
