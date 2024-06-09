import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUpView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/UsersView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/competences",
    name: "competences",
    component: () => import("../views/CompetencesView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/announcements",
    name: "announcements",
    component: () => import("../views/AnnouncementesView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/sections",
    name: "sections",
    component: () => import("../views/SectionsView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("../views/CoursesView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/courses/:id",
    name: "courses-details",
    component: () => import("../views/CourseDetailsView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: '/:catchAll(.*)', // Redirigir a /home cualquier ruta no definida
    redirect: '/home'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
