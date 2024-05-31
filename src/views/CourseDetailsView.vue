<template>
  <layout-comp>
    <div class="d-flex flex-column ga-2">
      <v-card
        class="elevation-0 bg-primary pa-3 rounded-lg d-flex align-center"
        :loading="loading"
      >
        <v-icon color="white" class="d-none d-sm-flex">mdi-book-open-variant</v-icon>
        <h3 class="font-weight-bold text-white px-0 px-sm-3">
          Course Detail
        </h3>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-2 mr-2"
          color="white"
          @click="getCourses"
        >
          Update
          <v-icon class="ml-1">mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-2"
          color="white"
          @click="openRegister"
        >
          Register
          <v-icon class="ml-1">mdi-pen</v-icon>
        </v-btn>
      </v-card>
      <v-card class="elevation-0">
        <h1>{{ course.name }}</h1>
        <p class="text-caption pb-3">Descripcion</p>
        <p class="text-justify">{{ course.description }} || Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab recusandae magnam in laboriosam consequatur, culpa iusto autem esse voluptatem quam inventore officiis, adipisci porro. Totam voluptas quidem veritatis officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab recusandae magnam in laboriosam consequatur, culpa iusto autem esse voluptatem quam inventore officiis, adipisci porro. Totam voluptas quidem veritatis officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab recusandae magnam in laboriosam consequatur, culpa iusto autem esse voluptatem quam inventore officiis, adipisci porro. Totam voluptas quidem veritatis officia!</p>
        <!-- Aquí puedes agregar más detalles del curso -->
      </v-card>
    </div>
    <template v-slot:rightarea>
      <v-card class="pa-2 elevation-0">
        <div class="bg-white">
          <h3>Competencias</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          sint deleniti, dolores nesciunt expedita eligendi velit, dignissimos
          quia unde corporis nam molestiae. Ab iure velit debitis soluta
          consequuntur dolorem omnis.
        </div>
        <v-chip-group v-model="amenities" column multiple>
          <v-chip text="Elevator" variant="outlined" filter></v-chip>

          <v-chip text="Washer / Dryer" variant="outlined" filter></v-chip>

          <v-chip text="Fireplace" variant="outlined" filter></v-chip>

          <v-chip text="Wheelchair access" variant="outlined" filter></v-chip>

          <v-chip text="Dogs ok" variant="outlined" filter></v-chip>

          <v-chip text="Cats ok" variant="outlined" filter></v-chip>
        </v-chip-group>
      </v-card>
    </template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <h3>Registrar Nuevo Curso</h3>
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
        </span>
        <v-form ref="form" class="pt-3 rounded-lg w-100">
          <v-text-field
            v-model="nameCourse"
            :rules="nameCourseRules"
            label="Name"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-text-field>
          <v-text-field
            v-model="descriptionCourse"
            :rules="nameCourseRules"
            label="Description"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-text-field>
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
      courses: [],
      loading: false,
      dialog: false,
      amenities: [1, 4],
      nameCourse: "",
      descriptionCourse: "",
      nameCourseRules: [(v) => !!v || "Required"],
      courseId: null,
      course: {
        id: null,
        name: null,
        description: null,
      },
    };
  },
  methods: {
    openRegister() {
      this.dialog = true;
    },
    closeRegister() {
      this.dialog = false;
    },
    async postCourse() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loading = true;
        try {
          const response = await this.$axios3.post("/courses", {
            name: this.nameCourse,
            description: this.descriptionCourse,
          });
          console.log(response);
          this.loading = false;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.closeRegister();
          this.getCourses();
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
      }
    },
    async getCourses() {
      this.loading = true;

      try {
        const response = await this.$axios3.get(`/courses?id=${this.courseId}`);
        this.course = response.data.content[0];
        this.loading = false;
      } catch (error) {
        console.error("Error al obtener los detalles del curso:", error);
        // Manejar el error, por ejemplo, redirigir al usuario o mostrar un mensaje de error
      }
    },
  },
  mounted() {
    this.getCourses();
  },
  async created() {
    this.courseId = this.$route.params.id;
    this.getCourses();
  },
};
</script>
