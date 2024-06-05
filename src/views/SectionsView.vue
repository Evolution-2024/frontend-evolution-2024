<template>
  <layout-comp>
    <div class="d-flex flex-column ga-2">
      <v-card
        class="elevation-0 bg-primary pa-3 rounded-lg d-flex align-center"
        :loading="loading"
      >
        <v-icon color="white">mdi-google-classroom</v-icon>
        <h3 class="font-weight-bold text-white px-3">Sections View</h3>
        <v-spacer></v-spacer>
        <v-select
          max-width="150"
          density="compact"
          variant="outlined"
          required
          hide-details
          class="custom-select pr-2"
          v-model="selectGradeId"
          label="Grade"
          item-title="label"
          item-value="value"
          :items="gradesSelect"
        ></v-select>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-0 px-sm-2 mr-2"
          color="white"
          @click="getCourses"
        >
          <p class="d-none d-md-flex">Update</p>
          <v-icon class="ml-0 ml-md-1">mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-0 px-sm-2"
          color="white"
          @click="openRegister"
        >
          <p class="d-none d-md-flex">Register</p>
          <v-icon class="ml-1">mdi-pen</v-icon>
        </v-btn>
      </v-card>
      <v-card class="d-flex flex-wrap ga-3 elevation-0 overflow-visible">
        <v-card
          v-for="(item, index) in courses"
          :loading="loadCard == item.id"
          :key="index"
          max-width="320"
          class="pa-4 elevation-3 rounded-lg"
        >
          <h3 class="d-flex">
            {{ item.name }} - {{ item.code }} <v-spacer></v-spacer>
            <v-icon>mdi-book-open-variant</v-icon>
          </h3>
          <p class="text-caption">Descripcion:</p>
          {{ item.description }} || Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Repudiandae possimus harum molestiae voluptatum
          velit.
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
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4 rounded-lg">
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
          {{ sectionEntity }}
        </span>
        <v-form ref="form" class="pt-3 rounded-lg w-100">
          <v-text-field
            v-model="sectionEntity.code"
            :rules="nameCourseRules"
            label="Code"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-text-field>
          <v-text-field
            v-model="sectionEntity.name"
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
            v-model="sectionEntity.description"
            :rules="nameCourseRules"
            clearable
            label="Description"
            density="compact"
            variant="outlined"
            hide-details="false"
            class="pb-3"
            required
          ></v-textarea>
          <v-select
            class="pb-3"
            density="compact"
            variant="outlined"
            required
            hide-details="false"
            v-model="sectionEntity.gradeId"
            label="Select"
            item-title="label"
            item-value="value"
            :items="grades"
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
      courses: [],
      loading: false,
      dialog: false,
      loadCard: null,
      selectGradeId: null,
      nameCourse: "",
      descriptionCourse: "",
      nameCourseRules: [(v) => !!v || "Required"],
      grades: [
        {
          label: "1 GRADO",
          value: 1,
        },
        {
          label: "2 GRADO",
          value: 2,
        },
        {
          label: "3 GRADO",
          value: 3,
        },
        {
          label: "4 GRADO",
          value: 4,
        },
        {
          label: "5 GRADO",
          value: 5,
        },
      ],
      gradesSelect: [
        {
          label: "1 GRADO",
          value: 1,
        },
        {
          label: "2 GRADO",
          value: 2,
        },
        {
          label: "3 GRADO",
          value: 3,
        },
        {
          label: "4 GRADO",
          value: 4,
        },
        {
          label: "5 GRADO",
          value: 5,
        },
        {
          label: "TODOS GRADO",
          value: null,
        },
      ],
      sectionEntity: {
        code: null,
        name: null,
        description: null,
        gradeId: null,
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
          const response = await this.$axios3.post(
            "/sections",
            this.sectionEntity
          );
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
    goToCourseViewDetail(courseId) {
      this.loadCard = courseId;
      setTimeout(() => {
        this.loadCard = null;
        this.$router.push({ name: "course-details", params: { id: courseId } });
      }, 350);
    },
    async getCourses() {
      this.loading = true;
      try {
        const response = await this.$axios3.get(
          `/sections?${
            this.selectGradeId != null
              ? "gradeId=" + this.selectGradeId + "&"
              : ""
          }size=100`
        );
        this.courses = response.data.resource;
        console.log(this.courses);
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
    this.getCourses();
  },
  watch: {
    selectGradeId(newVal) {
      console.log("NEW VAL --->", newVal);
      this.getCourses();
    },
  },
};
</script>

<style>
.custom-select .v-input__control {
  min-height: 30px;
  height: 30px;
  font-size: 14px;
}

.custom-select .v-input__slot {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}
</style>