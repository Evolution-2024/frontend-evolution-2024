<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores natus voluptate labore eveniet minus. Distinctio eaque sequi ut impedit. Optio, officiis molestiae temporibus recusandae maxime esse similique facilis totam? Sunt!
  </div>
</template>

<script>
export default {
  name: "AboutView",

  data: () => ({
    alumnos: []
  }),
  mounted() {
    this.$axios1
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
