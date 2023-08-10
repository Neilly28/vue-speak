import { defineStore } from "pinia";
import axios from "axios";
import { BASE_URL } from "../../config/api";

export const useBookingStore = defineStore("booking", {
  // initial states
  state: () => ({
    bookings: [],
    error: null,
    isLoading: true,
  }),

  // actions
  actions: {
    async fetchBookings(userId) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`${BASE_URL}/bookings/user/${userId}`);

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to fetch bookings.";
        } else {
          this.bookings = response.data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        this.error = err.response.data.message;
        this.isLoading = false;
      }
    },
  },
});
