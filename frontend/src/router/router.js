import DefaultLayout from "@/components/DefaultLayout.vue";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import UserProfile from "../views/UserProfile.vue";
import TeacherDetails from "../views/TeacherDetails.vue";
import Apply from "../views/Apply.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
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
      {
        path: "/apply",
        name: "Apply",
        component: Apply,
      },
      {
        path: "/user",
        name: "UserProfile",
        component: UserProfile,
      },
      {
        path: "/teacher/:id",
        name: "TeacherDetails",
        component: TeacherDetails,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
