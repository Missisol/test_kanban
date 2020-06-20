<template>
  <div class="wrapper">

    <cards-column
      v-for="column in columns"
      :key="column.title"
      :column="column"
    ></cards-column>

  </div>
</template>

<script>
import CardsColumn from '../components/CardsColumn.vue'

export default {
  components: {
    CardsColumn,
  },
  data: () => ({
    countOnHold: 0,
    countInProgress: 0,
    countNeedReview: 0,
    countApproved: 0,
    columns: [
      {title: 'ON HOLD', color: '#F88B4A', row: 0},
      {title: 'IN PROGRESS', color: '#3982B2', row: 1},
      {title: 'NEED REVIEW', color: '#F6C852', row: 2},
      {title: 'APPROVED', color: '#4BA468', row: 3},
    ],
  }),
  created() {
    this.obtainToken()
  },
  computed: {
  },
  methods: {
    async obtainToken() {

      await this.$store.dispatch('obtainToken')
      this.$store.dispatch('getCards')
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
    margin: 0 auto;
    max-width: 1400px;
    padding: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  @media screen and (max-width: 1070px) {
   justify-content: space-evenly;
  }

  @media screen and (max-width: 780px) {
    padding: 40px 20px;
  }
}

</style>
