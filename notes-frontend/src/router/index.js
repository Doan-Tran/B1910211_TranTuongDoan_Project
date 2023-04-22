import { createWebHistory, createRouter } from "vue-router";
import NoteBook from "@/views/NoteBook.vue";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
    {
        path: "/",
        name: "notebook",
        component: NoteBook,
    },
    {
        path: "/notes/:id",
        name: "note.edit",
        component: () => import("@/views/NoteEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/notes/create",
        name: "note.add",
        component: () => import("@/views/NoteAdd.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/contacts",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/contacts/create",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;