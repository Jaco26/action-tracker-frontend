<template>
  <b-row>
    <b-col>
      <b-card no-body>
        <b-tabs  card>
          <b-tab title="New Category" active>
            <the-new-category-form></the-new-category-form>
          </b-tab>
          <b-tab title="New Action">
            <the-new-action-form></the-new-action-form>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import theNewCategoryForm from '@/components/actions/the-new-category-form';
import theNewActionForm from '@/components/actions/the-new-action-form';
export default {
  components: {
    theNewCategoryForm,
    theNewActionForm,
  },
}
</script>
