<template>
  <h4 class="anchor-badge">
    <a :href="`#${anchorTo}`">
      <b-badge>{{anchorTo}}: {{linkText}}</b-badge> 
    </a>
  </h4>
</template>

<script>
export default {
  props: {
    anchorTo: String,
    linkText: {
      validator: val => typeof val === 'string' || typeof val === 'number',
    }
  }
}
</script>


<style scoped>
.anchor-badge {
  padding: .1rem;
  margin: .1rem;
}
</style>
