<template>
  <crud-layout
    title="Detail"
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
    @edit="onEdit"
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
        :rules="contentRules"
        label="Title"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <v-text-field
        v-show="false"
        v-model="entityProperty.description"
        :rules="contentRules"
        label="Description"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-text-field>
      <div
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{ dragging: isDragging }"
        @click="triggerFileInput"
        class="drop-zone rounded text-center mb-3 d-flex align-center justify-center"
      >
        <span class="d-inline-block text-truncate" style="max-width: 75%"
          >{{ entityProperty.description ?? "Suelta tu archivo aquí" }}
        </span>
        <span :class="fileSizeMB == '' ? '' : 'pl-2'">
          {{ fileSizeMB == "" ? "" : `(${fileSizeMB.toFixed(2)} MB)` }}
        </span>
        <input
          type="file"
          @change="onFileChange"
          class="file-input"
          ref="fileInput"
          accept=".pdf,.txt"
        />
      </div>
      <v-textarea
        v-show="false"
        disabled
        v-model="entityProperty.file"
        :rules="contentRules"
        label="File"
        density="compact"
        variant="outlined"
        hide-details="false"
        clearable
        class="pb-3"
        required
      ></v-textarea>
      <div v-if="entityProperty.file">
        <!-- Aquí puedes mostrar el contenido del archivo -->
        <iframe
          class="rounded overflow-hidden"
          :src="pdfUrl"
          style="width: 100%; height: 350px"
        ></iframe>
      </div>
      <!-- {{entityProperty}} -->
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
            {{ entityDetail.competences[amenities].name }}
          </h3>
          {{ entityDetail.competences[amenities].description }}
        </v-alert>
      </v-expand-transition>
    </template>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="red-accent-3">
      {{
        `El archivo supera el tamaño máximo permitido de ${maxFileSizeMB} MB`
      }}

      <template v-slot:actions>
        <v-btn color="white" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
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
      isDragging: false,
      selectedFile: null,
      base64File: "",
      dropZoneMessage: "Suelta tu archivo aquí",
      maxFileSizeMB: 10,
      fileSizeMB: "",

      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 3000,

      loading: false,
      amenities: null,
      alert: true,

      contentRules: [(v) => !!v || "Required"],

      courseId: null,
      materials: [],
      entityDetail: {
        id: null,
        name: null,
        description: null,
        competences: null,
      },
      competences: [],

      headers: [{ text: "Material", value: "description" }],
      entityProperty: {
        title: null,
        description: null,
        file: null,
        id: null,
        courseId: null,
      },
    };
  },
  methods: {
    onDragOver() {
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    onDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        this.handleFile(file);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.handleFile(file);
      }
    },
    handleFile(file) {
      this.fileSizeMB = file.size / (1024 * 1024);
      if (this.fileSizeMB > this.maxFileSizeMB) {
        // this.dropZoneMessage = `El archivo supera el tamaño máximo permitido de ${this.maxFileSizeMB} MB`;
        // setTimeout(() => {
        //   this.dropZoneMessage = "Suelta tu archivo aquí";
        // }, 1250);
        this.snackbar = true;
        this.fileSizeMB = "";
        return;
      }

      this.selectedFile = file;
      // this.dropZoneMessage = `${file.name}`; // Actualiza el mensaje con el nombre del archivo

      this.entityProperty.description = file.name;
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Eliminar el prefijo data: del resultado base64
        const base64Result = reader.result.split(",")[1];
        this.entityProperty.file = base64Result;
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
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
    onEdit(boolState) {
      if (boolState) {
        this.fileSizeMB = "";
      } else {
        this.fileSizeMB = "";
      }
    },
  },
  mounted() {},
  computed: {
    selectedFileUpdate() {
      let message = "";
      if (this.entityProperty.file == null) {
        message = "Suelta tu archivo aquí";
        return message;
      } else {
        // message = this.selectedFile.name;
        message = "";
        return message;
      }
    },
    showAlert() {
      return this.amenities != null;
    },
    pdfUrl() {
      // Si el archivo es un PDF, puedes mostrarlo en un visor de PDF usando un iframe
      return `data:application/pdf;base64,${this.entityProperty.file}`;
    },
  },
  async created() {
    this.courseId = await this.$route.params.id;
    this.entityProperty.courseId = this.courseId;
    this.getItemId("courses");
  },
};
</script>

<style>
.drop-zone {
  border: 2.2px dashed #ababab;
  padding: 20px;
  cursor: pointer;
}

.drop-zone.dragging {
  border-color: #333;
  background-color: #f0f0f0;
}

.file-input {
  display: none;
}
</style>
