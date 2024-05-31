<template>
  <layout-comp>
    <div class="d-flex flex-column ga-2">
      <v-card
        class="elevation-0 bg-primary pa-3 rounded-lg d-flex align-center"
        :loading="loading"
      >
        <v-icon color="white">mdi-book-open-variant</v-icon>
        <h3 class="font-weight-bold text-white px-3">Courses View</h3>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-2 mr-2"
          color="white"
          @click="getCourses"
        >
          Update
          <v-icon class="ml-1">mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          density="comfortable"
          class="px-2"
          color="white"
          @click="openRegister"
        >
          Register
          <v-icon class="ml-1">mdi-pen</v-icon>
        </v-btn>
      </v-card>
      <v-card class="d-flex flex-wrap ga-3 elevation-0 overflow-visible">
        <v-card
          v-for="(item, index) in courses"
          :loading="loadCard == item.id"
          :key="index"
          max-width="320"
          class="pa-4 elevation-3 rounded-lg"
          @click="goToCourseViewDetail(item.id)"
        >
          <h3 class="d-flex">
            {{ item.name }} - 00{{ item.id }} <v-spacer></v-spacer>
            <v-icon>mdi-book-open-variant</v-icon>
          </h3>
          <p class="text-caption">Descripcion:</p>
          {{ item.description }} || Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Repudiandae possimus harum molestiae voluptatum
          velit.
        </v-card>
      </v-card>
    </div>
    <template v-slot:rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
    </template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <h3>Registrar Nuevo Curso</h3>
          <v-spacer></v-spacer>
          <v-btn
            icon
            fab
            size="x-small"
            color="primary"
            class="elevation-0"
            @click="closeRegister"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </div>
        <span class="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste magni
          expedita quam architecto similique provident laboriosam quos
          reprehenderit ad natus repellat officia ipsam, quod inventore tempore
          facilis necessitatibus explicabo libero!
        </span>
        <v-form ref="form" class="pt-3 rounded-lg w-100">
          <v-text-field
            v-model="nameCourse"
            :rules="nameCourseRules"
            label="Name"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-text-field>
          <v-text-field
            v-model="descriptionCourse"
            :rules="nameCourseRules"
            label="Description"
            density="compact"
            variant="outlined"
            hide-details="false"
            clearable
            class="pb-3"
            required
          ></v-text-field>
        </v-form>
        <v-btn flat @click="postCourse" :loading="loading"> Registrar </v-btn>
      </v-card>
    </v-dialog>
  </layout-comp>
</template>

<script>
// @ is an alias to /src
import LayoutComp from "@/components/LayoutComp.vue";

export default {
  name: "CoursesView",
  components: {
    LayoutComp,
  },
  data() {
    return {
      courses: [],
      loading: false,
      dialog: false,
      loadCard: null,
      nameCourse: "",
      descriptionCourse: "",
      nameCourseRules: [(v) => !!v || "Required"],
      series: [
        {
          name: "TEAM A",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: "TEAM B",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "TEAM C",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },

        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003",
        ],
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Points",
          },
          min: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
        },
      },
    };
  },
  methods: {
    openRegister() {
      this.dialog = true;
    },
    closeRegister() {
      this.dialog = false;
    },
    async postCourse() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loading = true;
        try {
          const response = await this.$axios3.post("/courses", {
            name: this.nameCourse,
            description: this.descriptionCourse,
          });
          console.log(response);
          this.loading = false;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.closeRegister();
          this.getCourses();
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
      }
    },
    goToCourseViewDetail(courseId) {
        this.loadCard = courseId;
        setTimeout(() => {
            this.loadCard = null;
            this.$router.push({ name: "course-details", params: { id: courseId } });
            
        }, 350);
    },
    async getCourses() {
      this.loading = true;
      try {
        const response = await this.$axios3.get("/courses");
        this.courses = response.data.content;
        console.log(this.courses);
        this.loading = false;
      } catch (error) {
        console.error("Hubo un error al obtener los cursos:", error);
        // Opcional: Manejo de error específico, como mostrar un mensaje de error al usuario
        this.$notify.error({
          title: "Error",
          message:
            "No se pudieron obtener los cursos. Intente de nuevo más tarde.",
        });
      }
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
