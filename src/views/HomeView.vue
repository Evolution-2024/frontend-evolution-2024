<template>
  <div class="d-flex flex-column ga-2 py-2 pl-0 pl-sm-2 mx-2">
    <v-card class="elevation-0 bg-primary pa-3 rounded-lg d-flex align-center">
      <v-icon color="white">mdi-view-dashboard</v-icon>
      <h3 class="font-weight-bold text-white px-3">Dashboard</h3>
      <v-spacer></v-spacer>
    </v-card>
    <div class="elevation-0 w-100 pa-0">
      <v-row dense>
        <v-col class="" cols="12" md="7">
          <v-card
            class="pa-3 d-flex flex-column ga-2 elevation-0 rounded-lg"
            color="#f9f9f9"
          >
            <apexchart
              type="line"
              height="350"
              max-width="650"
              :options="chartOptions"
              :series="series"
            ></apexchart>
            <apexchart
              type="bar"
              height="350"
              :options="chartOptionsBar"
              :series="seriesBar"
            ></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <h1 class="text-capitalize">ultimos 5 anuncios</h1>
          <div
            class="d-flex flex-column ga-2 overflow-auto elevation-0 rounded-lg pa-2"
            color="#f2f2f2"
            :style="`height: calc(100dvh - 80px);`"
          >
            <v-card v-for="(item, index) in announcements" :key="index" class="rounded-lg text-justify pa-3" variant="outlined">
              <h3>Anuncio: {{item.title}}</h3>
              {{item.description}}
            </v-card>
            
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import CrudLayout from "@/components/CrudLayout.vue";

export default {
  name: "HomeView",
  components: {
    // CrudLayout,
  },
  data() {
    return {
      announcements: [],
      series: [
        {
          name: "TEAM A",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        // {
        //   name: "TEAM B",
        //   type: "area",
        //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        // },
        // {
        //   name: "TEAM C",
        //   type: "line",
        //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        // },
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
      seriesBar: [
        {
          name: "A",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "B",
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: "C",
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: "D",
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: "E",
          data: [25, 12, 19, 32, 25, 24, 10],
        },
      ],
      chartOptionsBar: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: "Competences Graphic",
        },
        xaxis: {
          categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
          labels: {
            formatter: function (val) {
              return val + "K";
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
    };
  },
  methods: {
    async getAnnouncemets(){
      const endPoint = 'announcements'
      try {
        const response = await this.$axios3.get(`/${endPoint}?size=5`);

        this.announcements = response.data.resource;
        console.log(`get - /${endPoint}`, this.announcements);
      } catch (error) {
        console.error(`Hubo un error al obtener /${endPoint}:`, error);
      }
    }
  },
  mounted() {
    this.getAnnouncemets();
  },
};
</script>
