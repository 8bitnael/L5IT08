<template>
    <div class="container">
        <b-card
            border-variant="dark"
            header="L5IT08 Web Design - Vue.js with Bootstrap">
            <div class="accordion" role="tablist">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-2" role="tab">
                        <b-button
                            block
                            v-b-toggle.accordion-1
                            variant="outline-primary"
                            >Task 2 - Create dynamic web pages</b-button
                        >
                    </b-card-header>
                    <b-collapse
                        id="accordion-1"
                        visible
                        accordion="my-accordion"
                        role="tabpanel"
                    >
                        <b-card-body>
                            <b-card-text>{{ text }}</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
            <form @submit.prevent="login">
                <h2>Login</h2>
                <div class="form-floating">
                    <input
                        type="email"
                        class="form-control"
                        id="username"
                        placeholder="Username/Email"
                        required
                        v-model="email"
                    />
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        v-model="password"
                        required
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit">Login</button>
            </form>
        </b-card>
    </div>
</template>

<script>
import firebase from 'firebase';
import Vue from 'vue';
import modal from '../components/Modal.vue'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            text: `A login page that prompt for username and password that are stored in a database (2.4)`,
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(userCredential => {
                    //alert('Successfully logged in');
                    const user = userCredential.user;
                    const uuid = user.uid; // Questo è l'ID univoco dell'utente
                    console.log(uuid);
                    const modalComponent = new Vue(modal);
                    modalComponent.$mount();
                    modalComponent.showModal('Authentication','Logged UUID: ' + uuid);
                    // Salva l'UUID nel localStorage
                    localStorage.setItem('uuid', this.email);
                    this.$router.push('/dashboard');
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
    },
};
</script>
