<template>
  <crud-layout
    title="Detail Course"
    endPoint="topics"
    :crud-detail="courseId"
    crud-filter="courseId"
    icon="book-open"
    list-view
    :entity-property="entityProperty"
    :height-box="340"
  >
    <div class="d-flex flex-column ga-2">
      <v-card class="elevation-0">
        <h1>{{ course.name }}</h1>
        <p class="text-caption pb-3">Descripcion</p>
        <p class="text-justify">
          {{ course.description }} || Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit ab recusandae magnam in laboriosam
          consequatur, culpa iusto autem esse voluptatem quam inventore
          officiis, adipisci porro. Totam voluptas quidem veritatis officia!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ab
          recusandae magnam in laboriosam consequatur, culpa iusto autem esse
          voluptatem quam inventore officiis, adipisci porro. Totam voluptas
          quidem veritatis officia! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Fugit ab recusandae magnam in laboriosam
          consequatur, culpa iusto autem esse voluptatem quam inventore
          officiis, adipisci porro. Totam voluptas quidem veritatis officia!
        </p>
      </v-card>
    </div>
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
      <v-text-field
        v-model="entityProperty.description"
        :rules="nameCourseRules"
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
        :rules="nameCourseRules"
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
      courses: [],
      loading: false,
      dialog: false,
      amenities: [1, 4],
      nameCourse: "",
      descriptionCourse: "",
      fileCourse: "",
      courseId: null,
      materials: [],
      course: {
        id: null,
        name: null,
        description: null,
      },
      entityProperty: {
        title: '',
        description: '',
        file: '',
        id: '',
        courseId: this.courseId,
      },
    };
  },
  methods: {
    
  },
  mounted() {},
  async created() {
    this.courseId = this.$route.params.id;
  },
};
</script>
