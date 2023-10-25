<template>
  <div id="app">
    <div>
      <b-nav tabs align="center" id="custom-nav">
        <b-nav-item><router-link v-if="!isAuthenticated" to="/">LOGIN</router-link></b-nav-item>
        <b-nav-item><router-link v-if="!isAuthenticated" to="/register">REGISTER</router-link></b-nav-item>
        <b-nav-item><router-link v-if="isAuthenticated" to="/dashboard">DASHBOARD</router-link></b-nav-item>
        <!--
         <template v-for="item in items">
            <b-nav-item :key="item.route" v-if="isAuthenticated && item.isVisible" >
                  <router-link  :to="item.route">{{ item.title }}</router-link>
            </b-nav-item>
         </template>
         -->

         <template v-for="item in items">
            <b-nav-item :key="item.route" v-if="isAuthenticated && item.isVisible" >
                  <router-link  :to="item.route">{{ item.title }}</router-link>
            </b-nav-item>
         </template>

         <button v-if="isAuthenticated" @click="logout">Logout</button>
      </b-nav>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import modal from "../src/components/Modal.vue";
import menubar from "../src/data/menubar.json";

export default {
  data() {
    return {
      isAuthenticated: false,
      items: menubar.items,
    };
  },
  created() {
    // Controlla lo stato di autenticazione all'avvio dell'applicazione
    firebase.auth().onAuthStateChanged((user) => {
      this.isAuthenticated = user !== null;
    });
  },
  methods: {
    check() {
        console.log(this.items[0].title);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //alert('Successfully logged out');
          const modalComponent = new Vue(modal);
          modalComponent.$mount();
          modalComponent.showModal(
            "Authentication",
            "Successfully logged out!"
          );
          localStorage.removeItem("uuid");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
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


#custom-nav {
  background-color: black; /* Sostituisci con il colore desiderato */
  color: slategrey; /* Cambia il colore del testo se necessario */
}
</style>
