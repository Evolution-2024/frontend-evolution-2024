<template>
  <crud-layout
    title="Section Detail"
    endPoint="section-detail"
    filters
    :crud-detail="sectionId"
    :headers="headers"
    crud-filter="sectionId"
    icon="google-classroom"
    list-view
    defaultTitle="studentUsername"
    hide-detail
    hide-edit
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
      <h2 class="pa-2">Alumnos</h2>
    </template>
    <template #form>
      <v-autocomplete
        density="compact"
        variant="outlined"
        v-model="entityCustom"
        :loading="loadingSelect"
        :rules="contentRules"
        :items="students"
        item-title="email"
        return-object
        @focus="getAllStudents('users?roleId=1')"
        @update:modelValue="changeProperty"
        label="Email Student"
      >
      </v-autocomplete>
      {{entityCustom}} <br>
      {{entityProperty}}
    </template>
    <template #rightarea>
      <v-card class="pa-2 elevation-0 rounded-lg">
        <div class="bg-white">
          <h3>Section Detail</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          sint deleniti, dolores nesciunt expedita eligendi velit, dignissimos
          quia unde corporis nam molestiae. Ab iure velit debitis soluta
          consequuntur dolorem omnis.
        </div>
      </v-card>
    </template>
  </crud-layout>
</template>
  
  <script>
// @ is an alias to /src
import CrudLayout from "@/layouts/CrudLayout.vue";

export default {
  name: "SectionsView",
  components: {
    CrudLayout,
  },
  data() {
    return {
      loading: false,
      amenities: null,
      alert: true,

      loadingSelect: false,

      contentRules: [(v) => !!v || "Required"],

      sectionId: null,
      materials: [],

      entityDetail: {
        id: null,
        name: null,
        description: null,
      },

      students: [],

      headers: [{ text: "Student. Cod.", value: "studentCode" }],

      entityProperty: {
        studentUsername: null,
        sectionId: null,
        studentCode: null,
      },
      entityCustom:null
    };
  },
  methods: {
    async getItemId(endPoint) {
      this.loading = true;
      try {
        const response = await this.$axios3.get(
          `/${endPoint}?id=${this.sectionId}`
        );
        this.entityDetail = response.data.resource[0];
        console.log(`get - /${endPoint}`, this.entityDetail);
        this.loading = false;
      } catch (error) {
        console.error(`Hubo un error al obtener /${endPoint}:`, error);
      }
    },
    async getAllStudents(endPoint) {
      this.loadingSelect = true;
      try {
        const response = await this.$axios2.get(`/${endPoint}&size=100`);
        this.loadingSelect = false;

        this.students = response.data.resource;
        console.log(`get - /${endPoint}`, this.students);
      } catch (error) {
        console.error(`Hubo un error al obtener /${endPoint}:`, error);
      }
    },
    changeProperty(){
      if(this.entityCustom != null){
        this.entityProperty.studentCode = this.entityCustom.id;
        this.entityProperty.studentUsername = this.entityCustom.username;
      }
    }
  },
  mounted() {},
  computed: {
    // compareTotal(){
    //   if(this.entityCustom != null){
    //     // this.entityProperty.studentCode = this.entityCustom.id;
    //   }
    //   return false
    // }
  },
  async created() {
    this.sectionId = await this.$route.params.id;
    this.entityProperty.sectionId = this.sectionId;
    this.getItemId("sections");
  },
};
</script>
  
  <style>
</style>
  