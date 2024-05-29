<template>
  <layout-comp>
    <div class="d-flex flex-column ga-3">
      <v-card class="elevation-0 bg-accent pa-3 rounded-lg d-flex align-center">
        <span class="font-weight-bold">Dashboard</span>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" density="comfortable">SAMPLE</v-btn>
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
};
</script>
