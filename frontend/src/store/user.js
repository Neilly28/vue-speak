import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  // initial state
  state: () => ({
    user: null,
    favorites: [],
  }),

  // actions
  actions: {
    async fetchUser(userId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        this.user = response.data;
        this.favorites = response.data.favorites;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },

    async updateFavorites(userId) {
      try {
        await axios.put(
          `http://localhost:5000/api/user/update-favorites/${userId}`,
          {
            favorites: this.favorites,
          }
        );
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    },

    addToFavorites(teacherId) {
      if (!this.favorites.includes(teacherId)) {
        this.favorites.push(teacherId);
      }
    },

    removeFromFavorites(teacherId) {
      const index = this.favorites.indexOf(teacherId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
  },
});
