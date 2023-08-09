import { defineStore } from "pinia";
import axios from "axios";

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
        const response = await axios.get("http://localhost:5000/api/teachers");

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to fetch teachers.";
        } else {
          this.teachers = response.data;
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
        const response = await axios.get(
          `http://localhost:5000/api/teachers/${teacherId}`
        );

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to fetch selected teacher.";
        } else {
          this.selectedTeacher = response.data;
          this.isLoading = false;
        }
      } catch (err) {
        console.error("Error fetching selected teacher:", err);
        this.error = "An error occurred while fetching selected teacher.";
        this.isLoading = false;
      }
    },

    async fetchBookedTimes(teacherId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/teacher/${teacherId}`
        );

        if (response.status !== 200) {
          this.isLoading = false;
          this.error = "Failed to fetch booked times.";
          return [];
        } else {
          return response.data.map((booking) => booking.date);
        }
      } catch (err) {
        console.error("Error fetching booked times:", err);
        return [];
      }
    },

    async bookClass(teacherId, userId, selectedTime) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/bookings`,
          {
            teacherId,
            userId,
            selectedTime: selectedTime.formattedDateTime,
          }
        );
        console.log({ response });

        if (response.status !== 201) {
          this.isLoading = false;
          this.error = "Failed to book class.";
        } else {
          this.isLoading = false;
          return response;
        }
      } catch (err) {
        console.error("Error booking class:", err);
        this.error = "An error occurred while booking class.";
        this.isLoading = false;
      }
    },
  },
});
