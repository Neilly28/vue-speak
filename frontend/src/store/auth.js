import { defineStore } from "pinia";
import axios from "axios";
import { BASE_URL } from "../../config/api";

export const useAuthStore = defineStore("auth", {
  // initial states
  state: () => ({
    user: null,
    error: null,
    isLoading: true,
  }),

  // actions
  actions: {
    async signUp(username, password) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
          username,
          password,
        });

        if (response.status !== 201) {
          this.isLoading = false;
          this.error = response.data.message;
        } else {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.user = response.data;
          this.isLoading = false;
          return response;
        }
      } catch (err) {
        console.error("Error signing up:", err);
        this.error = err.response.data.message;
        this.isLoading = false;
      }
    },

    async login(username, password) {
      this.isLoading = true;
      this.loginError = null;
      try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
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
