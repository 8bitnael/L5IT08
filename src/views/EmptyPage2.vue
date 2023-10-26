<template>
  <div class="container">
    <b-card border-variant="dark" header="PREFERENCES">
      <div>
        <div>
          <div>
            <b-button
              @click="addMenuItem(buttonText)"
              v-for="(buttonText, index) in removedItems"
              :key="index"
            >
              {{ buttonText.title }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PREFERENCES",
  data() {
    return {
      removedItems: [], // Inizializza l'array vuoto
    };
  },
  computed: {
    // Proprietà calcolate
  },
  methods: {
    addMenuItem(item) {
      // Trova l'indice dell'oggetto da rimuovere all'interno di this.items
      const index = this.removedItems.findIndex(
        (menuItem) => menuItem.route === item.route
      );
      if (index !== -1) {
        const removedItem = this.removedItems.splice(index, 1)[0];
        // Recupera gli elementi salvati dal localStorage e effettua il parsing
        const savedMenuItems = JSON.parse(localStorage.getItem("items"));
        savedMenuItems.push(removedItem);
        // Salva l'array aggiornato nel localStorage
        localStorage.setItem("items", JSON.stringify(savedMenuItems));

        // Rimuovi l'elemento anche da removedItems nel localStorage
        const removedItemsInLocalStorage = JSON.parse(
          localStorage.getItem("removedItems")
        );
        const removedItemIndex = removedItemsInLocalStorage.findIndex(
          (menuItem) => menuItem.route === item.route
        );
        if (removedItemIndex !== -1) {
          removedItemsInLocalStorage.splice(removedItemIndex, 1);
          localStorage.setItem(
            "removedItems",
            JSON.stringify(removedItemsInLocalStorage)
          );
        }
      }
    },
  },
  created() {},
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