<template>
  <crud-layout
    endPoint="courses"
    icon="book-open-variant"
    :entity-property="entityProperty"
    :headers="headers"
    :hide-delete="!user.roles.includes('ROLE_ADMIN')"
    :hide-edit="!user.roles.includes('ROLE_ADMIN')"
    :hide-add="!user.roles.includes('ROLE_ADMIN')"
  >
    <template #form>
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
      <v-autocomplete
        density="compact"
        variant="outlined"
        v-model="entityProperty.competences"
        :loading="loadingSelect"
        :items="competences"
        item-title="name"
        return-object
        @focus="getAllCompetences('competences')"
        label="Competences"
        multiple
      >
      </v-autocomplete>
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0">
        En esta vista, podrás explorar los diversos cursos ofrecidos por nuestra institución educativa. Aquí encontrarás información detallada sobre cada curso, incluyendo su nombre, descripción y el número de estudiantes inscritos. Esta herramienta está diseñada para ayudarte a conocer y seleccionar los cursos que mejor se adapten a tus intereses y necesidades académicas, facilitando así tu proceso educativo. ¡Descubre todo lo que nuestra institución tiene para ofrecerte y planifica tu futuro académico con nosotros!
      </v-card>
    </template>
  </crud-layout>
</template>

<script>
// @ is an alias to /src
import CrudLayout from "@/layouts/CrudLayout.vue";

export default {
  name: "CoursesView",
  components: {
    CrudLayout,
  },
  data() {
    CrudLayout;
    return {
      nameCourseRules: [(v) => !!v || "Required"],
      headers: [{ text: "Descripción", value: "description" }],
      entityProperty: {
        id: "",
        name: "",
        description: "",
        competences: [],
      },
      loadingSelect: false,
      competences: [],
    };
  },
  computed:{
    user() {
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    },
  },
  methods: {
    async getAllCompetences(endPoint) {
      this.loadingSelect = true;
      try {
        const response = await this.$axios3.get(`/${endPoint}?size=100`);
        this.loadingSelect = false;

        this.competences = response.data.resource;
        console.log(`get - /${endPoint}`, this.competences);
      } catch (error) {
        console.error(`Hubo un error al obtener /${endPoint}:`, error);
      }
    },
  },
  mounted() {},
};
</script>
