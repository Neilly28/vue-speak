// import { createStore } from "vuex";
// import axios from "axios";

// const store = createStore({
//   // your initial state
//   state: {
//     user: null,
//     authIsReady: false,
//   },

//   //   mutations are needed to update state
//   mutations: {
//     setUser(state, payload) {
//       state.user = payload;
//       console.log("user state changed:", state.user);
//     },
//     setAuthIsReady(state, payload) {
//       state.authIsReady = payload;
//     },
//   },

//   // actions are needed for async?
//   actions: {
//     async signUp(context, { username, password }) {
//       try {
//         console.log("signup action run!");
//         const response = await axios.post(
//           `http://localhost:5000/api/auth/signup`,
//           { username, password }
//         );
//         if (response) {
//           console.log("RESPONSEIBLE", response.user);
//           context.commit("setUser", response.user);
//         } else {
//           throw new Error("Could not complete signup!");
//         }
//       } catch (error) {
//         console.error("Sign-up error:", error);
//         throw error;
//       }
//     },

//     async login(context, { username, password }) {
//       try {
//         console.log("signup action run!");
//         const response = await axios.post(
//           `http://localhost:5000/api/auth/login`,
//           { username, password }
//         );
//         if (response) {
//           context.commit("setUser", response.user);
//         } else {
//           throw new Error("Could not complete signup!");
//         }
//       } catch (error) {
//         console.error("Sign-up error:", error);
//         throw error;
//       }
//     },

//     async logout(context) {
//       console.log("logout action ran!");
//       context.commit("setUser", null);
//     },
//   },
// });

// const unsub = onAuthStateChanged(auth, (user) => {
//   store.commit("setAuthIsReady", true);
//   store.commit("setUser", user);
//   unsub();
// });

// // export store
// export default store;
