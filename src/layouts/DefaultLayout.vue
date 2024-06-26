<template>
  <v-layout class="rounded-lg">
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
            class="pa-2 px-4 overflow-hidden elevation-0"
            color="#f2f2f2"
            :width="256"
            v-show="!rail"
          >
            <p class="text-uppercase font-weight-black">Session:</p>
            <div class="d-flex justify-space-between"
            >
              <span class="font-weight-bold text-uppercase">User:</span>
              <span class="d-inline-block text-truncate pl-2" style="max-width: 100%">
                {{ user.username }}
                <v-tooltip activator="parent" location="top"
                      >{{ user.username }}</v-tooltip
                    >
              </span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="font-weight-bold text-uppercase">MAIL:</span>
              <span>
                {{ user.email }}
              </span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="font-weight-bold text-uppercase"> ROL: </span>
              <div class="text-capitalize">
                <span
                  v-for="(roleName, index) in userRoleNames"
                  :key="index"
                  class=""
                >
                  {{ index != 0 ? "," : "" }} {{ roleName.name }}
                </span>
              </div>
            </div>
          </v-card>
        </v-expand-transition>

        <v-divider v-show="!rail"></v-divider>
        <v-list density="compact" nav>
          <v-list-subheader v-show="!rail">MODULOS</v-list-subheader>
          <v-list-item
            v-for="item in uniqueModules"
            :key="item.value"
            :prepend-icon="item.icon"
            @click="pushName(item.value)"
          >
            <v-list-item-title class="text-capitalize">
              {{ item.value }}
            </v-list-item-title>
          </v-list-item>
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

    <v-main class="d-flex" :class="`drawer_main${rail ? '_close' : '_open'}`">
      <div class="w-100">
        <v-card
          class="d-flex flex-column d-sm-none w-100 pa-3 pt-4 rounded-lg mb-2 elevation-0"
          :color="!expand ? '' : '#f2f2f2'"
        >
          <img
            src="/evolution_logo.png"
            alt=""
            srcset=""
            class="mx-auto image-logo"
            style="width: auto; height: 25px"
            @click="expand = !expand"
          />
          <div class="ondas">
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
          <v-expand-transition>
            <v-card
              v-show="expand"
              class="pt-4 px-2 elevation-0"
              color="transparent"
            >
              <h4 class="text-center">Evolution</h4>
              <v-list density="compact" bg-color="transparent">
                <v-list-item
                  title="Dashboard"
                  class="text-center"
                  density="compact"
                  value="dashboard"
                  @click="pushName('home')"
                ></v-list-item>

                <v-list-item
                  title="Courses"
                  class="text-center"
                  density="compact"
                  value="courses"
                  @click="pushName('courses')"
                ></v-list-item>
                <v-list-item
                  title="Users"
                  class="text-center"
                  density="compact"
                  value="users"
                  @click="pushName('users')"
                ></v-list-item>
                <v-list-item
                  title="Sections"
                  class="text-center"
                  density="compact"
                  value="sections"
                  @click="pushName('sections')"
                ></v-list-item>
                <v-list-item
                  title="Competences"
                  class="text-center"
                  density="compact"
                  value="competences"
                  @click="pushName('competences')"
                ></v-list-item>
                <v-list-item
                  class="text-center font-weight-black"
                  density="compact"
                  value="sections"
                  @click="logOut"
                >
                  <v-list-item-title>
                    <p class="font-weight-black">Log Out</p>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-card
                class="d-flex justify-center mb-n1 elevation-0"
                color="transparent"
              >
                <v-icon @click="expand = !expand">mdi-chevron-up</v-icon>
              </v-card>
            </v-card>
          </v-expand-transition>
        </v-card>

        <slot></slot>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: "LayoutCustom",

  components: {},

  props: {
    Title: {
      type: String,
      default: "Layout Title",
    },
  },

  data: () => ({
    dataLayout: false,
    expand: false,
    menuItems: [],
    drawer: true,
    rail: false,
    roles: [
      {
        name: "student",
        value: "ROLE_STUDENT",
        modules: [
          {
            icon: "mdi-view-dashboard",
            value: "home",
          },
          {
            icon: "mdi-book-open-variant",
            value: "courses",
          },
        ],
      },
      {
        name: "teacher",
        value: "ROLE_TEACHER",
        modules: [
          {
            icon: "mdi-view-dashboard",
            value: "home",
          },
          {
            icon: "mdi-book-open-variant",
            value: "courses",
          },
          {
            icon: "mdi-google-classroom",
            value: "sections",
          },
          {
            icon: "mdi-bullhorn",
            value: "announcements",
          },
        ],
      },
      {
        name: "admin",
        value: "ROLE_ADMIN",
        modules: [
          {
            icon: "mdi-view-dashboard",
            value: "home",
          },
          {
            icon: "mdi-book-open-variant",
            value: "courses",
          },
          {
            icon: "mdi-bookmark",
            value: "competences",
          },
          {
            icon: "mdi-bullhorn",
            value: "announcements",
          },
          {
            icon: "mdi-account-group-outline",
            value: "users",
          },
          {
            icon: "mdi-google-classroom",
            value: "sections",
          },
        ],
      },
    ],
  }),

  computed: {
    user() {
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    },
    userRoles() {
      return this.user ? this.user.roles : [];
    },
    userRoleNames() {
      return this.userRoles.map((roleValue) => {
        const role = this.roles.find((r) => r.value === roleValue);
        return role ? role : "Unknown Role";
      });
    },
    uniqueModules() {
      const allModules = this.userRoleNames.flatMap((role) => role.modules);

      // Crear un conjunto para obtener valores únicos basados en el valor de los módulos
      return Array.from(new Set(allModules.map((module) => module.value))).map(
        (value) => {
          return allModules.find((module) => module.value === value);
        }
      );
    },
  },

  methods: {
    logLayout() {
      console.log("SAMPLE LOG --->", this.Title);
      this.$router.push({ name: "home" });
    },
    logOut() {
      if (this.rail) {
        console.log("SAMPLE LOG --->", this.Title);
      } else {
        localStorage.removeItem("authToken"); // O limpiar la cookie
        delete this.$axios1.defaults.headers.common["Authorization"];
        console.log("SAMPLE OUT --->", this.Title);
        this.$router.push({ name: "login" });
      }
    },
    pushName(nameString) {
      this.$router.push({ name: nameString });
    },
    changeThemeColor(color) {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color);
      }
    },
  },

  mounted() {
    this.changeThemeColor("#ffffff");
  },

  created() {},
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
.image-logo {
  position: relative;
}

.ondas {
  position: absolute;
  /* transform: translate(-50%, -50%); */
  transform: translateX(-50%);
  left: 50%;
  top: 0%;
  z-index: -1;
}

.lds-ripple,
.lds-ripple div {
  box-sizing: border-box;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ripple div {
  position: absolute;
  border: 2px solid #3fc4c0;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -1s;
}
@keyframes lds-ripple {
  0% {
    top: 18px;
    left: 18px;
    width: 4px;
    height: 4px;
    opacity: 0;
  }
  4.9% {
    top: 18px;
    left: 18px;
    width: 4px;
    height: 4px;
    opacity: 0;
  }
  5% {
    top: 18px;
    left: 18px;
    width: 4px;
    height: 4px;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    opacity: 0;
  }
}
</style>