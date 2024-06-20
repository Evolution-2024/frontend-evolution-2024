<template>
  <v-app>
    <router-view v-slot="{ Component, route }">
      <component v-if="route.name === 'login'" :is="Component" />
      <default-layout v-else>
        <component :is="Component" />
      </default-layout>
    </router-view>
  </v-app>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  components: {
    DefaultLayout,
  },
  mounted() {
    document.title = "Evolution";
  }
  
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
/* Estilo para el pulgar de la barra de desplazamiento */
::-webkit-scrollbar-thumb,
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0); /* Bordes transparentes */
  border-radius: 60px; /* Bordes redondeados */
  box-shadow: inset 0 0 0 12px rgba(0, 0, 0, 0.37); /* Sombra interna */
}

/* Estilo para la barra de desplazamiento */
::-webkit-scrollbar,
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 10px; /* Ancho de la barra de desplazamiento vertical */
  height: 8px; /* Altura de la barra de desplazamiento horizontal */
}
</style>
