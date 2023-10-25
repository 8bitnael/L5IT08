import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "firebase/firestore";
//import menubar from "../src/data/menubar.json";


var firebaseConfig = {
    apiKey: 'AIzaSyAi4YcFW2QhoqgEE9Ir9dz7NU8RBZH7NuI',
    authDomain: 'l5it08.firebaseapp.com',
    projectId: 'l5it08',
    storageBucket: 'l5it08.appspot.com',
    messagingSenderId: '88432534502',
    appId: '1:88432534502:web:55badf6d598ac731afec27',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;


new Vue({
    router,
    render: h => h(App),
    data: {
      // items: [],
    }
}).$mount('#app');
