<template>
  <crud-layout
    endPoint="sections"
    icon="google-classroom"
    :entity-property="entityProperty"
    :headers="headers"
    :hide-add="user.roles.includes('ROLE_TEACHER')"
    :hide-edit="user.roles.includes('ROLE_TEACHER')"
    :hide-delete="user.roles.includes('ROLE_TEACHER')"
  >
    <template #form>
      <v-text-field
        v-model="entityProperty.code"
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
      <v-select
        density="compact"
        variant="outlined"
        v-model="entityProperty.gradeId"
        :items="grades"
        item-title="name"
        item-value="value"
        label="Grades"
      >
      </v-select>
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0">
        En esta sección, podrás explorar las diversas secciones de los cursos que ofrece nuestra institución educativa. Aquí encontrarás información detallada sobre cada sección, incluyendo el nombre del instructor, horarios, y la cantidad de estudiantes inscritos. Esta herramienta está diseñada para ayudarte a conocer y seleccionar las secciones que mejor se adapten a tus intereses y necesidades académicas, facilitando así tu planificación y experiencia educativa. ¡Descubre todas las opciones disponibles y organiza tu horario de la manera más conveniente para ti!
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
      headers: [
        { text: "Grado", value: "gradeId" },
        { text: "Description", value: "description" },
        { text: "Code", value: "code" },
      ],
      entityProperty: {
        code: "",
        name: "",
        description: "",
        gradeId: "",
        id: "",
      },
      grades: [
        {
          name: 'Grade1',
          value:'1'
        },
        {
          name: 'Grade2',
          value:'2'
        },
        {
          name: 'Grade3',
          value:'3'
        },
        {
          name: 'Grade4',
          value:'4'
        },
        {
          name: 'Grade5',
          value:'5'
        },
      ],
    };
  },
  computed: {
    user() {
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    },
  },
  methods: {
  },
  mounted() {
    
  },
};
</script>
