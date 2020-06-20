<template>
  <div class="column">
      <div 
        class="column__header" 
        :style="{backgroundColor: column.color}">
          <h3 class="column__title">{{ column.title }} ({{counter}})</h3>
      </div>
      <div class="column__body">

        <cards-box 
          :row="column.row"
        ></cards-box>
        
      </div>
  </div>
</template>

<script>
import CardsBox from './CardsBox.vue'

export default {
  components: {
    CardsBox,
  },
  props: {
    column: Object,
  },
  data: () => ({
  }),
  computed: {
    counter() {
      return this.$store.getters.countCardsByRow(this.column.row)
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
$height: 50px;

.column {
    width: 300px;
    color: #fff;
    display: flex;
    flex-direction: column;
    margin: 0 10px 30px;

  &__body, 
  &__button {
    color: #5A5A62;
  }

  &__body {
    background: #2F3035;
  }

  &__header {
  width: 100%;
  height: $height;
  padding: 0 10px;
}

  &__title {
    line-height: $height;
    font-weight: normal;
  }

  &__button {
    align-self: flex-end;
    width: 100%;
    height: 40px;
    padding: 10px;
    cursor: pointer;
    background: #27272D;
  }

  &__icon {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  @media screen and (max-width: 780px) {
   width: 260px;
  }
}

</style>>

