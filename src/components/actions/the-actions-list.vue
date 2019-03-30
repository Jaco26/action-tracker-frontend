<template>
  <b-card>
    <b-form-input type="date" v-model="d1"></b-form-input>
    <b-card-text>
      <b-form-row>
        <b-col 
          v-for="category in categories"
          :key="category"
          style="height: 50px; min-width: 180"
        >
         {{category}}: {{dateAndCategory[category].length}}
        </b-col>
      </b-form-row>   
      <!-- <b-row 
        v-for="category in categories"
        :key="category"
      >
        <strong>{{category}}</strong>
        <b-col v-for="(item, i) in dateAndCategory[category]" :key="i">
          {{item.displayDate}} <br>
          {{item.description}}
        </b-col>
      </b-row> -->


      <pre>
        {{dateAndCategory}}
      </pre>
    </b-card-text>
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
    categories() {
      if (this.dateAndCategory) {
        return Object.keys(this.dateAndCategory)
      }
      return [];
    }
  },
  mounted() {
    const d = new Date();
    const year = (d.getFullYear()).toString();
    let month = (d.getMonth() + 1).toString();
    let day = (d.getDate()).toString();
    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;
    this.d1 = `${year}-${month}-${day}`;
  }
}
</script>
