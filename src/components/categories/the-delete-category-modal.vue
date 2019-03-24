<template>
  <b-modal 
    v-model="confirmCategoryDelete"
    @ok="completeDelete"
    @cancel="cancelDelete"
    no-close-on-backdrop
    hide-header-close
  >
    <b-form @submit.stop.prevent="completeDelete">
      <p> 
        If you delete the category "<strong>{{categoryDeleteName}}</strong>"
        all actions you've saved under this category will be erased as well!
      </p>
      <p>
        Type <strong>"DELETE {{categoryDeleteName.toUpperCase()}}"</strong> and hit <strong>Ok</strong> to continue.
      </p>
      <b-form-input
        v-model="matchToDelete"
        type="text" 
        :placeholder="`DELETE ${categoryDeleteName.toUpperCase()}`" 
      ></b-form-input>
    </b-form>
    
  </b-modal>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import { bindState } from '@/store/store';
export default {
  data() {
    return {
      matchToDelete: '',
    }
  },
  computed: {
    ...bindState('actionCategory', [
      'confirmCategoryDelete',
      'categoryDeleteId',
      'categoryDeleteName',
    ]),
  },
  methods: {
    completeDelete() {
      if (this.matchToDelete === `DELETE ${this.categoryDeleteName.toUpperCase()}`) {
        this.$store.dispatch('actionCategory/deleteCategory');
      }
      this.categoryDeleteId = '';
      this.categoryDeleteName = '';
      this.matchToDelete = '';
      this.confirmCategoryDelete = false;
    },
    cancelDelete() {
      this.categoryDeleteId = '';
      this.categoryDeleteName = '';
      this.matchToDelete = '';
    },
  }
}
</script>
