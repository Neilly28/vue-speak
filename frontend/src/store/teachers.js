import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teachers", {
  // initial state
  state: () => ({
    teachers: [],
    selectedTeacher: null,
    error: null,
    isLoading: false,
  }),

  // actions
  actions: {
    async fetchTeachers() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("http://localhost:5000/api/teachers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          this.isLoading = false;
          this.error = data.message;
        } else {
          this.teachers = data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
        this.error = "An error occurred while fetching teachers.";
        this.isLoading = false;
      }
    },

    async fetchTeacherById(teacherId) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(
          `http://localhost:5000/api/teachers/${teacherId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          this.isLoading = false;
          this.error = data.message;
        } else {
          this.selectedTeacher = data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error fetching selected teacher", err);
        this.error = "An error occurred while fetching teacher.";
        this.isLoading = false;
      }
    },
  },
});
