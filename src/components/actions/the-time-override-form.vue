<template>
  <b-collapse v-model="showOverrideTimeForm" id="override-time-collapse">
    <b-form-group description="This action will be stored with the time of submission by default. Choose a time to override the default">
      <b-form-row>
        <b-col>
          <b-form-input type="date" :value="currentDate" @input="currentDate = $event"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input type="time" v-model="overrideTime"></b-form-input>
        </b-col>
      </b-form-row>
    </b-form-group>
  </b-collapse>
</template>

<script>
import { bindState } from '@/store/store';
export default {
  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const month = m < 10 ? `0${m}` : m;
    const day = d < 10 ? `0${d}` : d;
    this.currentDate = `${year}-${month}-${day}`;
  },
  computed: {
    ...bindState('newAction', [
      'currentDate',
      'overrideTime',
      'showOverrideTimeForm'
    ])
  },
  watch: {
    overrideTime(newVal) {
      alert(newVal)
    }
  }
}
</script>
