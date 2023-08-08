import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  // initial states
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    isLoading: true,
    favorites: [],
  }),

  // actions
  actions: {
    async updateFavorites(updatedFavorites) {
      this.favorites = [...updatedFavorites];
    },

    async signUp(username, password) {
      this.isLoading = true;
      this.signupError = null;
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        console.log({ response });

        const data = await response.json();
        console.log({ data });

        if (!response.ok) {
          this.isLoading = false;
          this.signupError = data.message;
        }

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          this.user = data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Login error:", err);
        this.loginError = "An error occurred during login.";
        this.isLoading = false;
      }
    },

    async login(username, password) {
      this.isLoading = true;
      this.loginError = null;
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log({ data });

        if (!response.ok) {
          this.isLoading = false;
          this.loginError = data.message;
        }

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          this.user = data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Login error:", err);
        this.loginError = "An error occurred during login.";
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
    },

    initialize() {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        this.user = storedUser;
      }
      this.isLoading = false;
    },
  },
});
