<template>
  <div ref="wavesContainer" class="waves-container">
    <!-- <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/">Iniciar Sesion</router-link> |
      <router-link to="/signup">Registrate</router-link>
    </nav> -->
    <div
      class="d-flex flex-column justify-end justify-sm-center align-center h-100 pa-5"
    >
      <h1 class="text-white mb-n1">Evolution</h1>
      <p class="pb-3 text-center text-white text-caption">
        Plataforma Educativa
      </p>

      <v-card class="d-flex w-100 rounded-lg" max-width="350" color="">
        <v-form ref="form" class="pa-5 rounded-lg w-100">
          <h3 class="pb-3 text-center">Iniciar Sesion</h3>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            append-inner-icon="mdi-email-outline"
            class="pb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="contentRules"
            :type="!marker ? '' : 'password'"
            :append-inner-icon="
              marker ? 'mdi-lock-outline' : 'mdi-lock-open-variant-outline'
            "
            clearable
            label="Password"
            density="compact"
            variant="outlined"
            @click:append-inner="toggleMarker"
            hide-details="false"
            class="pb-3"
            required
          ></v-text-field>

          <v-alert
            type="info"
            variant="tonal"
            class="mb-3 text-caption"
            closable
          >
            <p style="line-height: 1.2 !important">
              Por favor, ingrese su correo y contraseña y verifique que sean los
              correctos para acceder a la plataforma. ¡Gracias!
            </p>
          </v-alert>

          <div class="d-flex flex-column">
            <v-btn flat color="primary" block @click="validateForm">
              <span class="font-weight-bold text-white">Ingresar</span>
            </v-btn>
          </div>
        </v-form>
      </v-card>
      <p class="pt-5 text-center text-white text-caption">v 1.0.0</p>
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        :color="snackbarState ? 'green-accent-4' : 'red-accent-3'"
        rounded="lg"
        elevation="24"
      >
        <p class="text-white">
          {{ snackbarState ? "Ingreso correctamente" : "Datos incorrectos" }}
        </p>

        <template v-slot:actions>
          <v-btn color="white" icon @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
// import ChipCustom from '@/components/ChipCustom.vue'
export default {
  name: "LoginView",

  components: {
    // ChipCustom,
  },

  props: {
    Title: {
      type: String,
      default: "LoginView Title",
    },
  },

  data: () => ({
    dataLoginView: false,
    marker: true,
    snackbar: false,
    snackbarState: false,
    email: "",
    user: "",
    password: "",
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    contentRules: [(v) => !!v || "Required"],
  }),

  //   watch:{
  //     dataLoginView(newVal, oldVal){
  //         console.log('NEW VAL --->', newVal);
  //     }
  //   },

  computed: {},

  methods: {
    initVanta() {
      if (window.VANTA) {
        window.VANTA.WAVES({
          el: this.$refs.wavesContainer, // Utiliza la referencia al contenedor
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color: 0x5252,
          scaleMobile: 1.0,
          shininess: 60.0,
          zoom: 0.85,
        });
      }
    },
    async validateForm() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.login();
      } else {
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
        this.snackbar = true;
        this.snackbarState = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    async login() {
      // this.email == 'juliosa@gmail.com'? this.user= 'JulioSZ':''
      try {
        const response = await this.$axios2.post("/users/auth/sign-in", {
          email: this.email,
          password: this.password,
        });
        this.handleLoginResponse(response.data);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        this.snackbar = true;
        this.snackbarState = false;
      }
    },
    handleLoginResponse(data) {
      this.user = {
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles || [], // Manejar si roles es null
      };
      this.snackbar = true;
      this.snackbarState = true;

      // Almacenar el token de manera segura
      localStorage.setItem("authToken", data.token); // O utiliza cookies
      localStorage.setItem("user", JSON.stringify(this.user)); // O utiliza cookies

      // Configurar el token para futuras solicitudes
      this.$axios1.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      this.goToLogin();
    },

    goToLogin() {
      const redirect = this.$route.query.redirect || "/home";
      setTimeout(() => {
        this.$router.push(redirect);
        // this.$router.push({ name: "home" });
      }, 550);
    },
    changeThemeColor(color) {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color);
      }
    },
  },

  mounted() {
    this.initVanta();
    this.changeThemeColor("#027b7b");
  },

  //   created(){
  //   }
};
</script>

<style>
.waves-container {
  width: 100%;
  height: 100vh; /* O ajusta la altura según sea necesario */
}
</style>