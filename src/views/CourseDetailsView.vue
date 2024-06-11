<template>
  <crud-layout
    title="Detail Course"
    endPoint="topics"
    filters
    :crud-detail="courseId"
    :headers="headers"
    crud-filter="courseId"
    icon="book-open"
    list-view
    hide-detail
    :entity-property="entityProperty"
    :height-box="292"
  >
    <div class="d-flex flex-column ga-2">
      <v-card class="elevation-0" :loading="loading" height="200">
        <h1>{{ entityDetail.name }}</h1>
        <p class="text-caption pb-3">Descripcion</p>
        <p class="text-justify">
          {{ entityDetail.description }} || Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ex autem voluptatem corporis numquam nam
          voluptates alias veniam. Debitis quisquam illo doloribus, facilis
          pariatur iure ipsam amet incidunt doloremque, dolor voluptatem.
          consectetur adipisicing elit.
        </p>
      </v-card>
    </div>
    <template #upList>
      <h2 class="pa-2">Material Semanal</h2>
    </template>
    <template #form>
      <v-text-field
        v-model="entityProperty.title"
        label="Title"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="entityProperty.description"
        label="Description"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-textarea
        v-model="entityProperty.file"
        label="File"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-textarea>
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0 rounded-lg">
        <div class="bg-white">
          <h3>Competencias</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          sint deleniti, dolores nesciunt expedita eligendi velit, dignissimos
          quia unde corporis nam molestiae. Ab iure velit debitis soluta
          consequuntur dolorem omnis.
        </div>
        <v-chip-group v-model="amenities" column>
          <v-chip
            v-for="(item, index) in entityDetail.competences"
            :key="index"
            :text="item.name"
            variant="outlined"
            filter
          ></v-chip>
        </v-chip-group>
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
          {{entityDetail.competences[amenities].name}}
        </h3>
          {{entityDetail.competences[amenities].description}}
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
    return {
      loading: false,
      amenities: null,
      alert: true,

      courseId: null,
      materials: [],
      entityDetail: {
        id: null,
        name: null,
        description: null,
        competences: null,
      },
      competences: [],

      headers: [{ text: "Description", value: "description" }],
      entityProperty: {
        title: "",
        description: "",
        file: "",
        id: "",
        courseId: "",
      },
    };
  },
  methods: {
    async getItemId(endPoint) {
      this.loading = true;
      try {
        const response = await this.$axios3.get(
          `/${endPoint}?id=${this.courseId}`
        );
        this.entityDetail = response.data.resource[0];
        console.log(`get - /${endPoint}`, this.entityDetail);
        this.loading = false;
      } catch (error) {
        console.error(`Hubo un error al obtener /${endPoint}:`, error);
      }
    },
  },
  mounted() {},
  computed: {
    showAlert() {
      return this.amenities != null;
    },
  },
  async created() {
    this.courseId = await this.$route.params.id;
    this.entityProperty.courseId = this.courseId;
    this.getItemId("courses");
  },
};
</script>
