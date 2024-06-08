<template>
  <v-app>
    <router-view v-slot="{ Component, route }">
      <component v-if="route.name === 'login'" :is="Component" />
      <layout-comp v-else>
        <component :is="Component" />
      </layout-comp>
    </router-view>
  </v-app>
</template>

<script>
import LayoutComp from "@/components/LayoutComp.vue";

export default {
  components: {
    LayoutComp,
  },
  
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
