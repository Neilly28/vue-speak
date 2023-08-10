import { defineStore } from "pinia";
import axios from "axios";
import { BASE_URL } from "../../config/api";

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
        const response = await axios.get(`${BASE_URL}/teachers`);

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
        const token = localStorage.getItem("token");
        console.log({ token });

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await axios.get(`${BASE_URL}/teachers/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
        const token = localStorage.getItem("token");
        console.log({ token });

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await axios.get(
          `${BASE_URL}/bookings/teacher/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
        this.error = "An error occurred while fetching booked times.";
        this.isLoading = false;
        return [];
      }
    },

    async bookClass(teacherId, userId, selectedTime) {
      try {
        const token = localStorage.getItem("token");
        console.log({ token });

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await axios.post(`${BASE_URL}/bookings`, {
          teacherId,
          userId,
          selectedTime: selectedTime.formattedDateTime,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
