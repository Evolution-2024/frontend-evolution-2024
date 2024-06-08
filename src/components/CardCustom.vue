<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="pa-0 rounded-lg"
      height="180"
      v-bind="props"
      :elevation="isHovering ? 24 : 0"
    >
      <div class="pa-4 h-100">
        <h3 class="d-flex">
          {{ entityProperty.name }} - 00{{ entityProperty.id }}
          <v-spacer></v-spacer>
          <v-icon>mdi-book-open-variant</v-icon>
        </h3>
        <v-hover
          v-slot:default="{
            isHovering: isInnerHovering,
            props: innerHoverProps,
          }"
        >
          <v-card v-bind="innerHoverProps" tile class="h-100 elevation-0">
            <div class="">
              <p class="text-caption">Descripcion:</p>
              {{ entityProperty.description }} || Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Repudiandae possimus harum molestiae
              voluptatum velit.
            </div>
            <v-expand-transition>
              <div
                v-if="isInnerHovering"
                class="d-flex ga-3 transition-fast-in-fast-out v-card--reveal bg-white"
                style="height: 100%"
              >
                <v-btn variant="tonal" color="warning" icon @click="itemEdit">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn variant="tonal" color="error" icon @click="itemDelete">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
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
  emits: ['delete'],

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
    viewDetalle() {
      this.$emit("detalle", this.entityProperty.id);
    },
    itemDelete() {
      this.$emit("delete", this.entityProperty.id);
    },
    itemEdit() {
      this.$emit("edit", this.entityProperty.id);
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
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
</style>