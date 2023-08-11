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
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
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
        meta: {
          needsAuth: true,
        },
      },
      {
        path: "/teacher/:id",
        name: "TeacherDetails",
        component: TeacherDetails,
        props: true,
        meta: {
          needsAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.initialize();

  const isAuthenticated = authStore.user;
  const requiresAuth = to.meta.needsAuth;

  if (
    (isAuthenticated && (to.name === "Login" || to.name === "SignUp")) ||
    (!isAuthenticated && requiresAuth)
  ) {
    next(isAuthenticated ? "/" : "/login");
  } else {
    next();
  }
});

export default router;
