<template>
  <div>
    This is the reports page
    <pre>
      {{actions}}
    </pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('myActions', [
      'actions',
    ])
  }
}
</script>
