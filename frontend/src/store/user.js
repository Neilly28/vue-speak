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
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.user = data;
        this.favorites = data.favorites;
      } catch (err) {
        console.error("Error fetching user:", err);
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
        console.log("Error updating favorites:", error);
      }
    },

    async addToFavorites(teacherId) {
      if (!this.favorites.includes(teacherId)) {
        this.favorites.push(teacherId);
      }
    },

    async removeFromFavorites(teacherId) {
      const index = this.favorites.indexOf(teacherId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    },
  },
});
