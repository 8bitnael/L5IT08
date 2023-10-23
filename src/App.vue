<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="!isAuthenticated" to="/">Login</router-link> |
            <router-link v-if="!isAuthenticated" to="/register">Register</router-link> |
            <router-link v-if="isAuthenticated" to="/dashboard">Dashboard</router-link>
            <button v-if="isAuthenticated" @click="logout">Logout</button>
        </div>
        <router-view />
    </div>
</template>

<script>
import firebase from 'firebase';
import Vue from 'vue';
import modal from '../src/components/Modal.vue';

export default {
    data() {
        return {
            isAuthenticated: false,
        };
    },
    created() {
        // Controlla lo stato di autenticazione all'avvio dell'applicazione
        firebase.auth().onAuthStateChanged((user) => {
            this.isAuthenticated = user !== null;
        });
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    //alert('Successfully logged out');
                    const modalComponent = new Vue(modal);
                    modalComponent.$mount();
                    modalComponent.showModal(
                        'Authentication',
                        'Successfully logged out!'
                    );
                    localStorage.removeItem('uuid')
                    this.$router.push('/');
                })
                .catch((error) => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
    },
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

input {
    margin-right: 20px;
}
</style>
