<template>
  <b-row>
    <b-col>
      <b-card no-body>
        <b-tabs  card>
          <b-tab title="Action Categories" active>
            <b-row>
              <b-col>
                <the-new-category-form></the-new-category-form>
              </b-col>
            </b-row>
            <b-row class="my-4">
              <b-col>
                <the-categories-list></the-categories-list>
              </b-col>
            </b-row>
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
import theNewCategoryForm from '@/components/categories/the-new-category-form';
import theCategoriesList from '@/components/categories/the-categories-list';
import theNewActionForm from '@/components/actions/the-new-action-form';
export default {
  components: {
    theNewCategoryForm,
    theCategoriesList,
    theNewActionForm,
  },
}
</script>
