<template>
  <b-card>
    <h3>My Categories</h3>
    <table class="table table-sm table-hover">
      <thead>
        <th>Category Name</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td>{{cat.category_name}}</td>
          <td>
            <b-button @click="deleteCategory(cat.id)">Delete</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </b-card>
</template>

<script>
import { bindState } from '@/store/store';
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('myActions', [
      'categories',
    ]),
  },
  methods: {
    ...mapActions('actionCategory', [
      'deleteCategory',
      'editCategory',
    ])
  }
}
</script>
