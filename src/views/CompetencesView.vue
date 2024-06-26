<template>
  <crud-layout
    endPoint="competences"
    icon="bookmark"
    :entity-property="entityProperty"
    :hide-add="user.roles.includes('ROLE_TEACHER')"
    :headers="headers"
    hide-detail
  >
    <template v-slot:appendButton="slotProps">
      <v-btn
        size="small"
        variant="tonal"
        color="info"
        icon
        @click="showDescription(slotProps)"
      >
        <v-icon>mdi-eye</v-icon>
        <v-tooltip activator="parent" location="top">Ver</v-tooltip>
      </v-btn>
    </template>
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
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
      <v-expand-transition>
        <v-alert
          v-model="showAlert"
          border="top"
          class="mt-3 rounded-lg"
          color="primary"
          variant="tonal"
        >
          <h3>
            {{ showSelect.name }}
          </h3>
          {{ showSelect.description }}
        </v-alert>
      </v-expand-transition>
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
      },
      showSelect: {},
      showAlert: false,
      loadingSelect: false,
      competences: [],
    };
  },
  methods: {
    showDescription(item){
      this.showSelect = item;
      this.showAlert = true;
    }
  },
  computed: {
    user() {
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    },
  },
  mounted() {},
};
</script>
  