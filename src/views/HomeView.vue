<template>
  <layout-comp>
    <div class="d-flex flex-column ga-2">
      <v-card
        class="elevation-0 bg-primary pa-3 rounded-lg d-flex align-center"
      >
        <v-icon color="white">mdi-view-dashboard</v-icon>
        <h3 class="font-weight-bold text-white px-3">Dashboard</h3>
        <v-spacer></v-spacer>
        <!-- <v-btn variant="outlined" density="comfortable" color="white"
          >SAMPLE</v-btn
        > -->
      </v-card>
      <v-container class="elevation-0">
        <v-row>
          <v-col class="" cols="12" md="7">
            <v-card class="pa-3 d-flex flex-column ga-2 elevation-0 rounded-lg" color="#f9f9f9">
              <apexchart
                type="line"
                height="350"
                max-width="650"
                :options="chartOptions"
                :series="series"
              ></apexchart>
              <v-card class="text-justify pa-2" variant="outlined">
                <h3>Announcement</h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, eveniet aut ut iure cumque sed veritatis praesentium
                eum, minima voluptate earum voluptatibus suscipit? Magnam iusto
                excepturi molestiae quasi eaque vero! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit.
              </v-card>
              <v-card class="text-justify pa-2" variant="outlined">
                <h3>Announcement</h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, eveniet aut ut iure cumque sed veritatis praesentium
                eum, minima voluptate earum voluptatibus suscipit? Magnam iusto
                excepturi molestiae quasi eaque vero! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit.
              </v-card>
              <v-card class="text-justify pa-2" variant="outlined">
                <h3>Announcement</h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, eveniet aut ut iure cumque sed veritatis praesentium
                eum, minima voluptate earum voluptatibus suscipit? Magnam iusto
                excepturi molestiae quasi eaque vero! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit.
              </v-card>
            </v-card>
          </v-col>
          <v-col class="d-flex flex-column ga-2" cols="12" md="5">
            <v-card class="text-justify pa-3 elevation-0 bg-primary" color="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugit
              necessitatibus doloremque minima debitis esse eos reprehenderit
              repellendus atque perferendis cupiditate dolorem, saepe
              accusantium, cumque recusandae voluptatem? Mollitia, id sapiente?
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </v-card>
            <v-card class="text-justify pa-2" variant="outlined">
                <h3>Announcement</h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, eveniet aut ut iure cumque sed veritatis praesentium
                eum, minima voluptate earum voluptatibus suscipit? Magnam iusto
                excepturi molestiae quasi eaque vero! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit.
              </v-card>
            <v-card class="text-justify pa-2" variant="outlined">
                <h3>Announcement</h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, eveniet aut ut iure cumque sed veritatis praesentium
                eum, minima voluptate earum voluptatibus suscipit? Magnam iusto
                excepturi molestiae quasi eaque vero! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit.
              </v-card>
            <v-card class="text-justify pa-3 elevation-0 bg-primary" color="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugit
              necessitatibus doloremque minima debitis esse eos reprehenderit
              repellendus atque perferendis cupiditate dolorem, saepe
              accusantium, cumque recusandae voluptatem? Mollitia, id sapiente?
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </v-card>
            <v-card class="text-justify pa-3 elevation-0 bg-primary" color="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugit
              necessitatibus doloremque minima debitis esse eos reprehenderit
              repellendus atque perferendis cupiditate dolorem, saepe
              accusantium, cumque recusandae voluptatem? Mollitia, id sapiente?
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </v-card>
            
            
          </v-col>
        </v-row>
      </v-container>
    </div>
    <template v-slot:rightarea>
      <v-card class="pa-2 elevation-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe
        illo. Aliquam perspiciatis adipisci laudantium voluptatem tempora, quo
        deleniti rerum blanditiis ducimus sint neque dignissimos debitis tenetur
        labore consectetur magnam.
      </v-card>
    </template>
  </layout-comp>
</template>

<script>
// @ is an alias to /src
import LayoutComp from "@/components/LayoutComp.vue";

export default {
  name: "HomeView",
  components: {
    LayoutComp,
  },
  data() {
    return {
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
};
</script>
