<template>
  <crud-layout
    endPoint="announcements"
    icon="book-open-variant"
    :entity-property="entityProperty"
    :headers="headers"
    hide-detail
  >
    <template #form>
      <v-text-field
        v-model="entityProperty.title"
        :rules="nameCourseRules"
        label="Title"
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
      <v-text-field
        v-model="entityProperty.sectionCode"
        :rules="nameCourseRules"
        label="Section Code"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="entityProperty.studentCode"
        :rules="nameCourseRules"
        label="Student Code"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
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
      headers: [{ text: "Descripción", value: "description" }],
      entityProperty: {
        title: null,
        description: null,
        sectionCode: null,
        studentCode: null,
      },
      loadingSelect: false,
      competences: [],
    };
  },
  methods: {},
  mounted() {},
};
</script>
  