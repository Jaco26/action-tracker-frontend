<template>
  <b-card>
    <b-form-input type="date" v-model="dateStr1"></b-form-input>
    <b-form-input type="date" v-model="dateStr2"></b-form-input>
    <pre>
      {{filterableActions}}
    </pre>
  </b-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { bindState } from '@/store/store';
export default {
  computed: {
    ...bindState('myActions', [
      'dateStr1',
      'dateStr2',
    ]),
    ...mapState('myActions', [
      'actions',
    ]),
    ...mapGetters('myActions', [
      'groupActionsByCategory',
      'filterActionsByDate',
    ]),
    filterableActions() {
      return this.dateStr1 ? this.filterActionsByDate : this.actions;   
    }
  }
}
</script>
