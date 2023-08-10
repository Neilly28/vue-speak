import DefaultLayout from "@/components/DefaultLayout.vue";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import UserProfile from "../views/UserProfile.vue";
import TeacherDetails from "../views/TeacherDetails.vue";
// import Apply from "../views/Apply.vue";
import Error from "../views/Error.vue";
import { useAuthStore } from "@/store/auth";
import { createRouter, createWebHistory } from "vue-router";

const isLoggedIn = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.user) {
    next({ name: "Home" }); // Redirect to home page if user is already authenticated
  } else {
    next(); // Allow navigation to the login route
  }
};

const isNotLoggedIn = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    next({ name: "Home" }); // Redirect to home page if user is already authenticated
  } else {
    next(); // Allow navigation to the login route
  }
};

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/error",
        name: "Error",
        component: Error,
      },
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        beforeEnter: isLoggedIn,
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: isLoggedIn,
      },
      // {
      //   path: "/apply",
      //   name: "Apply",
      //   component: Apply,
      // },
      {
        path: "/user",
        name: "UserProfile",
        component: UserProfile,
        beforeEnter: isNotLoggedIn,
      },
      {
        path: "/teacher/:id",
        name: "TeacherDetails",
        component: TeacherDetails,
        props: true,
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.user) {
            next();
          } else {
            next({ name: "SignUp" });
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// In your router.js file
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.initialize(); // Call the initialize action before each route navigation
  next();
});

export default router;
