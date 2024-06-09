<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="pa-0 rounded-lg"
      height="180"
      v-bind="props"
      :elevation="isHovering ? 24 : 0"
    >
      <div class="pa-4 h-100 d-flex flex-column">
        <h3 class="d-flex mb-2">
          <span class="d-inline-block text-truncate pr-5" style="max-width: 100%">

            {{ entityProperty.name ? entityProperty.name : entityProperty.title }}
          </span>
          <v-spacer></v-spacer>
          <v-icon>mdi-book-open-variant</v-icon>
        </h3>
        <v-hover
          v-slot:default="{
            isHovering: isInnerHovering,
            props: innerHoverProps,
          }"
        >
          <v-card v-bind="innerHoverProps" tile class="elevation-0 flex-fill">
            <p
              v-for="(sample, index) in headers"
              :key="index"
              class="w-100 d-inline-block text-truncate"
              :class="index + 1 == headers.length ? 'pb-0' : ''"
            >
              <span class="font-weight-bold text-capitalize pr-2"
                >{{ sample.text }}:</span
              >{{ entityProperty[sample.value] }}
            </p>
            <v-expand-transition>
              <div
                v-if="isInnerHovering"
                class="d-flex ga-3 transition-fast-in-fast-out v-card--reveal bg-white"
                style="height: 100%"
              >
                <v-btn
                  size="small"
                  variant="tonal"
                  color="error"
                  icon
                  @click="itemDelete"
                >
                  <v-icon>mdi-trash-can</v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Delete</v-tooltip
                  >
                </v-btn>
                <v-btn
                  size="small"
                  variant="tonal"
                  color="warning"
                  icon
                  @click="itemEdit"
                >
                  <v-icon>mdi-pencil</v-icon>
                  <v-tooltip activator="parent" location="top">Edit</v-tooltip>
                </v-btn>
                <v-btn
                  v-if="!hideDetail"
                  size="small"
                  variant="tonal"
                  color="info"
                  icon
                  @click="itemDetail"
                >
                  <v-icon>mdi-eye</v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Detail</v-tooltip
                  >
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
  emits: ["delete", "edit", "detail"],

  props: {
    entityProperty: {
      type: Object,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    hideDetail: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    dataCard: false,
  }),

  watch: {},

  computed: {},

  methods: {
    itemDetail() {
      this.$emit("detail", this.entityProperty.id);
    },
    itemDelete() {
      this.$emit("delete", this.entityProperty.id);
    },
    itemEdit() {
      this.$emit("edit", this.entityProperty.id);
    },
  },

  mounted() {},

  created() {},
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity:0.85;
  position: absolute;
  width: 100%;
}
</style>