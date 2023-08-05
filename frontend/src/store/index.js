import { createStore } from "vuex";

// firebase imports
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const store = createStore({
  // your initial state
  state: {
    user: null,
    authIsReady: false,
  },

  //   mutations are needed to update state
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setFavoriteTeachers(state, teachers) {
      state.user.favoriteTeachers = teachers;
    },
  },

  // actions are needed for async?
  actions: {
    async signup(context, { email, password }) {
      console.log("signup action run!");

      // async code
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("Could not complete signup!");
      }
    },

    async login(context, { email, password }) {
      console.log("login action run!");

      // async code
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("Could not complete login!");
      }
    },

    async logout(context) {
      console.log("logout action ran!");

      // async code
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

// export store
export default store;
