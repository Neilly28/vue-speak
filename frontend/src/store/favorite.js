import { defineStore } from "pinia";
import axios from "axios";
import { BASE_URL } from "../../config/api";

export const useFavoriteStore = defineStore("favorite", {
  // initial states
  state: () => ({
    favorites: [],
    error: null,
    isLoading: true,
  }),

  // actions
  actions: {
    async fetchFavorites(userId) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(`${BASE_URL}/favorites/${userId}`);
        const data = response.data.map((teacher) => teacher.teacher);

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to fetch favorites.";
        } else {
          this.favorites = data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        this.error = err.response.data.message;
        this.isLoading = false;
      }
    },

    async toggleFavorite(userId, teacherId) {
      try {
        await axios.put(
          `${BASE_URL}/favorites/${userId}/toggleFavorite/${teacherId}`
        );
      } catch (err) {
        console.error("Error toggling favorite:", err);
      }
    },
  },
});
