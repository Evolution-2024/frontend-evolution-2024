<template>
  <v-layout class="rounded rounded-md">
    <!-- <v-app-bar color="surface-variant" title="Application bar"></v-app-bar> -->

    <v-navigation-drawer
      floating
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      class="d-none d-sm-flex mx-2 py-2"
    >
      <v-card
        class="rounded-lg h-100 elevation-0 d-flex flex-column"
        color="#f2f2f2"
      >
        <v-list-item value="home">
          <template v-slot:prepend>
            <img
              src="/evolution_logo.png"
              alt=""
              srcset=""
              class="mr-3"
              style="width: 25px"
              @click="logLayout"
            />
          </template>

          <v-list-item-title>
            <p class="font-weight-bold">Evolution</p>
          </v-list-item-title>

          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-expand-transition>
          <v-card
            class="pa-2 overflow-hidden elevation-0"
            color="#f2f2f2"
            :width="256"
            v-show="!rail"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              odio illum non, ullam distinctio sunt aliquam sequi cum
              asperiores!
            </p>
          </v-card>
        </v-expand-transition>

        <v-divider v-show="!rail"></v-divider>

        <v-list density="compact" nav>
          <v-list-subheader v-show="!rail">MODULOS</v-list-subheader>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          ></v-list-item>
        </v-list>

        <div class="flex-fill d-flex flex-column justify-end">
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-subheader v-show="!rail">SESION</v-list-subheader>
            <v-list-item
              prepend-icon="mdi-logout-variant"
              title="Cerrar Sesion"
              value="users"
              @click="logOut"
            ></v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-navigation-drawer>

    <v-navigation-drawer
      location="right"
      floating
      class="mx-2 py-2 d-none d-lg-flex"
    >
      <v-card class="pa-2 rounded-lg h-100 elevation-0" color="#f2f2f2">
        <slot name="rightarea"> </slot>
      </v-card>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      :class="`drawer_main${rail ? '_close' : '_open'}`"
    >
      <div class="mr-2 pa-2 w-100">
        <slot></slot>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
// import ChipCustom from '@/components/ChipCustom.vue'
export default {
  name: "LayoutCustom",

  components: {
    // ChipCustom,
  },

  props: {
    Title: {
      type: String,
      default: "Layout Title",
    },
  },

  data: () => ({
    dataLayout: false,
    drawer: true,
    rail: true,
  }),

  //   watch:{
  //     dataLayout(newVal, oldVal){
  //         console.log('NEW VAL --->', newVal);
  //     }
  //   },

  computed: {},

  methods: {
    logLayout() {
      console.log("SAMPLE LOG --->", this.Title);
      this.$router.push({ name: "home" });
    },
    logOut() {
      if (this.rail) {
        console.log("SAMPLE LOG --->", this.Title);
      } else {
        console.log("SAMPLE OUT --->", this.Title);
        this.$router.push({ name: "login" });
      }
    },
  },

  //  mounted(){
  //    this.logLayout();
  //  },

  //   created(){
  //   }
};
</script>

<style>
.drawer_main_open {
  padding-left: 264px;
  @media (max-width: 600px) {
    padding-left: 0;
  }
}
.drawer_main_close {
  padding-left: 64px;
  @media (max-width: 600px) {
    padding-left: 0;
  }
}
</style>