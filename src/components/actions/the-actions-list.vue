<template>
  <b-card>
    <b-form-input type="date" v-model="d1"></b-form-input>
    <pre>
      {{dateAndCategory}}
    </pre>
  </b-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { bindState } from '@/store/store';
export default {
  computed: {
    ...bindState('myActions', [
      'd1',
    ]),
    ...mapState('myActions', [
      'actions',
    ]),
    ...mapGetters('myActions', [
      'dateAndCategory',
    ]),
 
  },
  mounted() {
    const d = new Date();
    const year = (d.getUTCFullYear()).toString();
    let month = (d.getUTCMonth() + 1).toString();
    let day = (d.getUTCDate()).toString();
    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;
    this.d1 = `${year}-${month}-${day}`;
  }
}
</script>
