<template>
    <div class="container">
        <b-card
            border-variant="dark"
            header="L5IT08 Web Design - Vue.js with Bootstrap"
        >
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
            <form @submit.prevent="register">
                <h2>Register</h2>
                <div class="form-floating">
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="name@example.com"
                        pattern="/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/"
                        required
                        @input="updateUsername"
                        v-model="email"
                    />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input
                        type="username"
                        class="form-control"
                        id="username"
                        placeholder="Username"
                        required
                        v-model="username"
                        :disabled="isUsernameDisabled"
                    />
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input
                        type="name"
                        class="form-control"
                        id="name"
                        placeholder="Name"
                        required
                        v-model="name"
                    />
                    <label for="floatingInput">First name</label>
                </div>
                <div class="form-floating">
                    <input
                        type="surname"
                        class="form-control"
                        id="surname"
                        placeholder="Surname"
                        required
                        v-model="surname"
                    />
                    <label for="floatingInput">Surname</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        pattern="/^[\d\w@-]{8,20}$/i"
                        required
                        v-model="password"
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit">Register</button>
            </form>
        </b-card>
    </div>
</template>
<script>
import firebase from 'firebase';
import Vue from 'vue';
import modal from '../components/Modal.vue';

export default {
    name: 'Register',
    data() {
        return {
            username: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            isUsernameDisabled: true,
            text: `For users that are not registered, a registration page which gatherers and validate the following information: (2.2, 2.3) 
            1) Unique username
            2) Unique email in the valid format
            3) Mandatory First name and Last name`,
        };
    },
    methods: {
        updateUsername() {
            this.username = this.email;
        },
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    //alert('Successfully registered! Please login.');
                    const modalComponent = new Vue(modal);
                    modalComponent.$mount();
                    modalComponent.showModal(
                        'Authentication',
                        'Successfully registered! Please login.'
                    );
                    const user = userCredential.user;
                    const uuid = user.uid;
                    console.log(uuid);
                    localStorage.setItem('uuid', this.email);
                    firebase
                        .firestore()
                        .collection('utenti')
                        .doc(this.email)
                        .set({
                            username: this.username,
                            name: this.name,
                            surname: this.surname,
                            email: this.email,
                            password: this.password,
                        })
                        .then(() => {
                            console.log(
                                'Documento "utenti" creato o aggiornato con successo.'
                            );
                        })
                        .catch((error) => {
                            console.error(
                                'Errore durante la creazione o  aggiornamento del documento "utenti":',
                                error
                            );
                        });

                    //this.$router.push('/');
                })
                .catch((error) => {
                    //alert(error.message);
                    const modalComponent = new Vue(modal);
                    modalComponent.$mount();
                    modalComponent.showModal(
                        'Authentication Fail',
                        error.message
                    );
                });
        },
    },
};
</script>
