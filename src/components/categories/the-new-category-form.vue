<template>
  <b-card>
    <b-form @submit.prevent="addNewCategory">
      <b-form-group 
        label="New Action Category"
        description="Enter a name you can use to categorize your actions"
      >
        <b-form-input 
          v-model="categoryName"
          type="text"
          placeholder="Enter a category name"
        ></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <b-button block type="submit">Submit</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import { bindState } from '@/store/store';
import { mapActions } from 'vuex';
export default {
  computed: {
    ...bindState('actionCategory', [
      'categoryName',
    ])
  },
  methods: {
    ...mapActions('actionCategory', [
      'addNewCategory',
    ]),
  }
}
</script>