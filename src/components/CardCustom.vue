<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="pa-0 rounded-lg"
      height="180"
      v-bind="props"
      :elevation="isHovering ? 24 : 0"
    >
      <div class="pa-4">
        <h3 class="d-flex">
          {{ entityProperty.name }} - 00{{ entityProperty.id }} <v-spacer></v-spacer>
          <v-icon>mdi-book-open-variant</v-icon>
        </h3>
        <p class="text-caption">Descripcion:</p>
        {{ entityProperty.description }} || Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Repudiandae possimus harum molestiae voluptatum velit.
      </div>
    </v-card>
  </v-hover>
</template>

<script>
// import ChipCustom from '@/components/ChipCustom.vue'
export default {
  name: "CardCustom",

  components: {
    // ChipCustom,
  },

  props: {
    entityProperty: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dataCard: false,
  }),

  //   watch:{
  //     dataCard(newVal, oldVal){
  //         console.log('NEW VAL --->', newVal);
  //     }
  //   },

  computed: {},

  methods: {
    logCard() {
      console.log("SAMPLE LOG --->", this.Title);
    },
  },

  //  mounted(){
  //    this.logCard();
  //  },

  //   created(){
  //   }
};
</script>

<style>
</style>