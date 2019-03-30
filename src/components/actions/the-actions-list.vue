<template>
  <b-card>
    <b-form-row>
      <b-col cols="7" >
        <b-form-input type="date" v-model="d1"></b-form-input>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <label for="enable-edit">Edit</label>
        <b-form-checkbox 
          v-model="enableEdit"
          class="mx-2"
          id="enable-edit"
          switch
        ></b-form-checkbox>
      </b-col>
    </b-form-row>
    
    <b-card-text>
      <b-form-row>
        <b-col 
          v-for="category in categories"
          :key="category"
        >
        <app-anchor-badge 
          :anchorTo="category" 
          :linkText="dateAndCategory[category].length"
        ></app-anchor-badge>
        </b-col>
      </b-form-row>   

      <b-list-group v-for="(category, i) in categories" :key="i">
        <h3 :id="category">{{category}}</h3>
        <b-list-group-item 
          v-for="(item, j) in dateAndCategory[category]" 
          :key="j"
          class="flex-column align-items-start"
        >
          <b-row>
            <b-col class="d-flex w-100 justify-content-between">
              <small>{{item.dateStr}}</small>
              <small>{{item.timeStr}}</small>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex justify-content-between">
              <span>{{item.description}}</span>
              <div class="align-self-end">
                <b-button 
                  v-if="enableEdit" 
                  size="sm" 
                  variant="outline-info"
                  @click="editItemId = item.id"
                >Edit</b-button>
              </div>
            </b-col>
          </b-row>
          <div class="d-flex w"></div>
        </b-list-group-item>
      </b-list-group>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { bindState } from '@/store/store';
import appAnchorBadge from '@/components/app/anchor-badge'
export default {
  components: {
    appAnchorBadge,
  },
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
    ...bindState('editAction', [
      'enableEdit',
      'editItemId',
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
