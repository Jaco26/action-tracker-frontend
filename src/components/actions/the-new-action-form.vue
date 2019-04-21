<template>
  <div>
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

        <b-form-group>
          <b-btn
            @click="showOverrideTimeForm = !showOverrideTimeForm"
            :variant="overrideBtnClass"
            block
            class="mb-2"
          >
            Override time of action
          </b-btn>
          <the-time-override-form></the-time-override-form>
        </b-form-group>

        <b-form-group label="Add a note">
          <b-form-textarea
            v-model="description"
            rows="3"
            max-rows="3"
            no-resize=""
          ></b-form-textarea>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { bindState } from '@/store/store';
import theTimeOverrideForm from './the-time-override-form';
export default {
  components: {
    theTimeOverrideForm,
  },
  computed: {
    ...bindState('newAction', [
      'selectedCategoryId',
      'description',
      'showOverrideTimeForm',
      // 'currentDate',
      // 'overrideTime',
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
    overrideBtnClass() {
      return this.showOverrideTimeForm
        ? 'outline-warning'
        : 'outline-secondary';
    }
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