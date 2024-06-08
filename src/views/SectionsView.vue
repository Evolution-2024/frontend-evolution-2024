<template>
  <crud-layout
    endPoint="sections"
    icon="google-classroom"
    :entity-property="entityProperty"
    :headers="headers"
    hide-detail
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
      headers: [
        { text: "Code", value: "code" },
        { text: "Descripción", value: "description" },
      ],
      entityProperty: {
        code: "",
        name: "",
        description: "",
        gradeId: "",
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
  methods: {
  },
  mounted() {},
};
</script>
