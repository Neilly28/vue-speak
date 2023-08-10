// import { defineStore } from "pinia";
// import axios from "axios";
// import { BASE_URL } from "../../config/api";

// export const useUserStore = defineStore("user", {
//   // initial state
//   state: () => ({
//     user: null,
//     favorites: [],
//     error: null,
//     isLoading: false,
//   }),

//   // actions
//   actions: {
//     async fetchUser(userId) {
//       this.isLoading = true;
//       this.error = null;

//       try {
//         const response = await axios.get(`${BASE_URL}/user/${userId}`);

//         if (response.status !== 200) {
//           this.isLoading = false;
//           this.error = "Failed to fetch user.";
//         } else {
//           this.user = response.data;
//           this.favorites = response.data.favorites;
//           this.isLoading = false;
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         this.error = "An error occurred while fetching user.";
//         this.isLoading = false;
//       }
//     },

//     async updateFavorites(userId) {
//       this.isLoading = true;
//       this.error = null;

//       try {
//         const response = await axios.put(
//           `${BASE_URL}/user/update-favorites/${userId}`,
//           {
//             favorites: this.favorites,
//           }
//         );

//         if (response.status !== 200) {
//           this.isLoading = false;
//           this.error = "Failed to update favorite teachers.";
//         } else {
//           return response;
//         }
//       } catch (err) {
//         console.error("Error updating favorites:", err);
//         this.error = "An error occurred while updating favorite teachers.";
//         this.isLoading = false;
//       }
//     },

//     addToFavorites(teacherId) {
//       if (!this.favorites.includes(teacherId)) {
//         this.favorites.push(teacherId);
//       }
//     },

//     removeFromFavorites(teacherId) {
//       const index = this.favorites.indexOf(teacherId);
//       if (index !== -1) {
//         this.favorites.splice(index, 1);
//       }
//     },
//   },
// });
