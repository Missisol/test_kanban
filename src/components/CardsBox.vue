<template>
  <div class="box"> 
    
    <draggable 
      v-model="tasks" 
      group="tasks" 
    >
      <div 
        class="card" 
        v-for="card in tasks" 
        :key="card.id"
        >
        <div 
        class="card__icon-wrapper"
        @click="deleteCard(card.id, card.row)"
        >
          <img class="card__icon" src="../assets/close.svg" alt="close">
        </div>
          <p><span class="card__id">id</span>: {{card.id}}</p>
          <p>{{card.text}}</p>
      </div>
    </draggable>

    <div 
        v-if="!isAdding"
        class="box__button"
        @click="isAdding = true"
        >
        <img class="box__icon" src="../assets/plus.svg" alt="add">
        Добавить карточку
    </div>
    <div 
      class="box__textarea-wrapper"
      v-if="isAdding"
    >
      <textarea 
        class="box__textarea"
        placeholder="Ввести заголовок для этой карточки"
        v-model.trim="text"
      ></textarea>
      
      <div class="box__bottom">
        <div 
          class="box__submit"
          @click="addCard"
          >
          Добавить карточку
        </div>
        <div 
            class="box__icon-wrapper"
            @click="closeTextarea"
          >
            <img class="box__icon-close" src="../assets/close.svg" alt="close">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
    props: {
      row: Number,
    },
    data: () => ({
      isAdding: false,
      text: '',
      elAdded: '',
      newIndexAdded: '',
      elRemoved: '',
      oldIndexRemoved: '',
      elMoved: '',
      oldIndexMoved: '',
      newIndexMoved: '',
    }),
    computed: {
        tasks: {
          get() {
            return this.$store.getters.cardsByRow(this.row)
          },
          set(value) {
            this.$store.commit('updateCardsColumn', {value, row: this.row})
            this.$store.dispatch('updateCards', {value, row: this.row})

          }
        },
    },
    created() {
    },
    methods: {
     deleteCard(id, row) {
        this.$store.dispatch('deleteCard', { id, row })
      },
      addCard() {

        if (this.text !== '') {
          
          const cardBody = {
            row: this.row.toString(),
            text: this.text,
          }

          this.$store.dispatch('createCard', cardBody)
          this.closeTextarea()
        }
      },
      closeTextarea() {
        this.isAdding = false
        this.text = ''
      },
    },
}
</script>

<style lang="scss" scoped>
$card-height: 90px;

.box {
    font-size: 14px;
    padding-top: 10px;

  &__button {
    align-self: flex-end;
    width: 100%;
    height: 40px;
    padding: 10px;
    cursor: pointer;
    background: #303039;
  }

  &__icon {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  &__textarea-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px 15px;
  }

  &__textarea,
  &__submit {
    background: #515051;
    color: #ABAAAE;
  }

  &__textarea {
    height: $card-height;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: none;
    outline: none;
    color: #ABAAAE;
    resize: none;

    &::placeholder {
      font-size: 12px;
      color: #ABAAAE;
      opacity: .7;
    }
  }

  &__bottom {
    position: relative;
    align-self: flex-start;
  }

  &__submit {
    padding: 6px 25px;
    cursor: pointer;
  }

  &__icon-wrapper {
    position: absolute;
    right: -50px;
    top: 0;
    width: 40px;
    height: 100%;
    cursor: pointer;
  }

  &__icon-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
  }
}

.card {
  position: relative;
  height: $card-height;
  margin: 0 10px 10px;
  padding: 20px 10px 10px;
  background: #1F1F21;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &__id {
    color: #fff;
  }

  &__icon-wrapper {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  &__icon {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 10px;
    right: 10px;
  }
}

</style>