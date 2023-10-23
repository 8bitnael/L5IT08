import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import firebase from 'firebase';
import modal from '../components/Modal.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import('../views/Register.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import(
                 '../views/Dashboard.vue'
            ),
        meta: {
            authRequired: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (firebase.auth().currentUser) {
            next();
        } else {
             // Mostra la modale
            const modalComponent = new Vue(modal);
            modalComponent.$mount();
            modalComponent.showModal('Authentication required','You must be logged in to see this page!');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});

export default router;
