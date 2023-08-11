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
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data));
          this.user = response.username;
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
      this.error = null;

      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          username,
          password,
        });

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = response.data.message;
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data));
          this.user = response.username;
          this.isLoading = false;
          return response;
        }
      } catch (err) {
        console.error("Error logging in:", err);
        this.error = err.response.data.message;
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("token");
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
