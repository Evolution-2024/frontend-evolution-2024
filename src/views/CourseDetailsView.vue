<template>
  <crud-layout
    title="Detail Course"
    endPoint="topics"
    filters
    :crud-detail="courseId"
    crud-filter="courseId"
    icon="book-open"
    list-view
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
      <v-card class="pa-2 elevation-0">
        <div class="bg-white">
          <h3>Competencias</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          sint deleniti, dolores nesciunt expedita eligendi velit, dignissimos
          quia unde corporis nam molestiae. Ab iure velit debitis soluta
          consequuntur dolorem omnis.
        </div>
        <v-chip-group v-model="amenities" column multiple>
          <v-chip text="Elevator" variant="outlined" filter></v-chip>

          <v-chip text="Washer / Dryer" variant="outlined" filter></v-chip>

          <v-chip text="Fireplace" variant="outlined" filter></v-chip>

          <v-chip text="Wheelchair access" variant="outlined" filter></v-chip>

          <v-chip text="Dogs ok" variant="outlined" filter></v-chip>

          <v-chip text="Cats ok" variant="outlined" filter></v-chip>
        </v-chip-group>
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
    return {
      loading: false,
      amenities: [1, 4],

      courseId: null,
      materials: [],
      entityDetail: {
        id: null,
        name: null,
        description: null,
        competences: null,
      },
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
  async created() {
    this.courseId = await this.$route.params.id;
    this.getItemId("courses");
  },
};
</script>
