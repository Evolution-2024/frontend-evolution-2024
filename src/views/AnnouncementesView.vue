<template>
  <crud-layout
    endPoint="announcements"
    icon="bullhorn"
    list-view
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
        <v-autocomplete
        class="pb-3"
        hide-details="false"
        :rules="nameCourseRules"
        density="compact"
        variant="outlined"
        v-model="entityProperty.sectionCode"
        :loading="loadingSelect"
        :items="sections"
        item-title="code"
        item-value="id"
        @focus="getAllSections('sections')"
        label="Section"
      >
      
      </v-autocomplete>
      <!-- {{entityProperty}} -->
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0">
        En esta sección, podrás explorar los anuncios y comunicados creados por los profesores de nuestra institución educativa. Aquí encontrarás información importante sobre eventos, cambios en el horario de clases, recordatorios y otros mensajes relevantes para tu vida académica. Esta herramienta está diseñada para mantenerte informado y al tanto de las últimas noticias y actualizaciones. ¡Mantente conectado y asegúrate de no perderte ningún anuncio importante de tus profesores!
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
        id: null,
        title: null,
        description: null,
        sectionCode: null,
        teacherCode: null,
      },
      loadingSelect: false,
      sections: [],
    };
  },
  methods: {
    async getAllSections(endPoint) {
      this.loadingSelect = true;
      try {
        const response = await this.$axios3.get(`/${endPoint}?size=100`);
        this.loadingSelect = false;

        this.sections = response.data.resource;
        console.log(`get - /${endPoint}`, this.sections);
      } catch (error) {
        console.error(`Hubo un error al obtener /${endPoint}:`, error);
      }
    },
  },
  mounted() {},
  computed: {
    user() {
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    },
  },
  async created() {
    setTimeout(() => {
      this.entityProperty.teacherCode = this.user.id
    }, 500);
  },
};
</script>
  