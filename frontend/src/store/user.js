import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // initial state
  state: () => ({
    user: null,
    favorites: [],
  }),

  // mutations
  // mutations: {
  //   setUser(newUser) {
  //     this.user = newUser;
  //   },

  //   updateUserFavorites(favorites) {
  //     if (this.user) {
  //       this.user.favorites = favorites;
  //     }
  //   },
  // },

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
