<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="pa-0 rounded-lg"
      :height="listView?'120':'180'"
      v-bind="props"
      :elevation="isHovering ? 24 : 0"
    >
      <div class="pa-4 h-100 d-flex flex-column">
        <h3 class="d-flex mb-2">
          <span
            class="d-inline-block text-truncate pr-5"
            style="max-width: 100%"
          >
            {{
              entityProperty[defaultTitle]
                ? entityProperty[defaultTitle]
                : entityProperty.title
            }}
          </span>
          <v-spacer></v-spacer>
          <v-icon>mdi-{{icon}}</v-icon>
        </h3>
        <v-hover
          v-slot:default="{
            isHovering: isInnerHovering,
            props: innerHoverProps,
          }"
        >
          <v-card
            v-bind="innerHoverProps"
            tile
            class="d-none d-sm-flex elevation-0 flex-fill flex-column"
            :class="alignEnd ? 'align-end justify-end' : ''"
          >
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
            <v-expand-transition v-if="!hideHover">
              <div
                v-if="isInnerHovering"
                class="d-flex ga-3 transition-fast-in-fast-out v-card--reveal rounded-lg"
                :class="listView?'align-end justify-end bg-transparent':'align-center justify-center opacity-90'"
                style="height: 100%"
              >
                <v-btn
                  v-if="!hideDelete"
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
                  v-if="!hideEdit"
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
                <slot name="appendButton"></slot>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
        <!-------------- MOBILE -------------->
        <v-card
          tile
          class="elevation-0 flex-fill d-flex d-sm-none flex-column"
          :class="alignEnd ? 'align-end justify-end' : ''"
          @click="clickMobile"
          :ripple="false"
        >
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
          <v-expand-transition v-if="!hideHover">
            <div
              v-if="showDataCard"
              class="d-flex ga-3 transition-fast-in-fast-out v-card--reveal rounded-lg"
              style="height: 100%"
            >
              <v-btn
                v-if="!hideDelete"
                size="small"
                variant="tonal"
                color="error"
                icon
                @click="itemDelete"
              >
                <v-icon>mdi-trash-can</v-icon>
                <v-tooltip activator="parent" location="top">Delete</v-tooltip>
              </v-btn>
              <v-btn
                v-if="!hideEdit"
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
                <v-tooltip activator="parent" location="top">Detail</v-tooltip>
              </v-btn>
              <slot name="appendButton"></slot>
            </div>
          </v-expand-transition>
        </v-card>
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
    defaultTitle: {
      type: String,
      default: "name",
    },
    icon: {
      type: String,
      default: "home",
    },
    headers: {
      type: Array,
      default: () => [{ text: "id", value: "id" }],
    },
    hideHover: {
      type: Boolean,
      default: false,
    },
    hideDetail: {
      type: Boolean,
      default: false,
    },
    hideDelete: {
      type: Boolean,
      default: false,
    },
    hideEdit: {
      type: Boolean,
      default: false,
    },
    alignEnd: {
      type: Boolean,
      default: false,
    },
    listView: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    dataCard: false,
    showDataCard: false,
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
    clickMobile() {
      this.showDataCard = !this.showDataCard;
      setTimeout(() => {
        this.showDataCard = false;
      }, 750);
    },
  },

  mounted() {},

  created() {},
};
</script>

<style>
.v-card--reveal {
  /* align-items: center;
  opacity: 0.9;
  justify-content: center; */
  bottom: 0;
  position: absolute;
  width: 100%;
  background-color: #f9f9f9;
}
</style>