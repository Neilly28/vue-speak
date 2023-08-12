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

      <BookingCard
        :bookings="bookings"
        :handleCancelBooking="handleCancelBooking"
      />
    </div>

    <h1
      class="mb-4 mt-12 text-2xl font-bold"
      v-if="filteredTeachers.length > 0"
    >
      Book a class with one of your favorite teachers below! 💖
    </h1>
    <h1
      class="mb-4 mt-12 text-2xl font-bold"
      v-if="filteredTeachers.length === 0"
    >
      You don't have any favorite teachers yet 😔
    </h1>

    <TeacherCard :filteredTeachers="filteredTeachers" />
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
import TeacherCard from "@/components/TeacherCard.vue";
import BookingCard from "@/components/BookingCard.vue";

// refs
const username = ref("");
const filteredTeachers = ref([]);
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
      filteredTeachers.value = favoriteStore.favorites;
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
