import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  // initial states
  state: () => ({
    user: null,
    loginError: null,
    signupError: null,
    isLoading: true,
  }),

  // actions
  actions: {
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

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          this.user = data;
        } else {
          this.signupError = data.message;
        }
      } catch (error) {
        console.error("Sign up error:", error);
        this.signupError = "An error occurred during sign up.";
      } finally {
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

        if (response.ok && data.success) {
          localStorage.setItem("user", JSON.stringify(data));
          this.user = data;
        } else {
          this.loginError = data.error || "An error occurred during login.";
        }
      } catch (error) {
        console.error("Login error:", error);
        this.loginError = "An error occurred during login.";
      } finally {
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
