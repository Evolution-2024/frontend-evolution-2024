<template>
  <v-layout class="rounded-lg h-100 w-100">
    <v-main>
      <div class="d-flex flex-column ga-3 py-2 mr-0 mr-md-2 px-4 rounded-xl">
        <v-card
          class="elevation-0 bg-primary rounded-lg d-flex align-center position-sticky pa-3"
          :loading="loadingCrud"
        >
          <v-icon color="white">mdi-{{ icon }}</v-icon>
          <h3 class="font-weight-bold text-white px-3 text-capitalize">
            {{ title ? title : endPoint }} View
          </h3>
          <v-spacer></v-spacer>
          <div class="d-flex ga-2">
            <v-btn
              slim
              variant="tonal"
              density="comfortable"
              color="white"
              class="font-weight-bold"
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
              class="font-weight-bold"
              color="white"
              @click="openDialog"
              :loading="loadingCrud"
            >
              <p class="d-none d-md-flex">Register</p>
              <v-icon class="ml-0 ml-md-1">mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card>
        <slot></slot>
        <v-card
          class="overflow-auto elevation-0 rounded-lg pa-2"
          color="#f2f2f2"
          :style="`height: calc(100dvh - ${heightBox}px);`"
        >
          <slot name="upList"></slot>
          <v-row dense v-if="lengthCrud">
            <v-col
              v-for="(item, index) in itemsCrud"
              :key="index"
              cols="12"
              :lg="listView ? 12 : 4"
              :xl="listView ? 12 : 3"
              :md="listView ? 12 : 6"
            >
              <card-custom
                :icon="icon"
                :headers="headers"
                :entityProperty="item"
                :listView="listView"
                :hide-detail="hideDetail"
                :hide-edit="hideEdit"
                :hide-hover="hideHover"
                :hide-delete="hideDelete"
                :defaultTitle="defaultTitle"
                :alignEnd="alignEnd"
                @delete="deleteItem"
                @edit="editItem"
                @detail="detailItem"
              ></card-custom>
            </v-col>
          </v-row>
          <div
            v-else
            class="text-center h-75 d-flex flex-column justify-center align-center"
          >
            No existe elementos
          </div>
        </v-card>
        <v-dialog v-model="dialogCrud" max-width="600">
          <v-card class="pa-6 rounded-lg">
            <div class="d-flex align-center">
              <h3 class="text-capitalize">
                {{ onEdit ? "Update" : "Register" }}: {{ endPoint }}
              </h3>
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
              <div style="line-height: 1.2 !important">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                eos expedita repudiandae repellendus ullam debitis iure cumque
                ipsam atque. Unde eius maiores rem laborum!
              </div>
            </v-alert>
            <v-form
              ref="form"
              class="pt-3 w-100 rounded-lg"
              :disabled="loadingCrud"
            >
              <slot name="form"></slot>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn variant="text" @click="cleanDialog"> Clean </v-btn>
              <v-btn
                variant="tonal"
                color="primary"
                @click="postRegisterUpdate"
                :loading="loadingCrud"
              >
                {{ onEdit ? "Update" : "Register" }}
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
  emits: ["edit"],

  components: { CardCustom },

  props: {
    title: {
      type: String,
      required: false,
    },
    endPoint: {
      type: String,
      default: "courses",
    },
    icon: {
      type: String,
      default: "home",
    },
    heightBox: {
      type: Number,
      default: 80,
    },
    crudFilter: {
      type: String,
      required: false,
    },
    crudDetail: {
      type: String,
      required: false,
    },
    listView: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Boolean,
      default: false,
    },
    alter: {
      type: Boolean,
      default: false,
    },
    entityProperty: {
      type: Object,
      required: true,
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
    headers: {
      type: Array,
      default: () => [{ text: "id", value: "id" }],
    },
    defaultTitle: {
      type: String,
      default: "name",
    },
    postEp: {
      type: String,
      required: false,
    },
    alignEnd: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    loadingCrud: false,
    dialogCrud: false,
    onEdit: false,
    itemsCrud: [],
  }),

  watch: {
    // dataLayout(newVal, oldVal){
    //     console.log('NEW VAL --->', newVal);
    // }
  },

  computed: {
    lengthCrud() {
      return this.itemsCrud ? this.itemsCrud.length : 0;
    },
  },

  methods: {
    cleanProperty(objeto) {
      for (let propiedad in objeto) {
        objeto[propiedad] = null;
      }
    },
    sameProperties(objetoDestino, objetoFuente) {
      for (let propiedad in objetoDestino) {
        if (Object.prototype.hasOwnProperty.call(objetoFuente, propiedad)) {
          objetoDestino[propiedad] = objetoFuente[propiedad];
        }
      }
    },
    openDialog() {
      this.onEdit = false;
      this.dialogCrud = true;
      this.$emit("edit", this.onEdit);
    },
    closeDialog() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialogCrud = false;
    },
    cleanDialog() {
      this.$refs.form.reset();
    },
    async getAll() {
      this.loadingCrud = true;
      try {
        if (this.alter) {
          const response = await this.$axios2.get(
            `/${this.endPoint}${
              this.filters ? `?${this.crudFilter}=${this.crudDetail}&` : "?"
            }size=100`
          );
          this.itemsCrud = response.data.resource;
        } else {
          const response = await this.$axios3.get(
            `/${this.endPoint}${
              this.filters ? `?${this.crudFilter}=${this.crudDetail}&` : "?"
            }size=100`
          );
          this.itemsCrud = response.data.resource;
        }
        console.log(`get - /${this.endPoint}`, this.itemsCrud);
        this.loadingCrud = false;
      } catch (error) {
        console.error(`Hubo un error al obtener /${this.endPoint}:`, error);
      }
    },
    async deleteItem(itemId) {
      this.loadingCrud = true;
      try {
        if (this.alter) {
          const response = await this.$axios2.delete(
            `/${this.endPoint}/${itemId}`
          );
          console.log(`delete - /${this.endPoint}/${itemId}`, response);
        } else {
          const response = await this.$axios3.delete(
            `/${this.endPoint}/${itemId}`
          );
          console.log(`delete - /${this.endPoint}/${itemId}`, response);
        }
        this.loadingCrud = false;
        this.getAll();
      } catch (error) {
        console.error(
          `Hubo un error al realizar /${this.endPoint}/${itemId}:`,
          error
        );
      }
    },
    editItem(itemId) {
      this.onEdit = true;
      this.dialogCrud = true;
      let sampleData = this.itemsCrud.find((objeto) => objeto.id === itemId);
      console.log("this.entityProperty--> 1", this.entityProperty);
      this.cleanProperty(this.entityProperty);
      this.sameProperties(this.entityProperty, sampleData);
      console.log("this.entityProperty--> 2", this.entityProperty);
      console.log("sampleData--> ", sampleData);
      console.log("this.entityProperty--> 3", this.entityProperty);
      this.$emit("edit", this.onEdit);
    },
    async postRegisterUpdate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loadingCrud = true;
        try {
          if (this.alter) {
            const response = await this.$axios2[this.onEdit ? "put" : "post"](
              `/${this.postEp ? this.postEp : this.endPoint}`,
              this.entityProperty
            );
            console.log(
              `${this.onEdit ? "put" : "post"} - /${
                this.postEp ? this.postEp : this.endPoint
              }`,
              response
            );
          } else {
            const response = await this.$axios3[this.onEdit ? "put" : "post"](
              `/${this.postEp ? this.postEp : this.endPoint}`,
              this.entityProperty
            );
            console.log(
              `${this.onEdit ? "put" : "post"} - /${
                this.postEp ? this.postEp : this.endPoint
              }`,
              response
            );
          }
          this.loadingCrud = false;
          this.closeDialog();
          this.getAll();
        } catch (error) {
          console.error(
            `Hubo un error al registrar /${
              this.postEp ? this.postEp : this.endPoint
            }:`,
            error
          );
        }
      }
    },
    // TODO ------------------------ LOOK ------------------------
    detailItem(itemId) {
      setTimeout(() => {
        this.$router.push({
          name: `${this.endPoint}-details`,
          params: { id: itemId },
        });
      }, 150);
    },
  },

  mounted() {
    if (this.filters) {
      setTimeout(() => {
        this.getAll();
      }, 250);
    } else {
      this.getAll();
    }
  },

  created() {},
};
</script>

<style>
</style>