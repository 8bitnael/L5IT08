<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="modalTitle">
      <div class="d-block text-center">
        <h3>{{ modalText }}</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modalTitle: '',
        modalText: ''
      };
    },
    methods: {
      showModal(title, text) {
        this.modalTitle = title;
        this.modalText = text;
        this.$refs['my-modal'].show();
      },
      hideModal() {
        this.$refs['my-modal'].hide();
      }
    }
  }
</script>