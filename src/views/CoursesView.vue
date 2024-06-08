<template>
  <crud-layout endPoint="courses" icon="book-open-variant" :entity-property="entityProperty">
    <!-- <div class="d-flex flex-column ga-2">
      <v-card class="d-flex flex-wrap ga-3 elevation-0 overflow-visible">
        <v-card
          v-for="(item, index) in courses"
          :loading="loadCard == item.id"
          :key="index"
          max-width="320"
          class="pa-4 elevation-3 rounded-lg"
          @click="goToCourseViewDetail(item.id)"
        >
          <h3 class="d-flex">
            {{ item.name }} - 00{{ item.id }} <v-spacer></v-spacer>
            <v-icon>mdi-book-open-variant</v-icon>
          </h3>
          <p class="text-caption">Descripcion:</p>
          {{ item.description }} || Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Repudiandae possimus harum molestiae voluptatum
          velit.
        </v-card>
      </v-card>
    </div> -->
    <template v-slot:rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
    </template>
    <template #form>
      <!-- <v-card class="rounded-lg"> -->
        <!-- <v-form ref="form" class="pt-3 rounded-lg w-100"> -->
          <v-text-field
            v-model="entityProperty.name"
            :rules="nameCourseRules"
            label="Name"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-text-field>
          <v-textarea
            v-model="entityProperty.description"
            :rules="nameCourseRules"
            label="Description"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-textarea>
        <!-- </v-form> -->
        <!-- <v-btn flat @click="postCourse" :loading="loading"> Registrar </v-btn> -->
      <!-- </v-card> -->
    </template>
  </crud-layout>
</template>

<script>
// @ is an alias to /src
import CrudLayout from "@/components/CrudLayout.vue";

export default {
  name: "CoursesView",
  components: {
    CrudLayout,
  },
  data() {
    CrudLayout;
    return {
      nameCourseRules: [(v) => !!v || "Required"],
      entityProperty: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    // openRegister() {
    //   this.dialog = true;
    // },
    // closeRegister() {
    //   this.dialog = false;
    // },
    // async postCourse() {
    //   const { valid } = await this.$refs.form.validate();

    //   if (valid) {
    //     this.loading = true;
    //     try {
    //       const response = await this.$axios3.post("/courses", {
    //         name: this.nameCourse,
    //         description: this.descriptionCourse,
    //       });
    //       console.log(response);
    //       this.loading = false;
    //       this.$refs.form.reset();
    //       this.$refs.form.resetValidation();
    //       this.closeRegister();
    //       this.getCourses();
    //     } catch (error) {
    //       console.error("Error al iniciar sesión:", error);
    //     }
    //   }
    // },
    // goToCourseViewDetail(courseId) {
    //   this.loadCard = courseId;
    //   setTimeout(() => {
    //     this.loadCard = null;
    //     this.$router.push({ name: "course-details", params: { id: courseId } });
    //   }, 350);
    // },
    // async getCourses() {
    //   this.loading = true;
    //   try {
    //     const response = await this.$axios3.get("/courses?size=100");
    //     this.courses = response.data.resource;
    //     console.log(this.courses);
    //     this.loading = false;
    //   } catch (error) {
    //     console.error("Hubo un error al obtener los cursos:", error);
    //     // Opcional: Manejo de error específico, como mostrar un mensaje de error al usuario
    //     this.$notify.error({
    //       title: "Error",
    //       message:
    //         "No se pudieron obtener los cursos. Intente de nuevo más tarde.",
    //     });
    //   }
    // },
  },
  mounted() {
    // this.getCourses();
  },
};
</script>
