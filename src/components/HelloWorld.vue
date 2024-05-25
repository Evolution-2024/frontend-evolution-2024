<template>
  <v-card class="mx-auto pa-2" max-width="300">
    <v-list>
      <v-list-subheader>REPORTS</v-list-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        rounded
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
    <div>
      <h1>Lista de Alumnos</h1>
      <!-- {{alumnos}} -->
      <ul>
        <li v-for="alumno in alumnos" :key="alumno.id">{{ alumno.name }}</li>
      </ul>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    alumnos: []
  }),
  mounted() {
    this.$axios
      .get("/character")
      .then((response) => {
        this.alumnos = response.data.results;
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los alumnos:", error);
      });
  },
};
</script>
