<template>
  <layout-comp>
    <div class="d-flex flex-column ga-2">
      <v-card
        class="elevation-0 bg-primary pa-3 rounded-lg d-flex align-center"
        :loading="loading"
      >
        <v-icon color="white">mdi-account-group-outline</v-icon>
        <h3 class="font-weight-bold text-white px-3">Users View</h3>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-2 mr-2"
          color="white"
          @click="getUsers"
        >
          <p class="d-none d-md-flex">Update</p>
          <v-icon class="ml-1">mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-2"
          color="white"
          @click="openRegister"
        >
          <p class="d-none d-md-flex">Register</p>
          <v-icon class="ml-1">mdi-pen</v-icon>
        </v-btn>
      </v-card>
      <v-card
        class="d-flex flex-wrap ga-3 justify-center elevation-0 overflow-visible"
      >
        <v-card
          v-for="(item, index) in allUsers"
          :loading="loadCard == item.id"
          :key="index"
          max-width="320"
          min-width="280"
          min-height="125"
          class="pa-4 elevation-3 rounded-lg d-flex flex-column justify-space-between"
        >
          <h3 class="d-flex">
            {{ item.username }} - 00{{ item.id }} <v-spacer></v-spacer>
            <v-icon>mdi-account-box</v-icon>
          </h3>
          <div>
            <p class="text-caption">Email:{{ item.email }}</p>
            <p class="text-caption">Rol:{{ item.roles[0].name }}</p>
          </div>
        </v-card>
      </v-card>
    </div>
    <template v-slot:rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
    </template>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card class="pa-4 rounded-lg">
        <div class="d-flex">
          <h3>Registrar Nuevo User</h3>
          <v-spacer></v-spacer>
          <v-btn
            icon
            fab
            size="x-small"
            color="primary"
            class="elevation-0"
            @click="closeRegister"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </div>
        <span class="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste magni
          expedita quam architecto similique provident laboriosam quos
          reprehenderit ad natus repellat officia ipsam, quod inventore tempore
          facilis necessitatibus explicabo libero!
          {{ userEntity }}
        </span>
        <v-form ref="form" class="pt-3 rounded-lg w-100">
          <v-text-field
            v-model="userEntity.username"
            :rules="nameCourseRules"
            label="Nombre completo"
            density="compact"
            variant="outlined"
            hide-details="false"
            append-inner-icon="mdi-account"
            clearable
            class="pb-3"
            required
          ></v-text-field>
          <v-text-field
            v-model="userEntity.email"
            :rules="emailRules"
            label="Email"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            append-inner-icon="mdi-email"
            class="pb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="userEntity.password"
            :rules="contentRules"
            :type="!marker ? '' : 'password'"
            :append-inner-icon="marker ? 'mdi-lock' : 'mdi-lock-open-variant'"
            clearable
            label="Password"
            density="compact"
            variant="outlined"
            @click:append-inner="toggleMarker"
            hide-details="false"
            class="pb-3"
            required
          ></v-text-field>
          <v-select
            class="pb-3"
            density="compact"
            variant="outlined"
            required
            hide-details="false"
            v-model="userEntity.roles"
            label="Select"
            item-title="label"
            item-value="value"
            multiple
            :items="roles"
          ></v-select>
        </v-form>
        <v-btn flat @click="postCourse" :loading="loading"> Registrar </v-btn>
      </v-card>
    </v-dialog>
  </layout-comp>
</template>

<script>
// @ is an alias to /src
import LayoutComp from "@/components/LayoutComp.vue";

export default {
  name: "CoursesView",
  components: {
    LayoutComp,
  },
  data() {
    return {
      allUsers: [],
      loading: false,
      dialog: false,
      marker: true,
      loadCard: null,
      nameCourse: "",
      descriptionCourse: "",
      nameCourseRules: [(v) => !!v || "Required"],
      userEntity: {
        username: null,
        email: null,
        password: null,
        roles: [],
      },
      roles: [
        {
          label: " STUDENT",
          value: " ROLE_STUDENT",
        },
        {
          label: "TEACHER",
          value: "ROLE_TEACHER",
        },
        {
          label: "ADMIN",
          value: "ROLE_ADMIN",
        },
      ],
    };
  },
  methods: {
    openRegister() {
      this.dialog = true;
    },
    toggleMarker() {
      this.marker = !this.marker;
    },
    closeRegister() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async postCourse() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loading = true;
        try {
          const response = await this.$axios2.post(
            "/users/auth/sign-up",
            this.userEntity
          );
          console.log(response);
          this.loading = false;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.closeRegister();
          this.getUsers();
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
      }
    },
    resetDialog() {
      this.$refs.form.reset();
    },
    goToCourseViewDetail(courseId) {
      this.loadCard = courseId;
      setTimeout(() => {
        this.loadCard = null;
        this.$router.push({ name: "course-details", params: { id: courseId } });
      }, 350);
    },
    async getUsers() {
      this.loading = true;
      try {
        const response = await this.$axios2.get("/users");
        this.allUsers = response.data.content;
        console.log(this.allUsers);
        this.loading = false;
      } catch (error) {
        console.error("Hubo un error al obtener los cursos:", error);
        // Opcional: Manejo de error específico, como mostrar un mensaje de error al usuario
        this.$notify.error({
          title: "Error",
          message:
            "No se pudieron obtener los cursos. Intente de nuevo más tarde.",
        });
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
