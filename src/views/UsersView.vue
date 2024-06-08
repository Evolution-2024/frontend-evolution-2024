<template>
  <crud-layout
    endPoint="users/auth/sign-up"
    icon="book-open-variant"
    :entity-property="entityProperty"
    :headers="headers"
    alter
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
        { text: "Email", value: "email" },
        { text: "Username", value: "username" },
      ],
      entityProperty: {
        username: '',
        email: '',
        password: '',
        roles: '',
      },
      loadingSelect: false,
      competences: [],
    };
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
