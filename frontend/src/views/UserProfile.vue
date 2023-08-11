<template>
  <Loading v-if="isLoading" />
  <template v-else>
    <div class="mb-24">
      <h1 class="mb-4 mt-12 text-2xl font-bold" v-if="bookings.length > 0">
        My Upcoming classes 😎
      </h1>
      <h1 class="mb-4 mt-12 text-2xl font-bold" v-if="bookings.length === 0">
        You don't have any upcoming classes 😔
      </h1>

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
    </div>

    <h1 class="mb-4 mt-12 text-2xl font-bold" v-if="teachers.length > 0">
      Book a class with one of your favorite teachers below! 💖
    </h1>
    <h1 class="mb-4 mt-12 text-2xl font-bold" v-if="teachers.length === 0">
      You don't have any favorite teachers yet 😔
    </h1>

    <div class="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
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
</template>

<script setup>
// imports
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useBookingStore } from "../store/booking";
import { useFavoriteStore } from "../store/favorite";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";

// refs
const username = ref("");
const teachers = ref([]);
const bookings = ref([]);
const isLoading = ref(true);

// initialize instance
const authStore = useAuthStore();
const bookingStore = useBookingStore();
const favoriteStore = useFavoriteStore();
const router = useRouter();

onMounted(async () => {
  username.value = authStore.user.username;

  try {
    const userIdValue = authStore.user.userId;

    await Promise.all([
      bookingStore.fetchBookings(userIdValue),
      favoriteStore.fetchFavorites(userIdValue),
    ]);

    if (!bookingStore.error && !favoriteStore.error) {
      bookings.value = bookingStore.bookings;
      teachers.value = favoriteStore.favorites;
    } else {
      console.error(
        "Error fetching bookings:",
        bookingStore.error,
        favoriteStore.error
      );
      router.push("/error");
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    router.push("/error");
  } finally {
    isLoading.value = false;
  }
});

const handleCancelBooking = async (bookingId) => {
  try {
    await bookingStore.deleteBooking(bookingId);
    if (!bookingStore.error) {
      bookings.value = bookings.value.filter(
        (booking) => booking._id !== bookingId
      );
    } else {
      console.error("Error cancelling booking:", bookingStore.error);
      router.push("/error");
    }
  } catch (err) {
    console.error("Error cancelling booking:", err);
    router.push("/error");
  }
};
</script>
