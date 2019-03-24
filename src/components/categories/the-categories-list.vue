<template>
  <div>

    <the-delete-category-modal></the-delete-category-modal>

    <b-card>
      <h3>My Categories</h3>
      <table class="table table-sm table-hover">
        <thead>
          <th>Category Name</th>
          <th></th>
        </thead>
        <tbody>
          <template v-for="cat in categories">

            <tr :key="cat.id" v-if="categoryEditId">
              <td>
                <input type="text" :placeholder="categoryNameToEdit" v-model.trim="categoryEditName">
              </td>
              <td>
                <b-button @click="cancelEdit">Cancel</b-button>
                <b-button @click="submitEdit">Save</b-button>
              </td>
            </tr>

            <tr :key="cat.id + 'edit'" v-else >
              <td>{{cat.category_name}}</td>
              <td>
                <b-button @click="doEdit(cat.id)">Edit</b-button>
                <b-button @click="doDelete(cat.id)">Delete</b-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script>
import { bindState } from '@/store/store';
import { mapState, mapActions } from 'vuex';

import theDeleteCategoryModal from './the-delete-category-modal'
export default {
  components: {
    theDeleteCategoryModal,
  },
  computed: {
    ...mapState('myActions', [
      'categories',
    ]),
    ...bindState('actionCategory', [
      'categoryEditId',
      'categoryEditName',
      'categoryDeleteId',
      'categoryDeleteName',
      'confirmCategoryDelete'
    ]),
    categoryNameToEdit() {
      const cat = this.categories.find(c => c.id === this.categoryEditId);
      return cat ? cat.category_name : null;
    }
  },
  methods: {
    ...mapActions('actionCategory', [
      'deleteCategory',
      'submitEdit',
    ]),
    doEdit(id) {
      this.categoryEditId = id;
      this.categoryEditName = this.categoryNameToEdit;
    },
    cancelEdit() {
      this.categoryEditId = '';
      this.categoryEditName = '';
    },
    doDelete(id) {
      this.confirmCategoryDelete = true;
      this.categoryDeleteId = id;
      this.categoryDeleteName = this.categories.find(c => c.id === id).category_name;
    },
    
  }
}
</script>
