<template>
  <div class="container">
    <b-card border-variant="dark" header="PREFERENCES">
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-collapse
            id="accordion-1"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-card-text>
                <h2>Username: "{{ storedUuid }}"</h2>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <div>
        <div>
          <b-card class="text-center">
            <div class="bg-secondary text-light">
              Once logged in, user must be able to enter his/her ID number and
              retrieve personal information using JSON or XML which are stored
              separately (2.1)
            </div>
          </b-card>
          <form @submit.prevent="retrieve">
            <h2>Retrieve personal information</h2>
            <div class="form-floating">
              <input
                type="Username"
                class="form-control"
                id="Username"
                placeholder="Username"
                required
                v-model="uuid"
              />
              <label for="floatingInput">Username</label>
            </div>
            <button type="submit">Retrieve JSON</button>
          </form>

          <!--     -->
          <pre style="text-align: left">{{ userData }}</pre>
          <!--     -->

          <b-card class="text-center">
            <div class="bg-secondary text-light">Menu items removed (2.5)</div>
          </b-card>

          <div>
            <b-button v-for="(buttonText, index) in removedItems" :key="index">
              {{ buttonText.title }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Dashboard",
  data() {
    return {
      disabled: true,
      uuid: "",
      storedUuid: null,
      data: null,
      userData: null, // Inizializza userData a null
      //removedItems: JSON.parse(localStorage.getItem("removedItems")),
      removedItems: [], // Inizializza l'array vuoto
    };
  },
  computed: {
    // Proprietà calcolate
  },
  methods: {
    // Metodi del componente
    retrieve() {
      console.log("retrieve " + this.storedUuid);
      const firestore = firebase.firestore();
      const documentId = this.uuid;
      const docRef = firestore.collection("utenti").doc(documentId);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Il documento esiste, puoi accedere ai dati con doc.data()
            const data = doc.data();
            console.log("Dati del documento:", data);
            this.userData = data;
          } else {
            console.log("Il documento non esiste.");
          }
        })
        .catch((error) => {
          console.error("Errore durante il recupero del documento:", error);
        });
    },
    handleStorageChange(event) {
      // Verifica se il cambiamento nel localStorage coinvolge "removedItems"
      if (event.key === "removedItems") {
        // Aggiorna i dati nel componente Vue
        this.removedItems = JSON.parse(event.newValue);
      }
    },
  },
  created() {
    const uuid = localStorage.getItem("uuid");
    if (uuid) {
      this.storedUuid = uuid;
    }
  },
  mounted() {
    const removedMenuItems = localStorage.getItem("removedItems");
    if (removedMenuItems !== null) {
      this.removedItems = JSON.parse(removedMenuItems);
    }
  },
};
</script>

<style scoped>
</style>