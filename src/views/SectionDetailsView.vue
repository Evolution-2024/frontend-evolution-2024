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
    :hide-add="user.roles.includes('ROLE_TEACHER')"
  >
    <div class="d-flex flex-column ga-2">
      <v-card class="elevation-0" :loading="loading" height="200">
        <div class="d-flex justify-space-between align-center">
          <h1>{{ entityDetail.name }}</h1>
        </div>
        <p class="text-caption pb-3">Descripcion</p>
        <p class="text-justify">
          {{ entityDetail.description }}
        </p>
      </v-card>
    </div>
    <template #appendUpButton>
      <v-btn
        slim
        variant="tonal"
        density="comfortable"
        color="white"
        class="font-weight-bold"
        @click="openDialogAsign"
      >
        <p class="d-none d-md-flex">Teacher</p>
        <v-icon class="ml-0 ml-md-1">mdi-adjust</v-icon>
      </v-btn>
    </template>
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
        @focus="getAllStudents"
        @update:modelValue="changeProperty"
        label="Email Student"
      >
      </v-autocomplete>
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
    <v-dialog max-width="600" v-model="dialogAsignTeacher">
      <v-card class="pa-6 rounded-lg d-flex flex-column ga-3">
        <div class="d-flex align-center">
          <h3 class="text-capitalize">ASIGNAR PROFESOR</h3>
          <v-spacer></v-spacer>
          <v-btn
            text
            icon
            density="comfortable"
            class="elevation-0"
            @click="closeDialog"
          >
            <v-icon color="primary">mdi-close-thick</v-icon>
          </v-btn>
        </div>
        <v-alert
          icon="mdi-information-outline"
          variant="tonal"
          class="text-caption"
          border="start"
          color="primary"
        >
          <p class="text-caption font-weight-bold">Alert Title</p>
          <div style="line-height: 1.2 !important">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eos
            expedita repudiandae repellendus ullam debitis iure cumque ipsam
            atque. Unde eius maiores rem laborum!
          </div>
        </v-alert>
        <v-form ref="formAsignTeacher" class="d-flex flex-column ga-3">
          <v-autocomplete
            density="compact"
            hide-details
            variant="outlined"
            v-model="entityCustomTeacher"
            :loading="loadingSelect"
            :rules="contentRules"
            :items="teachers"
            item-title="email"
            return-object
            @focus="getAllTeachers"
            label="Email Teacher"
          >
          </v-autocomplete>
          <v-autocomplete
            density="compact"
            hide-details
            variant="outlined"
            v-model="entityCustomCourse"
            :loading="loadingSelect"
            :rules="contentRules"
            :items="courses"
            item-title="name"
            return-object
            @focus="getAllCourses"
            label="Course"
          >
          </v-autocomplete>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn variant="text" @click="cleanDialog"> Borrar </v-btn>
          <v-btn variant="tonal" color="primary" @click="asignTeacherPost">
            Asignar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        :color="snackbarState ? 'green-accent-4' : 'red-accent-3'"
        rounded="lg"
        elevation="24"
      >
        <p class="text-white">
          {{ snackbarState ? "Success register" : snackbarText }}
        </p>

        <template v-slot:actions>
          <v-btn color="white" icon @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
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

      dialogAsignTeacher: false,

      loadingSelect: false,

      contentRules: [(v) => !!v || "Required"],

      sectionId: null,
      materials: [],

      entityDetail: {
        id: null,
        name: null,
        description: null,
      },

      courses: [],
      teachers: [],
      students: [],

      headers: [{ text: "Student. Cod.", value: "studentCode" }],

      entityProperty: {
        studentUsername: null,
        sectionId: null,
        studentCode: null,
      },
      entityCustom: null,
      entityCustomTeacher: null,
      entityCustomCourse: null,
      snackbar: false,
    snackbarState: false,
    snackbarText: "",
    };
  },
  methods: {
    openDialogAsign() {
      this.dialogAsignTeacher = true;
    },
    closeDialog() {
      this.$refs.formAsignTeacher.reset();
      this.dialogAsignTeacher = false;
      this.loadingSelect = false;
    },
    cleanDialog() {
      this.$refs.formAsignTeacher.reset();
    },
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
    async getAllStudents() {
      this.loadingSelect = true;
      try {
        const response = await this.$axios2.get(`/users?roleId=1&size=100`);
        this.loadingSelect = false;

        this.students = response.data.resource;
        console.log(`get - /users?roleId=1`, this.students);
      } catch (error) {
        console.error(`Hubo un error al obtener /users?roleId=1:`, error);
      }
    },
    async getAllTeachers() {
      this.loadingSelect = true;
      try {
        const response = await this.$axios2.get(`/users?roleId=2&size=100`);
        this.loadingSelect = false;

        this.teachers = response.data.resource;
        console.log(`get - /users?roleId=2`, this.teachers);
      } catch (error) {
        console.error(`Hubo un error al obtener /users?roleId=1:`, error);
      }
    },
    async getAllCourses() {
      this.loadingSelect = true;
      try {
        const response = await this.$axios3.get(`/courses?size=100`);
        this.loadingSelect = false;

        this.courses = response.data.resource;
        console.log(`get - /courses`, this.teachers);
      } catch (error) {
        console.error(`Hubo un error al obtener /courses`, error);
      }
    },
    changeProperty() {
      if (this.entityCustom != null) {
        this.entityProperty.studentCode = this.entityCustom.id;
        this.entityProperty.studentUsername = this.entityCustom.username;
      }
    },
    async asignTeacherPost() {
      const { valid } = await this.$refs.formAsignTeacher.validate();

      if (valid) {
        this.loadingSelect = true;
        try {
          const response = await this.$axios3.post(`/lesson`, {
            teacherUsername: this.entityCustomTeacher.username,
            teacherCode: this.entityCustomTeacher.id,
            sectionCode: Number(this.sectionId),
            courseCode: this.entityCustomCourse.id,
          });
          console.log(`post - /lesson`, response);
          this.loadingSelect = false;
          this.closeDialog();
        } catch (error) {
          console.log(error);
          if (error.response.status == 400) {
            this.closeDialog();
            this.loadingCrud = false;

            this.snackbarText = error.response.data.message;
            this.snackbarState = false;
            this.snackbar = true;
          }
        }
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
    this.sectionId = await this.$route.params.id;
    this.entityProperty.sectionId = this.sectionId;
    this.getItemId("sections");
  },
};
</script>
  
  <style>
</style>
  