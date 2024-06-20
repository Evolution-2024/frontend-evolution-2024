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
          {{ entityDetail.description }}
        </p>
      </v-card>
    </div>
    <template v-slot:appendButton="slotProps">
      <v-btn
        size="small"
        variant="tonal"
        color="primary"
        icon
        @click="generateExam(slotProps)"
      >
        <v-icon>mdi-assistant</v-icon>
        <v-tooltip activator="parent" location="top">Examen IA</v-tooltip>
      </v-btn>
    </template>
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
          <div class="text-justify py-2">

            En el contexto educativo, competencia se refiere a las habilidades y conocimientos fundamentales que los estudiantes deben desarrollar para cumplir con objetivos específicos de aprendizaje. 
          </div>
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
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
      persistent
    >
      <div class="card rounded">
        <div class="bg rounded-lg uwu"></div>
        <div class="bg rounded-lg"></div>
        <v-card
          class="d-flex elevation-0 flex-column h-100 justify-center align-center glass-effect rounded pa-4"
          :loading="overlay"
        >
          <v-icon color="white" size="large">mdi-assistant</v-icon>
          <div class="pt-3 font-weight-black text-center">
            <p>GENERANDO</p>
            <p>EXAMEN</p>
          </div>
        </v-card>
      </div>
    </v-overlay>
    <v-dialog v-model="dialogExam" :max-width="750" persistent>
      <v-card class="pa-6 rounded-lg elevation-0 d-flex flex-column ga-3">
        <div class="d-flex align-center">
          <h3 class="text-capitalize">Registrar: Examen</h3>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit aperiam eos
            expedita.
          </div>
        </v-alert>
        <v-form
              ref="form"
              class="w-100"
              :disabled="loadingGenerate"
            >
          <v-autocomplete
          hide-details
          :rules="contentRules"
          density="compact"
          variant="outlined"
          v-model="sectionCode"
          :loading="loadingSelect"
          :items="sections"
          item-title="code"
          item-value="id"
          @focus="getAllSections('sections')"
          label="Section"
        ></v-autocomplete>
            </v-form>
        <v-card
          max-height="400"
          class="overflow-auto d-flex flex-column ga-3 elevation-0"
        >
          <div v-for="(item, index) in examDetailResources" :key="index">
            <v-card variant="outlined" class="pa-3 rounded-lg">
              <p v-if="!viewFields" class="font-weight-black mb-2">
                {{ index + 1 }}. {{ item.question }}
              </p>
              <v-text-field
                v-else
                v-model="item.question"
                :rules="contentRules"
                :label="`${index + 1}. Question`"
                density="compact"
                variant="outlined"
                hide-details="false"
                clearable
                class="pb-4 pt-1"
                required
              ></v-text-field>
              <v-radio-group
                density="compact"
                hide-details
                v-model="item.correctOptionOrder"
                v-if="!viewFields"
              >
                <v-radio
                  color="primary"
                  v-for="(alternative, i) in item.options"
                  :key="i"
                  :label="alternative"
                  :value="i + 1"
                ></v-radio>
              </v-radio-group>
              <div v-else class="d-flex flex-column ga-3">
                <v-text-field
                  v-for="(alternative, i) in item.options"
                  :key="i"
                  v-model="item.options[i]"
                  :rules="contentRules"
                  :label="
                    item.correctOptionOrder == i + 1
                      ? 'Alternative (Correct)'
                      : 'Alternative'
                  "
                  density="compact"
                  variant="outlined"
                  hide-details="false"
                  clearable
                  required
                ></v-text-field>
              </div>
            </v-card>
          </div>
        </v-card>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn variant="text" @click="viewFields = !viewFields">
            {{ !viewFields ? "EDITAR" : "LISTO" }}
          </v-btn>
          <v-btn
            :disabled="viewFields"
            variant="tonal"
            color="primary"
            @click="postRegisterExam"
            :loading="loadingGenerate"
          >
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      viewFields: false,
      dialogExam: false,
      overlay: false,
      examDetailResources: [],

      loadingGenerate: false,

      sectionCode: "",
      loadingSelect: false,
      sections: [],

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
    closeDialog() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialogExam = false;
    },
    async generateExam(originalText) {
      this.topicCode = originalText.id;
      this.overlay = true;

      const maxLength = 4097;
      let text = originalText.content;
      while (text.length > maxLength) {
        // Reducir el texto en un 10% (puedes ajustar este valor según sea necesario)
        const reductionFactor = 0.9;
        const newLength = Math.floor(text.length * reductionFactor);
        text = text.substring(0, newLength);
      }

      try {
        const response = await this.$axiosGPT.post("/completions", {
          model: "gpt-3.5-turbo-instruct",
          prompt: `Genera un examen basado en el siguiente texto: "${text}" de 5 preguntas con 3 alternativas de respuesta unica.Dame las preguntas y alternativas en formato JSON con los atributos que propongo, ademas considera que solo una alternativa es correcta.[  {    "question": "¿CONTENIDO DE PREGUNTA?",    "options": [      "CONTENIDO ALTERNATIVA 1",      "CONTENIDO ALTERNATIVA 2",      "CONTENIDO ALTERNATIVA 3"    ],    "correctOptionOrder": (VALOR ENTRE 1 y 3)  },  {...},  {...},  {...},  {...},] `,
          max_tokens: 750,
          n: 1,
          stop: null,
          temperature: 0.7,
        });
        const generatedExam = response.data.choices[0].text.trim();
        console.log("Examen Generated");
        this.examDetailResources = JSON.parse(generatedExam);
        console.log("Exam --> ", JSON.parse(generatedExam));
        this.overlay = false;
        this.dialogExam = true;
      } catch (error) {
        console.error("Error generating exam:", error);
      }
    },
    async postRegisterExam() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loadingGenerate = true;
        try {
          const response = await this.$axios4.post("/exams", {
            topicCode: this.topicCode,
            sectionCode: this.sectionCode,
            courseCode: Number(this.courseId),
            examDetailResources: this.examDetailResources,
          });
          this.closeDialog();
          this.loadingGenerate = false;
          console.log("response Exams", response);
        } catch (error) {
          console.log(error);
        }
      }
    },
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
        this.snackbar = true;
        this.fileSizeMB = "";
        return;
      }

      this.selectedFile = file;

      this.entityProperty.description = file.name;
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
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
    actionItem(item) {
      console.log("content-->", item);
    },
  },
  watch: {
    // overlay (val) {
    //   val && setTimeout(() => {
    //     this.overlay = false
    //   }, 3000)
    // },
  },
  mounted() {},
  computed: {
    selectedFileUpdate() {
      let message = "";
      if (this.entityProperty.file == null) {
        message = "Suelta tu archivo aquí";
        return message;
      } else {
        message = "";
        return message;
      }
    },
    showAlert() {
      return this.amenities != null;
    },
    pdfUrl() {
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

.card {
  position: relative;
  width: 200px;
  /* height: 50px; */
  /* background: #f2f2f2; */
  /* opacity: 0.3; */
  /* filter: blur(8px); */
  /* border-radius: 14px; */
}

.bg {
  position: absolute;
  z-index: -1;
  inset: -6px;
  overflow: hidden;
}

.uwu {
  filter: blur(10px);
  transition: filter 0.3s;
}

.bg::before {
  content: "";
  position: absolute;
  aspect-ratio: 1/1;
  top: 50%;
  left: 50%;
  min-width: 150%;
  min-height: 150%;
  background-image: conic-gradient(
    #3FC4C0,
    #8FE0DE,
    #62D9D5,
    #3FC4C0,
    #8FE0DE,
    #62D9D5,
    #3FC4C0,
    #8FE0DE,
    #62D9D5,
    #3FC4C0,
    #8FE0DE,
    #62D9D5
  );
  animation: speeen 4s linear infinite;
  transform-origin: 0% 0%;
  transform: rotate(0deg) translate(-50%, -50%);
}

@keyframes speeen {
  from {
    transform: rotate(0deg) translate(-50%, -50%);
  }

  to {
    transform: rotate(360deg) translate(-50%, -50%);
  }
}

.glass-effect {
  background: rgba(
    255,
    255,
    255,
    0.38
  ); /* Color de fondo blanco con opacidad */
  /* border-radius: 10px; */
  backdrop-filter: blur(15px); /* Efecto de desenfoque */
  -webkit-backdrop-filter: blur(
    15px
  ); /* Efecto de desenfoque para navegadores basados en Webkit */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde semi-transparente */
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  /* padding: 20px; */
  color: #fff; /* Color de texto blanco */
}
</style>
