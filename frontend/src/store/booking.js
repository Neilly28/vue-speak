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
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await axios.get(
          `${BASE_URL}/bookings/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to fetch bookings.";
        } else {
          this.bookings = response.data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        this.error = err.message;
        this.isLoading = false;
      }
    },

    async deleteBooking(bookingId) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await axios.delete(
          `${BASE_URL}/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to cancel booking.";
        } else {
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error cancelling booking:", err);
        this.error = err.message;
        this.isLoading = false;
      }
    },
  },
});
