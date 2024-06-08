<template>
  <v-layout class="rounded-lg h-100 w-100">
    <v-main>
      <div class="d-flex flex-column ga-3 py-2 mr-0 mr-md-2 px-4 rounded-xl">
        <v-card
          class="elevation-0 bg-primary rounded-lg d-flex align-center position-sticky pa-3"
          :loadin="loadingCrud"
        >
          <v-icon color="white">mdi-{{ icon }}</v-icon>
          <h3 class="font-weight-bold text-white px-3 text-capitalize">
            {{ endPoint }} View
          </h3>
          <v-spacer></v-spacer>
          <div class="d-flex ga-2">
            <v-btn
              slim
              variant="tonal"
              density="comfortable"
              color="white"
              @click="getAll"
              :loading="loadingCrud"
            >
              <p class="d-none d-md-flex">Refresh</p>
              <v-icon class="ml-0 ml-md-1">mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              slim
              variant="tonal"
              density="comfortable"
              class=""
              color="white"
              @click="openDialog"
              :loading="loadingCrud"
            >
              <p class="d-none d-md-flex">Register</p>
              <v-icon class="ml-0 ml-md-1">mdi-pencil</v-icon>
            </v-btn>
          </div>
        </v-card>
        <!-- <slot></slot> -->
        <v-card
          class="overflow-auto elevation-0 rounded-lg pa-2"
          color="#f2f2f2"
          :style="`height: calc(100dvh - 80px);`"
        >
          <v-row dense>
            <v-col
              v-for="(item, index) in itemsCrud"
              :key="index"
              cols="12"
              lg="4"
              md="6"
            >
              <card-custom :entityProperty="item"></card-custom>
            </v-col>
          </v-row>
        </v-card>
        <v-dialog v-model="dialogCrud" max-width="600">
          <v-card class="pa-6 rounded-lg">
            <div class="d-flex align-center">
              <h3 class="text-capitalize">Register: {{ endPoint }}</h3>
              <v-spacer></v-spacer>
              <v-btn
                text
                icon
                density="comfortable"
                class="elevation-0"
                @click="closeDialog"
              >
                <v-icon color="primary">mdi-close-thick</v-icon>
              </v-btn>
            </div>
            <v-alert
              icon="mdi-information-outline"
              variant="tonal"
              class="text-caption"
              border="start"
              color="primary"
            >
              <p class="text-caption font-weight-bold">Alert Title</p>
              <p style="line-height: 1.2 !important">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                eos expedita repudiandae repellendus ullam debitis iure cumque
                ipsam atque. Unde eius maiores rem laborum!
              </p>
            </v-alert>
            <v-form ref="form" class="pt-3 w-100 rounded-lg">
              <slot name="form"></slot>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn variant="text" @click="cleanDialog"> Limpiar </v-btn>
              <v-btn
                variant="tonal"
                color="primary"
                @click="postRegister"
                :loading="loadingCrud"
              >
                Registrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-main>
    <v-navigation-drawer
      location="right"
      floating
      class="mx-2 py-2 d-none d-lg-flex"
    >
      <v-card class="pa-2 rounded-lg h-100 elevation-0" color="#f2f2f2">
        <slot name="rightarea"></slot>
      </v-card>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import CardCustom from "@/components/CardCustom.vue";

export default {
  name: "LayoutCustom",

  components: { CardCustom },

  props: {
    endPoint: {
      type: String,
      default: "users",
    },
    icon: {
      type: String,
      default: "home",
    },
    entityProperty: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    loadingCrud: false,
    dialogCrud: false,
    itemsCrud: [],
  }),

  watch: {
    // dataLayout(newVal, oldVal){
    //     console.log('NEW VAL --->', newVal);
    // }
  },

  computed: {},

  methods: {
    openDialog() {
      this.dialogCrud = true;
    },
    closeDialog() {
      this.dialogCrud = false;
    },
    cleanDialog() {
      this.$refs.form.reset();
    },
    async getAll() {
      this.loadingCrud = true;
      try {
        const response = await this.$axios3.get(`/${this.endPoint}?size=100`);
        this.itemsCrud = response.data.resource;
        console.log(`get - /${this.endPoint}`, this.itemsCrud);
        this.loadingCrud = false;
      } catch (error) {
        console.error(`Hubo un error al obtener /${this.endPoint}:`, error);
      }
    },
    async postRegister() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loadingCrud = true;
        try {
          const response = await this.$axios3.post(
            `/${this.endPoint}`,
            this.entityProperty
          );
          console.log(`post - /${this.endPoint}`, response);
          this.loadingCrud = false;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.closeDialog();
          this.getAll();
        } catch (error) {
          console.error(`Hubo un error al registrar /${this.endPoint}:`, error);
        }
      }
    },
    goToCourseViewDetail(courseId) {
      this.loadCard = courseId;
      setTimeout(() => {
        this.loadCard = null;
        this.$router.push({ name: "course-details", params: { id: courseId } });
      }, 350);
    },
  },

  mounted() {
    this.getAll();
  },

  created() {},
};
</script>

<style>
</style>