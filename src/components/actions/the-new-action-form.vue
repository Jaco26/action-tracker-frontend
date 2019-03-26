<template>
  <b-card>
    <b-form @submit.prevent="onSubmit">
      <b-form-group 
        label="Select a category"
        description="Select the category under which you want to log this action"
      >
        <b-form-select
          v-model="selectedCategoryId"
          :options="selectableCategories"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Add a note">
        <b-form-textarea
          v-model.trim="description"
          rows="3"
          max-rows="3"
          no-resize=""
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        label="Override time"
        description="This action will be stored with the time of submission by default. Choose a time to override the default"
      >
        <b-form-row>
          <b-col>
            <b-form-input type="date" :value="currentDate" @input="currentDate = $event"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input type="time" v-model="overrideTime"></b-form-input>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group>
        <b-form-row>
          <b-col class="d-flex justify-content-center">
            <b-button 
              block 
              variant="primary" 
              type="submit"
              :disabled="submissionLoading"
            >
              <b-spinner v-if="submissionLoading" label="Submitting..."></b-spinner>
              <span v-else>Submit</span> 
            </b-button>
          </b-col>
        </b-form-row>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { bindState } from '@/store/store';
export default {
  mounted() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();

    const month = m < 10 ? `0${m}` : m;
    const day = d < 10 ? `0${d}` : d;
    this.currentDate = `${year}-${month}-${day}`;
  },
  computed: {
    ...bindState('newAction', [
      'selectedCategoryId',
      'description',
      'currentDate',
      'overrideTime',
    ]),
    ...mapState('newAction', [
      'submissionLoading',
    ]),
    selectableCategories() {
      const myCategories = this.$store.state.myActions.categories.map(c => ({ 
        value: c.id,
        text: c.category_name,
      }));
      return [{ value: null, text: 'Please select an option'}, ...myCategories];
    },
  },
  methods: {
    ...mapActions('newAction', [
      'addNewAction',
    ]),
    onSubmit() {
      if (this.selectedCategoryId) {
        this.addNewAction();
      } else {
        alert("You haven't selected this actions category");
      }
    }
  },
};
</script>