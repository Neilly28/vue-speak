import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // initial state
  state: () => ({
    user: null,
  }),

  // mutations
  mutations: {
    setUser(newUser) {
      this.user = newUser;
    },

    updateUserFavorites(favorites) {
      if (this.user) {
        this.user.favorites = favorites;
      }
    },
  },

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

        if (!response.ok) {
          console.error("Error fetching user:", data.message);
        } else {
          this.setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    },
  },
});
